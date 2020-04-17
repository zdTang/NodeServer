/*====================================================================
Discription: Calculate the status based on Leg table
FileName: status.js
Project: Karmax
Programmer: Zhendong Tang (Mike)
Date      : April, 2020
Todo      : Will do it later, alternative will be a Store Procedure 
=====================================================================*/
const Path = require('path');
const DAL=require(Path.resolve(__dirname,'./DAL'));
const Validator=require(Path.resolve(__dirname,'./validator'));
const Math=require(Path.resolve(__dirname,'./Math'));
const mysqldate=require(`mysqldate`);// for parse mySQL DataTime //https://www.npmjs.com/package/mysqldate
const db=require(Path.resolve(__dirname,'./database'));
const Business=require(Path.resolve(__dirname,'./Business'));





module.exports={


    /*================================================
    name:GetByGpsID
    description:   Return status based on given GPSid
    return value:
    data type : Json object which contains Status       
    ================================================== */ 

    async GetByGpsID(gpsID){

        let myLegList = await DAL.GetLegsByGpsID(gpsID);
    
        console.log(myLegList);

    //===============================================================

        // this value can either take from cache
        let lastPositionTimePoint=await db.query(`SELECT DateTime FROM Position WHERE GPSID = ${gpsID} order by ID desc limit 1`);
        let lastDateMySQL= Date.fromMysqlDate(`${lastPositionTimePoint[0].DateTime}`);
        let lastTime=lastDateMySQL.getTime();
        console.log(`lastPositionTimePoint is ${lastPositionTimePoint[0].DateTime}`);
        console.log(`lastDateMySQL is ${lastDateMySQL}`);
        console.log(`time is ${lastTime}`);// can have time
        Date.fromMysqlDate(`${actual}`);
      
        let status=[];
        for(i=0;i<myLegList.length;i++){
            
            if((myLegList[i].ActualArrivalTime!=null)&&(myLegList[i].ActualDepartureTime!=null)&&(myLegList[i+1].ActualArrivalTime!=null)){  // finished,  distanceMatrix is needed
               //get distanceMatrix record
               // let matrix=await ctx.db.query(`SELECT ETA,Time FROM GPSGroup WHERE LegID = '${myLegList[i].ID}'`);  // try later
                let statue={startLocation : myLegList[i].StartLocationID,  // SWITCH TO NAME
                            expectedArrivalTime : myLegList[i].ExpectedArrivalTime,
                            actualArrivalTime : myLegList[i].ActualArrivalTime,
                            ontimeArrival : Math.MinuteDiff(myLegList[i].ExpectedArrivalTime,myLegList[i].ActualArrivalTime,30),
                            expectedDepartureTime : myLegList[i].ExpectedDepartureTime,
                            actualDepartureTime : myLegList[i].ActualDepartureTime,
                            loadDuration : Math.MinuteDiff((myLegList[i].ExpectedDepartureTime-myLegList[i].ExpectedArrivalTime),(myLegList[i].ActualDepartureTime-myLegList[i].ActualArrivalTime),30),
                            ontimeDeparture : Math.MinuteDiff(myLegList[i].ExpectedDepartureTime,myLegList[i].ActualDepartureTime,30),
                            intransitDuration : Math.MinuteDiff((myLegList[i+1].ActualArrivalTime-myLegList[i].ActualDepartureTime),(myLegList[i+1].ExpectedArrivalTime-myLegList[i].ExpectedDepartureTime),30),
                           // ontimeArrivalForecast:Math.MinuteDiff(myLegList[i].ActualDepartureTime + PredictedTime,myLegList[i+1].ExpectedArrivalTime, 30),  //  do it later
                            legStatus: 0 ,   //arrival
                            routeStatus:1    // open ?
                            
                        };
                    status.push(statue);
            }else if((myLegList[i].ActualArrivalTime!=null)&&(myLegList[i].ActualDepartureTime!=null)&&(myLegList[i+1].ActualArrivalTime==null)){  // on road,  distanceMatrix is needed
                
                let statue={
                    startLocation : myLegList[i].StartLocationID,  // SWITCH TO NAME
                    expectedArrivalTime : myLegList[i].ExpectedArrivalTime,
                    actualArrivalTime : myLegList[i].ActualArrivalTime,
                    ontimeArrival : Math.MinuteDiff(myLegList[i].ExpectedArrivalTime,myLegList[i].ActualArrivalTime,30),
                    expectedDepartureTime : myLegList[i].ExpectedDepartureTime,
                    actualDepartureTime : myLegList[i].ActualDepartureTime,
                    loadDuration : Math.MinuteDiff((myLegList[i].ExpectedDepartureTime-myLegList[i].ExpectedArrivalTime),(myLegList[i].ActualDepartureTime-myLegList[i].ActualArrivalTime),30),
                    ontimeDeparture : Math.MinuteDiff(myLegList[i].ExpectedDepartureTime,myLegList[i].ActualDepartureTime,30),
                    intransitDuration : Math.MinuteDiff((lastPositionTimePoint-myLegList[i].ActualDepartureTime),(myLegList[i+1].ExpectedArrivalTime-myLegList[i].ExpectedDepartureTime),30), // use ls
                     // ontimeArrivalForecast:Math.MinuteDiff(myLegList[i].ActualDepartureTime + PredictedTime,myLegList[i+1].ExpectedArrivalTime, 30),  //  do it later
                    legStatus: 0 ,   //arrival
                    routeStatus:1    // open ?
                };
    
                status.push(statue);
            
            
            
            }else if((myLegList[i].ActualArrivalTime!=null)&&(myLegList[i].ActualDepartureTime==null)){ // not last leg : loading,  last leg: done
                //get the last position data
     
                
                //if not the last leg, it's loading
                if(i<myLegList.length-1)
                {
                    let statue={
                        startLocation : myLegList[i].StartLocationID,  // SWITCH TO NAME
                        expectedArrivalTime : myLegList[i].ExpectedArrivalTime,
                        actualArrivalTime : myLegList[i].ActualArrivalTime,
                        ontimeArrival : Math.MinuteDiff(myLegList[i].ExpectedArrivalTime,myLegList[i].ActualArrivalTime,30),
                        expectedDepartureTime : myLegList[i].expectedDepartureTime,
                        actualDepartureTime : myLegList[i].actualDepartureTime,
                        loadDuration : Math.MinuteDiff(myLegList[i].ExpectedArrivalTime,lastPositionTimePoint,30),
                        ontimeDeparture : Math.MinuteDiff(myLegList[i].ExpectedDepartureTime,lastPositionTimePoint,30),};
                    status.push(statue);
                    break;
                }
                else{   //if it's the last leg
                let statue={
                    startLocation : myLegList[i].StartLocationID,  // SWITCH TO NAME
                    expectedArrivalTime : myLegList[i].ExpectedArrivalTime,
                    actualArrivalTime : myLegList[i].ActualArrivalTime,
                    ontimeArrival : Math.MinuteDiff(myLegList[i].ExpectedArrivalTime,myLegList[i].ActualArrivalTime,30),
                   // loadDuration: Math.MinuteDiff(myLegList[i].ExpectedArrivalTime,lastPositionTimePoint,30),
                   // ontimeDeparture : Math.MinuteDiff(myLegList[i].ExpectedDepartureTime,lastPositionTimePoint,30),
                    };
                    status.push(statue);
                    break;
    
                }
                
            }
        }

    return status;
       
        

},



    /*================================================
    name:GetByRouteID
    description:   Return status based on given RouteID
    return value:
    data type : Json object which contains Status       
    ================================================== */ 



async GetByRouteID(routeId){

        let myLegList = await DAL.GetLegs(routeId);
    
        console.log(myLegList);

        //let length=myLegList.length;
       // let query=`select TIMESTAMPDIFF(MINUTE, '2018-03-20 09:00:00', '2018-03-22 10:00:00')`;
        //let diff=await ctx.db.query(query);
    

             
        //let gpsID = await DAL.GetGpsIdByRouteId(routeId);
          // the lastPositionTimePoint value can either take from cache
          // this value can be `undefined` if no last position exist
          // this only used for unfinished leg . when a leg is finished, the forecast is meaningless
        //let lastPositionTimePoint= Business.GetLastPositionTime(gpsID);
        let lastPosition = DAL.GetLastPositionByRouteID(routeID);
        let lastPositionTime = undefined;
        let lastPositionID = undefined;
        if(lastPosition!==undefined){
            //lastPositionTimePoint=await db.query(`SELECT DateTime FROM Position WHERE GPSID = ? order by ID desc limit 1`,[gpsID]);
            lastPositionTime = lastPosition.DateTime;
            lastPositionID = lastPosition.ID;
        } 
        
        // If there is no possible when the truck is in transit, it has no previous position 

        let lastDateMySQL= Date.fromMysqlDate(`${lastPositionTimePoint[0].DateTime}`);
        let lastTime=lastDateMySQL.getTime();
        // console.log(`lastPositionTimePoint is ${lastPositionTimePoint[0].DateTime}`);
        // console.log(`lastDateMySQL is ${lastDateMySQL}`);
        // console.log(`time is ${lastTime}`);// can have time
        // Date.fromMysqlDate(`${actual}`);
      
        let status=[];
        for(i=0;i<myLegList.length;i++){
            
            if((myLegList[i].ActualArrivalTime!=null)&&(myLegList[i].ActualDepartureTime!=null)&&(myLegList[i+1].ActualArrivalTime!=null)){  // finished,  distanceMatrix is not needed
               //get distanceMatrix record
               // let matrix=await ctx.db.query(`SELECT ETA,Time FROM GPSGroup WHERE LegID = '${myLegList[i].ID}'`);  // try later
                let statue={
                            startLocation : myLegList[i].StartLocationID,  // SWITCH TO NAME
                            expectedArrivalTime : myLegList[i].ExpectedArrivalTime,
                            actualArrivalTime : myLegList[i].ActualArrivalTime,
                            expectedDepartureTime : myLegList[i].ExpectedDepartureTime,
                            actualDepartureTime : myLegList[i].ActualDepartureTime,
                            //==============================================
                            ontimeArrival : Math.MinuteDiff(myLegList[i].ExpectedArrivalTime,myLegList[i].ActualArrivalTime,30),
                            loadDuration : Math.MinuteDiff((myLegList[i].ExpectedDepartureTime-myLegList[i].ExpectedArrivalTime),(myLegList[i].ActualDepartureTime-myLegList[i].ActualArrivalTime),30),
                            ontimeDeparture : Math.MinuteDiff(myLegList[i].ExpectedDepartureTime,myLegList[i].ActualDepartureTime,30),
                            intransitDuration : Math.MinuteDiff((myLegList[i+1].ActualArrivalTime-myLegList[i].ActualDepartureTime),(myLegList[i+1].ExpectedArrivalTime-myLegList[i].ExpectedDepartureTime),30),
                            //ontimeArrivalForecast:Math.MinuteDiff(myLegList[i].ActualDepartureTime + PredictedTime,myLegList[i+1].ExpectedArrivalTime, 30),  //  do it later
                            ontimeArrivalForecast:null,  //  this leg is closed, so that this status is meaningless
                            legStatus: 0 ,   //arrival
                            routeStatus:1    // open ?
                            
                        };
                    status.push(statue);
            }else if((myLegList[i].ActualArrivalTime!=null)&&(myLegList[i].ActualDepartureTime!=null)&&(myLegList[i+1].ActualArrivalTime==null)){  // on road,  distanceMatrix is needed
                
                let statue={
                            startLocation : myLegList[i].StartLocationID,  // SWITCH TO NAME
                            expectedArrivalTime : myLegList[i].ExpectedArrivalTime,
                            actualArrivalTime : myLegList[i].ActualArrivalTime,
                            expectedDepartureTime : myLegList[i].ExpectedDepartureTime,
                            actualDepartureTime : myLegList[i].ActualDepartureTime,
                            //=====================================================
                            ontimeArrival : Math.MinuteDiff(myLegList[i].ExpectedArrivalTime,myLegList[i].ActualArrivalTime,30),
                            loadDuration : Math.MinuteDiff((myLegList[i].ExpectedDepartureTime-myLegList[i].ExpectedArrivalTime),(myLegList[i].ActualDepartureTime-myLegList[i].ActualArrivalTime),30),
                            ontimeDeparture : Math.MinuteDiff(myLegList[i].ExpectedDepartureTime,myLegList[i].ActualDepartureTime,30),
                            intransitDuration : Math.MinuteDiff((lastPositionTimePoint-myLegList[i].ActualDepartureTime),(myLegList[i+1].ExpectedArrivalTime-myLegList[i].ExpectedDepartureTime),30), // use ls
                            //TODO:  determine PredictedTime
                            ontimeArrivalForecast:Math.MinuteDiff((myLegList[i].ActualDepartureTime + PredictedTime),myLegList[i+1].ExpectedArrivalTime, 30),  //  do it later
                            legStatus: 5 ,   //??? ,  close
                            routeStatus:1    // open ?
                    };
    
                status.push(statue);
            
            
            
            }else if((myLegList[i].ActualArrivalTime!=null)&&(myLegList[i].ActualDepartureTime==null)){ // not last leg : loading,  last leg: done
                //get the last position data
     
                
                //if not the last leg, it's loading
                if(i<myLegList.length-1)
                {
                    let statue={
                                startLocation : myLegList[i].StartLocationID,  // SWITCH TO NAME
                                expectedArrivalTime : myLegList[i].ExpectedArrivalTime,
                                actualArrivalTime : myLegList[i].ActualArrivalTime,
                                expectedDepartureTime : myLegList[i].expectedDepartureTime,
                                actualDepartureTime : myLegList[i].actualDepartureTime,
                                //=====================================
                                ontimeArrival : Math.MinuteDiff(myLegList[i].ExpectedArrivalTime,myLegList[i].ActualArrivalTime,30),
                                loadDuration : Math.MinuteDiff(myLegList[i].ExpectedArrivalTime,lastPositionTimePoint,30),
                                ontimeDeparture : Math.MinuteDiff(myLegList[i].ExpectedDepartureTime,lastPositionTimePoint,30),
                                intransitDuration: null,
                                //TODO:  determine PredictedTime, even it's loading, predict it will leave right now to predict if the truck will arrive next location on time
                                ontimeArrivalForecast:Math.MinuteDiff((lastPositionTimePoint + PredictedTime),myLegList[i+1].ExpectedArrivalTime, 30),
                                legStatus:1 ,   // Loading
                                routeStatus:1    // open ?
                            } //  do it later
                    status.push(statue);
                    break;
                }
                else{   //if it's the last leg

                let statue={
                            startLocation : myLegList[i].StartLocationID,  // SWITCH TO NAME
                            expectedArrivalTime : myLegList[i].ExpectedArrivalTime,
                            actualArrivalTime : myLegList[i].ActualArrivalTime,
                            ontimeArrival : Math.MinuteDiff(myLegList[i].ExpectedArrivalTime,myLegList[i].ActualArrivalTime,30),
                            loadDuration: null,
                            ontimeDeparture : null,
                            ontimeArrivalForecast:null,
                            legStatus: 0 ,   // Arrival
                            routeStatus:0    // finished
                    };
                    status.push(statue);
                    break;
    
                }
                
            }
        }

    return status;
             
        

}

}