/*====================================================================
Discription: All methods about business logic are here
FileName   : business.js
Project    : Karmax
Programmer : Zhendong Tang (Mike)
Date       : April, 2020
=====================================================================*/

const { globalAgent } = require("http");
const position = require("./position");
const Math = require("./Math");

module.exports={
    
    /*=============================================================================================
    name: GetCurrentLegIndexAndStage
    description: check database records and determine the current legIndex and stage
    output: {legIndex:num, stageID:num}
           legIndex:  current working leg's index in the leg array (not the leg id)
           stageID :  0: no arrival, 1: arrival but not leave, 2: leave but not reach next ToLocation
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

            if(!Arrive){
                LegIndexAndStage = {index:i, stage:0}; // no Arrival
                //console.log(`first:${LegIndexAndStage}`);
                break;
            }else if(!Leave&&(legs[i].OrderInRoute<=legs.length)){  // not the last leg as well
                //else if(Arrive&&!Leave&&(legs[i].OrderInRoute<legs.length)){  // not the last leg as well
                LegIndexAndStage = {index:i, stage:1}; // has Arrival, no Departure
                //console.log(`second:${LegIndexAndStage}`);
                break;
            }else if(!ArrivalNext){
                //else if(Leave&&!ArrivalNext){
                LegIndexAndStage = {index:i, stage:2}; // has Departure, not reach next leg
               // console.log(`third:${LegIndexAndStage}`);   
                break;         
            }
 
        }
        return LegIndexAndStage;
        //return currentLegID;
    },


    /*=============================================================================================
    name: RefreshGPSpool
    description: For the same GPSid,  use a new Position to update previous Position
    =============================================================================================== */
    RefreshGPSpool(spot){

        if(global.GPSpool==undefined){
            global.GPSpool=[];
        }
        if(global.GPSpool.length===0)
        {
            global.GPSpool.push(spot);
        }
        else{
            let index= undefined;
            for(let i=0;i<global.GPSpool.length;i++){
                if(global.GPSpool[i].GPSid==spot.GPSid){// old value exist in the pool
                    index=i;
                }
            } 
            if(index!=undefined)
            {
                let first={Latitude:global.GPSpool[index].Latitude,Longitude:global.GPSpool[index].Longitude};
                let end =spot;
                let angle= Math.GetAngle(first,end);
                spot.Angle = angle;
                global.GPSpool.splice(index,1) ; // delete old spot
            }
           
            global.GPSpool.push(spot);     // push a brand new spot
        }

    },

     /*=============================================================================================
    name: GetLastPositionTime
    description: Get last position's dataTime property from global (cache)
    =============================================================================================== */
    GetLastPositionTime(gpsID){

        let dateTime = undefined;
        if(global.GPSpool!==undefined)
        {
            if(global.GPSpool.length!==0){
                for(let i=0;i<global.GPSpool.length;i++){
                    if(global.GPSpool[i].GPSid==gpsID){// old value exist in the pool
                        dateTime=global.GPSpool[i].DateTime;
                    }
                } 

            }
        
        }
        return dateTime;
       
    }
    
    
};