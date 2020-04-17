/*====================================================================
FileName: position.js
Description: This module contains files for processing Position
Project: Karmax
Programmer: Zhendong Tang (Mike)
Date      : April, 2020
https://api.findmespot.com/spot-main-web/consumer/rest-api/2.0/public/feed/1dqsXIHWqykhzQLlFiZEflrPf5JTuBNmI/message.json?feedPassword=spot321
=====================================================================*/
const Path = require('path');
const DAL=require(Path.resolve(__dirname,'./DAL'));
const Math=require(Path.resolve(__dirname,'./Math'));
const Common=require(Path.resolve(__dirname,'./common'));

// enum for status
const legStatusType = {
    Arrival: 5,
    Load: 1,
    Departure: 2,
    InTransit: 3,
};


module.exports={

   /*===============================================
    Name: Process
    Description: process a incoming Position
    Todo: Find a professional way to handle Error 
    ================================================= */

       async Process(position)
       {

            // =============step two, get relevant legs ready=================
             //let legs = null;
            //if(global.GpsIdList.includes(position[i].GPSid)){ //level 1
            let legs = await DAL.GetLegsByGpsID(position.GPSid);
            if(legs!==0){  //level 2 :  Get legs done 
            // =============step three, Get current leg Index and stage Ready==
            //let currentLegIndexAndStage = Business.GetCurrentLegIndexAndStage(legs);
            let currentLegIndexAndStage = this.GetCurrentLegIndexAndStage(legs);
            let stage = currentLegIndexAndStage.stage;                         // current stage
            let legIndex = currentLegIndexAndStage.index;                      // current leg index in the leg array
            
            // =============step four, check if this position is within Location's geoFence ==
 
            let startLocationID = legs[currentLegIndexAndStage.index].StartLocationID;
            let startLocation = Common.GetLocationByLocationID(startLocationID, global.LocationList);
            let endLocationID = legs[currentLegIndexAndStage.index].EndLocationID;
            let endLocation = Common.GetLocationByLocationID(endLocationID, global.LocationList);
            let currentLegID = legs[currentLegIndexAndStage.index].ID;
            
            // Get IsHere status
            let IsHere = undefined;
            if(stage==2){
                IsHere = Math.IsWithinGeofence(position,endLocation);
            }else{
                IsHere = Math.IsWithinGeofence(position,startLocation); 
            }
 
            // =============step five, get previous position from DB ============
            // for calculate speed 
            let previousPosition = await DAL.GetPreviousPosition(position.GPSid,currentLegID);
            //============= step six,  Get Speed ready    ============ 
            let speed =-1;  // -1 means no previous position, cannot calculate speed
            //if(previousPosition=undefined); // if using query
            if(previousPosition.length===1){
                speed = Math.GetSpeed(position,previousPosition[0]);// speed can be negative, if duration is 0 or negative
            };

             // if using store procedure, if has previous position, the [] will have one value:previous position. otherwise empty.
            
            console.log(`Speed is : ${speed}`); //only for debugging
            //============= step seven,  Insert position and get a ID    ============ 
            
            let positionID=await DAL.InsertPosition(position,currentLegID);
            console.log(`Try to insert new Position!`);
            

                if(positionID!==0){//leverl 3: insert position successfully

                     /*@@@@@@@@@@@@@ The core of the Method @@@@@@@@@@@@@@@@@@@@@ */ 
                    /*@@@@@@@@@@@@@ Determine Status and update database @@@@@@@@@@@@@@@@@@@@@ */   
                    
                    if(stage==0 && IsHere){ // truck just arrival  // level 4 starts
 
                        console.log(`Update actual arrival time!`);
                        console.log(`Insert leg status !`);
                        console.log(`Update gps group Time start !`);
                        
                        let result = await DAL.UpdateStageZero(position.DateTime,currentLegID,legStatusType.Arrival,positionID,startLocationID);   
                        if(result===0){
                            processStatus = false;  
                            console.log(`stage == 0`); 
                            console.log(`Error occurs when access Database!`); 
                        }
 
                    }else if(stage==1 && !IsHere){// truck just left
            
                        console.log(`Update actual departure time!`);
                        console.log(`Insert leg status !`);
                        let result = await DAL.UpdateStageOne(position.DateTime,currentLegID,legStatusType.Departure,positionID,startLocationID)            
                        if(result===0){
                            processStatus = false;   
                            console.log(`stage == 1`); 
                            console.log(`Error occurs when access Database!`); 
                        };
                    }
                   // else if(stage==2 && Math.IsWithinGeofence(position,endLocation))  // IF stage = 2, then this leg is not the last leg
                    else if(stage==2 && IsHere)
                    {
                        let nextLegID = legs[legIndex+1].ID;
                        let nextStartLocationID = legs[legIndex].EndLocationID;  // currentLeg.EndLocation==nextLeg.StartLocation
                        console.log(`Update actual arrival time!`);
                        console.log(`Insert leg status !`);
                        console.log(`Update gps group Time End !`); 
                        console.log(`Update gps group Time start (Next leg)!`);
                        let result = await DAL.UpdateStageTwo(position.DateTime,currentLegID,nextLegID,legStatusType.Arrival,positionID,nextStartLocationID)
                        if(result===0){
                            processStatus = false;
                            console.log(`stage == 2`);
                            console.log(`Error occurs when access Database!`);    
                        };
                        
                    }// level 4 end

                    // If we can get the Position ID,  then we can finally insert the DistanceMatrix table
                    //============== WHATEVER, THE DistanceMatrix Table will be Inserted.==============================

                    let forecast = await Math.GetDistanceDurationFromBing(position, endLocation);
                    let forecastDistance = undefined;
                    let forecastDuration = undefined;
                    if(forecast!==-1){
                        forecastDistance = forecast.travelDistance;
                        forecastDuration = Math.MinutesToTimeFormat(forecast.travelDuration);
                    }else{
                        console.log(`Error occurs when access Bing Map API!!, will use 0 as forecast value`);
                        forecastDistance = 0;
                        forecastDuration = Math.MinutesToTimeFormat(0);
                    }
                    // Ready to Insert to Distance Matrix table

                    let result = await  DAL.InsertDistanceMatrix(currentLegID,positionID,endLocationID,forecastDistance,forecastDuration,position.DateTime);
                    if(result===1){
                        console.log(`Insert Distance Matrix Table successfully!`);
                    }

                    /*============================Middle Line of this Method============================= */

                    else{
                        console.log(`Error happens when insert Distance Matrix Table!`)
                    }

 
                }else{ //level 3: insert position fail
                    console.log(`Error happens when insert position to Database!`);
                }                            
            }
            else{//level 2 :  Get legs fail  
                console.log(`Error happens when get legs data from Database!`);
            }
      

        },
    /*=============================================================================================
    name: GetCurrentLegIndexAndStage
    description: check database records and determine the current legIndex and stage
    output: {legIndex:num, stageID:num}
           legIndex:  current working leg's index in the leg array (not the leg id)
           stageID :  0: no arrival, 1: arrival but not leave, 2: leave but not reach next ToLocation
           if output is null, means the truck is back to Karmax.
    =============================================================================================== */

        GetCurrentLegIndexAndStage(legs){

            let LegIndexAndStage = null;
            for(let i=0;i<legs.length;i++)
            {
    
                let Arrive=legs[i].ActualArrivalTime;
                let Leave=legs[i].ActualDepartureTime;
                let ArrivalNext=null;  
                if(i<legs.length-1)
                {
                    ArrivalNext=legs[i+1].ActualArrivalTime;
                }
                /*===================================================================
                Here are the logic to determine a Position's current stage in a Route 
                ====================================================================*/
                if(!Arrive){
                    LegIndexAndStage = {index:i, stage:0}; // no Arrival
                    break;
                }else if(!Leave&&(legs[i].OrderInRoute<=legs.length)){  // not the last leg as well
                    LegIndexAndStage = {index:i, stage:1}; // has Arrival, no Departure
                    break;
                }else if(!ArrivalNext){
                    LegIndexAndStage = {index:i, stage:2}; // has Departure, not reach next leg  
                    break;         
                }
     
            }
            return LegIndexAndStage;
        },
    }