/*====================================================================
FileName   : DAL.js
Description: Methods about Data access layer are here 
Project    : Karmax
Programmer : Zhendong Tang (Mike)
Date       : April, 2020
=====================================================================*/

const Path=require('path');
const db=require(Path.resolve(__dirname,'./database'));
const Math=require(Path.resolve(__dirname,'./Math')); 
const mysqldate=require(`mysqldate`);// for parse mySQL DataTime //https://www.npmjs.com/package/mysqldate
const Validator=require(Path.resolve(__dirname,'./validator'));
module.exports={

    /*================================================
    name: GetGpsIdByRouteId
    description :  Get current GPSid by the Route id
    return value:  GpsID
    ================================================== */  
    async GetGpsIdByRouteId(routeID){
        //get last leg
        let gpsID = undefined;
        try{
            //await db.query(`INSERT route(TotalCost,PlantID) VALUES(0,1)`);
            gpsID = await db.query(`CALL GetGpsIdByRouteID(?)`,[routeID]);
           // gpsID = await db.query(`SELECT GPSID FROM GPSGroup WHERE LegID = (SELECT ID FROM Leg WHERE RouteID = ? ORDER BY ID DESC LIMIT 1);`,[routeID]);

        }catch(err){
            console.log(`GetGpsIdByRouteId==> Error occurs when access Database!`);  // Write to Log file
            console.log(`Error info: ${err}`);                                      // Write to Log file
            return 0; // Error occurs when access Database.
        }   
        return gpsID[0][0].GPSID;   // if use store procedure

    },
    /*================================================
    Name: getPlantIDs
    Description :  get all plantID
    Return value:  All plantIDs
    ================================================== */  
    async GetPlantIDs(){
        let plantIDs=[];
        try{
            //await db.query(`INSERT route(TotalCost,PlantID) VALUES(0,1)`);
            plantIDs = await db.query(`SELECT ID FROM Plant`);
        }catch(err){
            console.log(`getPlantIDs==> Error occurs when access Database!`);  // Write to Log file
            console.log(`Error info: ${err}`);                                      // Write to Log file
            return 0; // Error occurs when access Database.
        }   
        return plantIDs;

    },
    /*==========================================
    name: IsLegalPlantID
    description: This method will be called only one time everyday
    input: plantid
    return:  
          data type : number
           0 : plantID is legal
          -1 : variable is not legal
          -2 : error occurs when access database
          -3 : plantID is not legal 
    ============================================= */  
    async IsLegalPlantID(id){
        if(isNaN(id)){
            console.log(`Wrong parameter data type!`);
            return -1;  // input data type wrong
        };
        let plantIDs=[];
        try{
            //await db.query(`INSERT route(TotalCost,PlantID) VALUES(0,1)`);
            plantIDs = await db.query(`SELECT ID FROM plant`);
            for(let i=0;i<plantIDs.length;i++){
                if(plantIDs[i].ID==Number(id)){
                    return 0;   // 0,-1, -2 : Error occurs or id is not legal
                }
            }
            return -3;   //not a legal plantID
        }catch(err){
            console.log(`getPlantIDs==> Error occurs when access Database!`);  // Write to Log file
            console.log(`Error info: ${err}`);                                      // Write to Log file
            return -2; // Error occurs when access Database.
        } ;  
        

    },
    /*=========================================
    name       :  GetGpsIdList
    description:  get all GpsID
    return     :  avaiable Gps id
    ============================================= */  

    async GetGpsIdList(){

        let gpsIDs=[];
        try{
            //await db.query(`INSERT route(TotalCost,PlantID) VALUES(0,1)`);
            //gpsIDs = await db.query(`SELECT ID FROM gps`);   
            gpsIDs = await db.query(`CALL GetGpsIdList()`); 
            return gpsIDs[0].map(item=>item.ID);//
        }catch(err){
            console.log(`IsLegalGpsID==> Error occurs when access Database!`);  // Write to Log file
            console.log(`Error info: ${err}`);                            // Write to Log file
            return 0; // Error occurs when access Database.
        } ;  
        

    },
    
    /*=========================================
    name: Get_GpsID_locationID_plantID
    description:  get all GpsID ,locationID and plantID at one time
    ============================================= */  

    async Get_GpsID_locationID_plantID(){

        let results=undefined;
        try{
            //await db.query(`INSERT route(TotalCost,PlantID) VALUES(0,1)`);
            //gpsIDs = await db.query(`SELECT ID FROM gps`);   
            result = await db.query(`SELECT ID FROM GPS;SELECT ID FROM Location; SELECT ID FROM Plant`); 
            global.GpsIdList = result[0].map(item=>item.ID);        // Add gpsID list to global object 
            global.LocationIdList= result[1].map(item=>item.ID);    // Add LocationID list to global object
            global.PlantIdList= result[2].map(item=>item.ID); 
            return 1;//
        }catch(err){
            console.log(`IsLegalGpsID==> Error occurs when access Database!`);  // Write to Log file
            console.log(`Error info: ${err}`);                            // Write to Log file
            return -1; // Error occurs when access Database.
        } ;  
        

    },


    /*=========================================
    name: GetGpsAndLocation
    description:  get all GpsID and locations 
    ============================================= */  

    async GetGpsAndLocation(){

        let results=undefined;
        try{
            //await db.query(`INSERT route(TotalCost,PlantID) VALUES(0,1)`);
            //gpsIDs = await db.query(`SELECT ID FROM gps`); 
            //results = await db.query(`CALL GetGpsIdList();CALL GetLocations()`);   
            results = await db.query(`SELECT * FROM GPS;SELECT * FROM Location`); 
            global.GpsIdList = results[0].map(item=>item.ID);       // Add gpsID list to global object 
            //global.LocationList= results[2];        // if using store procedure, the result is at [2]
            global.LocationList= results[1];  
            return 1;//
        }catch(err){
            console.log(`IsLegalGpsID==> Error occurs when access Database!`);  // Write to Log file
            console.log(`Error info: ${err}`);                            // Write to Log file
            return 0; // Error occurs when access Database.
        } ;  
        

    },

   /*=====================================================
    name: GetLocations
    description: Read all locations interest
    =======================================================*/
    async  GetLocations(){
   
        try{
            //let locationList=await db.query(`SELECT * FROM location WHERE Name <> ? `,['No Location']);
            //let locationList=await db.query(`SELECT * FROM location`);
            let locationList=await db.query(`CALL GetLocations()`);
            return locationList[0];  // Successfully
        }catch(err){
            console.log(`GetLocations()==> Error occurs when access Database!`);  // Write to Log file 
            console.log(`Error Info: ${err}`);
            return 0;     //  Error occurs
        }

    },

    /*=========================================
    name: IsLegalGpsID
    description:  check if a GPSid is legal
    input: plantid
    return:  
          data type : number
           0 : ID is legal
          -1 : variable is not legal
          -2 : error occurs when access database
          -3 : not legal 
    ============================================= */  

    async IsLegalGpsID(id){
        if(isNaN(id)){
            console.log(`Wrong parameter data type!`);
            return -1;  // input data type wrong
        };
        let gpsIDs=[];
        try{
            //await db.query(`INSERT route(TotalCost,PlantID) VALUES(0,1)`);
            gpsIDs = await db.query(`SELECT ID FROM gps`);
            for(let i=0;i<gpsIDs.length;i++){
                if(gpsIDs[i].ID==Number(id)){
                    return 0;   // a legal gpsID
                }
            }
            return -3;   //not a legal gpsID
        }catch(err){
            console.log(`IsLegalGpsID==> Error occurs when access Database!`);  // Write to Log file
            console.log(`Error info: ${err}`);                            // Write to Log file
            return -2; // Error occurs when access Database.
        } ;  
        

    },
    


    /*====================================================
    name: GetLocationIDs
    description: Read all locations interest
    ======================================================*/
    async  GetLocationIDs(){
   
        try{
            //let locationIdList=await db.query(`SELECT ID FROM location WHERE Name <> ? `,['No Location']);  // Without 0 location
           let locationIdList=await db.query(`SELECT ID FROM location `);  // All locations includes 0
           // let locationIdList=await db.query(`CALL GetLocations()`);  // All locations includes 0  
            return  locationIdList.map(item=>item.ID);  // Successfully
        }catch(err){
            console.log(`GetLocations()==> Error occurs when access Database!`);  // Write to Log file 
            console.log(`Error Info: ${err}`);
            return 0;     //  Error occurs
        }

    },

    /*=========================================================
    name: InsertRouteID
    description: insert a routeID and plantID(id PIA has a unique RouteID, will use this method)
    return:  
          data type : number
          1  : successful
          -1 : error occurs when access Database 
          other: the RouteID we want
    =========================================================== */
    async InsertRouteID(plantID,routeID){
        // Validate plantID
        // if(isNaN(plantID)){
        //     console.log(`InsertAndGetRouteID()==>Expected a number as plantID, make sure the data type!`); // Write to Log file
        //     return -1;  // Data type has error.
        // };
        //check if plantID is legal
        //let isLegalPlantID = await this.IsLegalPlantID(plantID);  // will validate this outside this method
        // if(isLegalPlantID!==0){ // something wrong with plantID
        //     return -1;  // -1,-2,-3, can not validate plantID
        // }
        //Insert plantID and return a RouteID
        //let RouteID =[];
        try{
            //await db.query(`INSERT route(TotalCost,PlantID) VALUES(0,1)`);
            await db.query(`INSERT Route SET ?`,{PlantID:Number(plantID),ID:routeID});
            //RouteID = await db.query(`SELECT LAST_INSERT_ID()`);
            //console.log(`Insert route successfully!`);  
        }catch(err){
            console.log(`InsertLegs()==> Error occurs when insert data into Database!`);  // Write to Log file
            console.log(`Error info: ${err}`);                                      // Write to Log file
            return -1; // Error occurs when access Database.
        }   
       // return RouteID[0][`LAST_INSERT_ID()`];
       return 1;

    },
    /*=========================================================
    name: InsertAndGetRouteID
    description: insert a route and return a row id as Route ID
    return:  
          data type : number
          -1 : check plantID error, or data type error, or illegal, or access database wrong
          -2 : error occurs when access Database 
          other: the RouteID we want
    =========================================================== */
    async InsertAndGetRouteID(plantID){
        // Validate plantID
        if(isNaN(plantID)){
            console.log(`InsertAndGetRouteID()==>Expected a number as plantID, make sure the data type!`); // Write to Log file
            return -1;  // Data type has error.
        };
        //check if plantID is legal
        let isLegalPlantID = await this.IsLegalPlantID(plantID);
        if(isLegalPlantID!==0){ // something wrong with plantID
            return -1;  // -1,-2,-3, can not validate plantID
        }
        //Insert plantID and return a RouteID
        let RouteID =[];
        try{
            //await db.query(`INSERT route(TotalCost,PlantID) VALUES(0,1)`);
            await db.query(`INSERT route SET ?`,{PlantID:Number(plantID)});
            RouteID = await db.query(`SELECT LAST_INSERT_ID()`);
            //console.log(`Insert route successfully!`);  
        }catch(err){
            console.log(`InsertLegs()==> Error occurs when insert data into Database!`);  // Write to Log file
            console.log(`Error info: ${err}`);                                      // Write to Log file
            return -2; // Error occurs when access Database.
        }   
        return RouteID[0][`LAST_INSERT_ID()`];

    },
    /*=========================================================
    name: InsertLegsOldVersion
    description: insert Legs of a Route
    input: '',"", "0", 0 will all be considered as 0 !
    return:  
          -1 : data type has error
          -2 : error occurs when access Database 
          -3 : illegal locationID
          [legID..] : array of LegIDs
    =========================================================== */
    async InsertLegsOldVersion(routeID,legArray){

        // Get the location list ready
        let locationIDs= await this.GetLocationIDs();
            if(!isNaN(locationIDs)){   // Get Location list successfully
                return -2;  // Error occurs when access database
            };
                
        let legIdArray=[];
        
        /*=============Insert ALL legs ======================*/
        // the ExpectedDepartureTime and the ActualDepartureTime will be null 
        for(let i=0;i<legArray.length;i++){
        
        //============number data type
        //let routeID = legArray[i].routeID;  // maybe the Karmax will give a RouteID or just use the Row number of new route
        let startLocationID = legArray[i].StartLocationID;
        let endLocationID = legArray[i].EndLocationID;
        let variableCost = legArray[i].VariableCost;
        let fixedCost = legArray[i].FixedCost;
        let estimatedCost = legArray[i].EstimatedCost;
            //=============DateTime string
        let expectedArrivalTime = legArray[i].ExpectedArrivalTime;
        let expectedDepartureTime = legArray[i].ExpectedDepartureTime;
            //===validate number date type, make sure it is a number or a string of number
            if(isNaN(routeID)||isNaN(startLocationID)||isNaN(endLocationID)||isNaN(variableCost)||isNaN(fixedCost)||isNaN(estimatedCost)){
                console.log(`InsertLegs()==>Expected a number, make sure the data type!`);
                return -1;  // Data type has error.
            };
            
             // ===check if locationID is legal

            if(!locationIDs.includes(startLocationID)||!locationIDs.includes(endLocationID)){
                console.log(`InsertLegs()==>locationID doesn't exist!`);
                return -3;  // Data type has error.   
            } 

            //===validate DateTime string

            if (i<legArray.length-1){  //not the last leg
                if((!Validator.IsDateTime(expectedArrivalTime))||(!Validator.IsDateTime(expectedDepartureTime))){
                    console.log(`InsertLegs()==>Expected a DateTime, make sure the data type!`);
                    return -1;  // Data type has error.
                }   
            }else{  // For the last leg,  the ExpectedDepartureTime will be ignored
                if(!Validator.IsDateTime(expectedArrivalTime)){
                    console.log(`InsertLegs()==>Expected a DateTime, make sure the data type!`);
                    return -1; }// Data type has error.
            }
            
            //===Ready to insert data into Table: leg
            
            if (i<legArray.length-1){  // not the last leg
                try{
                    //let sql= await db.query(`INSERT leg(RouteID,StartLocationID,EndLocationID,ExpectedArrivalTime,ExpectedDepartureTime,OrderInRoute,VariableCost,FixedCost,EstimatedCost) VALUES (${RouteID},${StartLocationID},${EndLocationID},'${ExpectedArrivalTime}','${ExpectedDepartureTime}',1,${VariableCost},${FixedCost},${EstimatedCost})`);
                    await db.query(`INSERT leg SET ?`,{RouteID:Number(routeID),StartLocationID:Number(startLocationID),EndLocationID:Number(endLocationID),ExpectedArrivalTime:expectedArrivalTime,ExpectedDepartureTime:expectedDepartureTime,OrderInRoute:(i+1),VariableCost:Number(variableCost),FixedCost:Number(fixedCost),EstimatedCost:Number(estimatedCost)});
                    let ID = await db.query(`SELECT LAST_INSERT_ID()`);
                    legIdArray.push(ID[0][`LAST_INSERT_ID()`]);   // Push legID into array
                } catch(err){
                        console.log(`InsertLegs()==> Error occurs when insert data into Database!`);
                        console.log(`Error info: ${err}`);
                        return -2;  // Error occurs when access database
                } 
                

            }
            else{  // Insert the last leg

                try{
                    //let sql= await db.query(`INSERT leg(RouteID,StartLocationID,EndLocationID,ExpectedArrivalTime,ExpectedDepartureTime,OrderInRoute,VariableCost,FixedCost,EstimatedCost) VALUES (${RouteID},${StartLocationID},${EndLocationID},'${ExpectedArrivalTime}','${ExpectedDepartureTime}',1,${VariableCost},${FixedCost},${EstimatedCost})`);
                    await db.query(`INSERT leg SET ?`,{RouteID:Number(routeID),StartLocationID:Number(startLocationID),EndLocationID:Number(endLocationID),ExpectedArrivalTime:expectedArrivalTime,OrderInRoute:(i+1),VariableCost:Number(variableCost),FixedCost:Number(fixedCost),EstimatedCost:Number(estimatedCost)});
                    let ID = await db.query(`SELECT LAST_INSERT_ID()`);
                    legIdArray.push(ID[0][`LAST_INSERT_ID()`]);   // Push legID into array
                } catch(err){
                        console.log(`InsertLegs()==> Error occurs when insert data into Database!`);
                        console.log(`Error info: ${err}`);
                        return -2;  // Error occurs when access database
                } 

            }

               
     
    }

    return legIdArray; // All insertions are successful.
    
},
 /*=========================================================
    name: InsertLegs
    description: insert Legs of a Route
    input: '',"", "0", 0 will all be considered as 0 !
    return:  
          0 : data type has error
          [legID..] : array of LegIDs
    =========================================================== */
    async InsertLegs(route){

      
                
        let returnLegIdArray=[];   // used for holding legIDs
        //let plant_id=route.plantID;
        //let gps_id=route.gpsID;
        let legArray=route.legs;
        let route_id=route.routeID;
        /*=============Insert ALL legs ======================*/
        // the ExpectedDepartureTime and the ActualDepartureTime will be null 
        for(let i=0;i<legArray.length;i++){
        
        //============number data type
        //let routeID = legArray[i].routeID;  // maybe the Karmax will give a RouteID or just use the Row number of new route
        let startLocationID = legArray[i].StartLocationID;
        let endLocationID = legArray[i].EndLocationID;
        let variableCost = legArray[i].VariableCost;
        let fixedCost = legArray[i].FixedCost;
        let estimatedCost = legArray[i].EstimatedCost;
            //=============DateTime string
        let expectedArrivalTime = legArray[i].ExpectedArrivalTime;
        let expectedDepartureTime = legArray[i].ExpectedDepartureTime;
           
            
            //===Ready to insert data into Table: leg
            
            if (i<legArray.length-1){  // not the last leg
                try{
                    //let sql= await db.query(`INSERT leg(RouteID,StartLocationID,EndLocationID,ExpectedArrivalTime,ExpectedDepartureTime,OrderInRoute,VariableCost,FixedCost,EstimatedCost) VALUES (${RouteID},${StartLocationID},${EndLocationID},'${ExpectedArrivalTime}','${ExpectedDepartureTime}',1,${VariableCost},${FixedCost},${EstimatedCost})`);
                    // await db.query(`INSERT leg SET ?`,{RouteID:Number(routeID),StartLocationID:Number(startLocationID),EndLocationID:Number(endLocationID),ExpectedArrivalTime:expectedArrivalTime,ExpectedDepartureTime:expectedDepartureTime,OrderInRoute:(i+1),VariableCost:Number(variableCost),FixedCost:Number(fixedCost),EstimatedCost:Number(estimatedCost)});
                    // let ID = await db.query(`SELECT LAST_INSERT_ID()`);
                    let ID = await db.query(`INSERT Leg SET ?;SELECT LAST_INSERT_ID()`,{RouteID:route_id,StartLocationID:Number(startLocationID),EndLocationID:Number(endLocationID),ExpectedArrivalTime:expectedArrivalTime,ExpectedDepartureTime:expectedDepartureTime,OrderInRoute:(i+1),VariableCost:Number(variableCost),FixedCost:Number(fixedCost),EstimatedCost:Number(estimatedCost)});
                    returnLegIdArray.push(ID[1][0][`LAST_INSERT_ID()`]);   // Push legID into array
                } catch(err){
                        console.log(`InsertLegs()==> Error occurs when insert data into Database!`);
                        console.log(`Error info: ${err}`);
                        return 0;  // Error occurs when access database
                } 
                

            }
            else{  // Insert the last leg

                try{
                    //let sql= await db.query(`INSERT leg(RouteID,StartLocationID,EndLocationID,ExpectedArrivalTime,ExpectedDepartureTime,OrderInRoute,VariableCost,FixedCost,EstimatedCost) VALUES (${RouteID},${StartLocationID},${EndLocationID},'${ExpectedArrivalTime}','${ExpectedDepartureTime}',1,${VariableCost},${FixedCost},${EstimatedCost})`);
                    // await db.query(`INSERT leg SET ?`,{RouteID:Number(routeID),StartLocationID:Number(startLocationID),EndLocationID:Number(endLocationID),ExpectedArrivalTime:expectedArrivalTime,OrderInRoute:(i+1),VariableCost:Number(variableCost),FixedCost:Number(fixedCost),EstimatedCost:Number(estimatedCost)});
                    // let ID = await db.query(`SELECT LAST_INSERT_ID()`);
                    let ID = await db.query(`INSERT Leg SET ?;SELECT LAST_INSERT_ID()`,{RouteID:route_id,StartLocationID:Number(startLocationID),EndLocationID:Number(endLocationID),ExpectedArrivalTime:expectedArrivalTime,OrderInRoute:(i+1),VariableCost:Number(variableCost),FixedCost:Number(fixedCost),EstimatedCost:Number(estimatedCost)});
                    returnLegIdArray.push(ID[1][0][`LAST_INSERT_ID()`]);   // Push legID into array
                } catch(err){
                        console.log(`InsertLegs()==> Error occurs when insert data into Database!`);
                        console.log(`Error info: ${err}`);
                        return 0;  // Error occurs when access database
                } 

            }

               
     
    }

    return returnLegIdArray; // All insertions are successful.
    
},
    
    /*=================================================
    name:  InsertGpsGroupOldVersion
    description: Read all locations interest
        return:  
          -1 : Parameter data type error
          -2 : gps id is not legal
          -3 : Error occurs when access Database 
           0 : Insertion is successful.
    ====================================================*/
    async  InsertGpsGroupOldVersion(legID,gpsID,orderInRoute){
        // legID are generated by Database, they should be OK
 
        if(isNaN(legID)||isNaN(gpsID)||isNaN(orderInRoute)){
            console.log(`InsertGpsGroup()==>Expected a number, make sure the data type!`);
            return -1;  // Data type has error.
        };
        let isGpsLegal = await this.IsLegalGpsID(gpsID)
        // the gpsID comes from PIA,  need validate
        if(isGpsLegal!==0){
            console.log(`InsertGpsGroup()==>Gps id is not legal! please check.`);
            return -2;  // gps is not legal
        }

        //===Ready to insert data into Table: leg
        try{
        //let sql= await db.query(`INSERT leg(RouteID,StartLocationID,EndLocationID,ExpectedArrivalTime,ExpectedDepartureTime,OrderInRoute,VariableCost,FixedCost,EstimatedCost) VALUES (${RouteID},${StartLocationID},${EndLocationID},'${ExpectedArrivalTime}','${ExpectedDepartureTime}',1,${VariableCost},${FixedCost},${EstimatedCost})`);
        await db.query(`INSERT gpsgroup SET ?`,{LegID:Number(legID),gpsID:Number(gpsID),orderInGroup:Number(orderInRoute)});
        return 0;     //   Insert successfully
        } catch(err){
            console.log(`InsertGpsGroup()==> Error occurs when insert data into Database!`);
            console.log(`Error info: ${err}`);
            return -3;  // Error occurs when access database
        } 
    }, 

    /*=================================================
    name: InsertGpsGroup
    description: Read all locations interest
        input: legID array, gpsID
        return:  
          -1 : Error occurs when access Database 
           1 : Insertion is successful.
    ====================================================*/
    async  InsertGpsGroup(legIDs,gpsID){
        // legID are generated by Database, they should be OK
        // gpsID has been validated by previous step

        //===Ready to insert data into Table: leg
        for(let i=0;i<legIDs.length;i++)
        {
         try{
                //let sql= await db.query(`INSERT leg(RouteID,StartLocationID,EndLocationID,ExpectedArrivalTime,ExpectedDepartureTime,OrderInRoute,VariableCost,FixedCost,EstimatedCost) VALUES (${RouteID},${StartLocationID},${EndLocationID},'${ExpectedArrivalTime}','${ExpectedDepartureTime}',1,${VariableCost},${FixedCost},${EstimatedCost})`);
                await db.query(`INSERT GPSGroup SET ?`,{LegID:legIDs[i],GPSID:gpsID,OrderInGroup:(i+1)});               
            } catch(err){
                    console.log(`InsertGpsGroup()==> Error occurs when insert data into Database!`);
                    console.log(`Error info: ${err}`);
                    return -1;  // Error occurs when access database
            } 

        };

        return 1;     //   Insert successfully
        
    }, 


    /*================================================
    name: GetLastLegID
    description: get last relevant legID according to GPSid
    parameter: number: gpsid
    return value: 
           legID
           0 :  Error occurs when access database
    ==================================================*/

    async  GetLastLegID(GPSid){
        try{
            let LegID = await db.query(`SELECT LegID FROM GPSGroup WHERE GPSID = ? ORDER BY LegID DESC LIMIT 1`,[GPSid]);
            return LegID[0].LegID;
        }catch(err){
            console.log(`GetLastLegID()==>Error occurs when access database.`);
            console.log(`Error Info: ${err}`);
            return 0; // Error occurs
        }
 
    },

    /*========================================================================
    name: getLegs
    description: Read all legs data belong to given routeID from the Leg table
    ==========================================================================*/
    async  GetLegs(routeID){
   
        try{
            let myLegList=await db.query(`SELECT * From Leg WHERE RouteID = '${routeID}' ORDER BY OrderInRoute ASC`);
            //console.log(`In the function and the legList is ${myLegList}`);
            return myLegList;
        }
        catch(err){
            console.log(`GetLegs()==>Error occurs when access database.`);
            console.log(`Error Info: ${err}`);
            return 0; // Error occurs
        }
    },

    /*========================================================================
    name: GetLegByGpsID
    description: Read all legs data belong to given routeID from the Leg table
    ==========================================================================*/
    async  GetLegsByGpsID(GPSid){
   
        try{
            //let myLegList=await db.query(`SELECT * FROM Leg WHERE RouteID = (SELECT RouteID FROM Leg WHERE ID = (SELECT MAX(LegID) FROM GPSGroup WHERE GPSID = ?))`,[Number(GPSid)]);
            let myLegList=await db.query(`CALL GetLegsByGpsID(?)`,[Number(GPSid)]); //store procedure Works WELL
            //console.log(`In the function and the legList is ${myLegList}`);
            return myLegList[0];// FOR STORE PROCEDURE
            //return myLegList; // For QUERY
        }
        catch(err){
            console.log(`GetLegs()==>Error occurs when access database.`);
            console.log(`Error Info: ${err}`);
            return 0; // Error occurs
        }
    },


    /*=============================================================================================
    name: GetRouteID
    description: Get RouteID according to leg id
    =============================================================================================== */

    async GetRouteID(legID){
        try{
            let routeID = await db.query(`SELECT RouteID From Leg WHERE ID = '${legID}'`);
           // console.log(`In the function and the routeID is ${routeID[0].RouteID}`);
            return routeID[0].RouteID;
        }
        catch(err){
            console.log(`GetLastLegID()==>Error occurs when access database.`);
            console.log(`Error Info: ${err}`);
            return 0; // Error occurs
        }
       
    },
   
    /*=========================================================
    name: GetPreviousPosition
    description: Get the previous position for this GPSid,current legID
    return: undefined  : no previous Position
            {previous position}
    =========================================================== */
    async GetPreviousPosition(gpsID,currentLegID){
        //let previousPosition = await db.query(`SELECT Latitude, Longitude FROM position WHERE GPSID=${gpsID} AND LegID=${currentLegID} ORDER BY DateTime DESC LIMIT 1`) ;
        try{
            //let previousPosition = await db.query(`SELECT * FROM position WHERE GPSID=? AND LegID=? ORDER BY ID DESC LIMIT 1`,[Number(gpsID),Number(currentLegID)]) ;
            let previousPosition = await db.query(`CALL GetPreviousPosition(?,?)`,[Number(gpsID),Number(currentLegID)]) ;
            return previousPosition[0]; //for store procedure, if length is 0, then no previous position
            //return previousPosition[0]; //for query, if the value is undefined, then no previous position
        }catch(err){
            console.log(`GetPreviousPosition()==>Error occurs when access database.`);
            console.log(`Error Info: ${err}`);
            return 0; // Error occurs  
        }

    },
   /*=========================================================
    name: Insert Position into Position table
    description: Get the previous position for this GPSid
    return value: The position ID of this new position
                  0 : Error occurs when access Database
    =========================================================== */
    async InsertPosition(position,legID)
    {
        let gpsID=position.GPSid;
        let Latitude=position.Latitude;
        let Longitude=position.Longitude;
        let DateTime=position.DateTime;
       // console.log(`datetime is: ${DateTime}`);
        //let result=await ctx.db.query(`INSERT position (GPSID,LegID,Latitude,Longitude,DateTime) VALUES ('${gpsID}',${legID},${Latitude},${Longitude},"2019-12-11 01:24:00")`);
        //let data={}
        //let result=await ctx.db.query(`INSERT INTO position (GPSID,LegID,Latitude,Longitude,DateTime) VALUES ('1',11,43.521,-79.9143,'2019-12-11 01:24:00')`);
        try{
            //await db.query("insert position set ?",{GPSID:gpsID,LegID:legID,Latitude:Latitude,Longitude:Longitude,DateTime:DateTime});
            await db.query("CALL InsertPosition(?,?,?,?,?)",[gpsID,legID,Latitude,Longitude,DateTime]);
            let position=await db.query(`SELECT LAST_INSERT_ID()`);
            return position[0][`LAST_INSERT_ID()`];  //return the new inserted position ID  
        }catch(err){
            console.log(`GetPreviousPosition()==>Error occurs when access database.`);
            console.log(`Error Info: ${err}`);
            return 0; // Error occurs  
        }
 
    },
    
    //UPDATE leg table UPDATE leg SET ActualArrivalTime ='2018-03-22 10:22:00' WHERE ID=11;
     /*=========================================================
    name: UpdateActualArrivalTime
    description: Update leg table's actualArrivalTime
    =========================================================== */
    async UpdateActualArrivalTime(ActualArrivalTime,legID){
        try{
        //let previousPosition = await db.query(`SELECT Latitude, Longitude FROM position WHERE GPSID=${gpsID} AND LegID=${currentLegID} ORDER BY DateTime DESC LIMIT 1`) ;
            //await db.query(`UPDATE leg SET ActualArrivalTime =? WHERE ID=?`,[ActualArrivalTime,legID]) ;
            await db.query(`CALL UpdateActualArrivalTime(?,?)`,[ActualArrivalTime,legID]) ;
            return 1; //good
        }catch(err){
            console.log(`UpdateActualArrivalTime()==>Error occurs when access database.`);
            console.log(`Error Info: ${err}`);
            return 0; // Error occurs      
        }

    },
    /*=========================================================
    name: UpdateActualDepartureTime
    description: Update leg table's actualDepartureTime field
    =========================================================== */
    async UpdateActualDepartureTime(ActualDepartureTime,legID){
        //let previousPosition = await db.query(`SELECT Latitude, Longitude FROM position WHERE GPSID=${gpsID} AND LegID=${currentLegID} ORDER BY DateTime DESC LIMIT 1`) ;
        try{
            //await db.query(`UPDATE leg SET ActualDepartureTime =? WHERE ID=?`,[ActualDepartureTime,legID]) ;
            await db.query(`CALL UpdateActualDepartureTime(?,?)`,[ActualDepartureTime,legID]) ;
            return 1;  // good
        }catch(err){
            console.log(`UpdateActualDepartureTime()==>Error occurs when access database.`);
            console.log(`Error Info: ${err}`);
            return 0; // Error occurs       
        }
       // return status;
    },

    /*=========================================================
    name: InsertLegStatus
    description: Update status table
    =========================================================== */
    async InsertLegStatus(legStatusTypeID,positionID, locationID){
        try{
            //let status=await db.query("insert legstatus set ?",{LegStatusTypeID:legStatusTypeID,PositionID:positionID,LocationID:locationID});
            await db.query("CALL InsertLegStatus(?,?,?)",[legStatusTypeID,positionID,locationID]);
            let statusID=await db.query(`SELECT LAST_INSERT_ID()`);
            return statusID[0][`LAST_INSERT_ID()`];
        }catch(err){
            console.log(`InsertLegStatus()==>Error occurs when access database.`);
            console.log(`Error Info: ${err}`);
            return 0; // Error occurs  
        }

    },

    /*=========================================================
    name: InsertDistanceMatrix
    description: Insert data into distanceMatrix table
    =========================================================== */
    async InsertDistanceMatrix(gpsID,currentLegID){
        //let previousPosition = await db.query(`SELECT Latitude, Longitude FROM position WHERE GPSID=${gpsID} AND LegID=${currentLegID} ORDER BY DateTime DESC LIMIT 1`) ;
        let previousPosition = await db.query(`SELECT * FROM position WHERE GPSID=? AND LegID=? ORDER BY ID DESC LIMIT 1`,[gpsID,currentLegID]) ;
        return previousPosition[0];
    },

    /*=========================================================
    name: UpdateGpsGroupDateTimeStart
    description: update gpsGroup table
    =========================================================== */
    async UpdateGpsGroupDateTimeStart(time,legID){
        try{
        //let previousPosition = await db.query(`SELECT Latitude, Longitude FROM position WHERE GPSID=${gpsID} AND LegID=${currentLegID} ORDER BY DateTime DESC LIMIT 1`) ;
        //await db.query(`UPDATE gpsgroup SET DateTimeStart =? WHERE LegID=?`,[time,legID]) ;
        await db.query(`CALL UpdateGpsGroupDateTimeStart(?,?)`,[time,legID]) ;
        return 1;
        }
        catch(err){
            console.log(`UpdateGpsGroupDateTimeStart()==>Error occurs when access database.`);
            console.log(`Error Info: ${err}`);
            return 0; // Error occurs 
        }

    },

    /*=========================================================
    name: UpdateGpsGroupDateTimeEnd
    description: update GpsGroup table
    =========================================================== */
    async UpdateGpsGroupDateTimeEnd(time,legID){
        try{
        //let previousPosition = await db.query(`SELECT Latitude, Longitude FROM position WHERE GPSID=${gpsID} AND LegID=${currentLegID} ORDER BY DateTime DESC LIMIT 1`) ;
            //await db.query(`UPDATE gpsgroup SET DateTimeEnd =? WHERE LegID=?`,[time,legID]) ;
            await db.query(`CALL UpdateGpsGroupDateTimeEnd(?,?)`,[time,legID]) ;
            return 1;
        }catch(err){
            console.log(`UpdateGpsGroupDateTimeEnd()==>Error occurs when access database.`);
            console.log(`Error Info: ${err}`);
            return 0; // Error occurs 
        }

    },
    /*=========================================================
    name: UpdateStageZero
    description:  Combine three database access operations together
    =========================================================== */
    async UpdateStageZero(positionTime,legID,legStatusTypeID,positionID,startLocationID){
        try{
        //let previousPosition = await db.query(`SELECT Latitude, Longitude FROM position WHERE GPSID=${gpsID} AND LegID=${currentLegID} ORDER BY DateTime DESC LIMIT 1`) ;
            //await db.query(`UPDATE gpsgroup SET DateTimeEnd =? WHERE LegID=?`,[time,legID]) ;
            //esults = await db.query(`CALL GetGpsIdList();CALL GetLocations()`); 
            await db.query(`CALL UpdateActualArrivalTime(?,?);CALL InsertLegStatus(?,?,?);CALL UpdateGpsGroupDateTimeStart(?,?)`,
            [positionTime,legID,legStatusTypeID,positionID,startLocationID,positionTime,legID]) ;
            return 1;
        }catch(err){
            console.log(`UpdateStageZero()==>Error occurs when access database.`);
            console.log(`Error Info: ${err}`);
            return 0; // Error occurs 
        }

    },

 /*=========================================================
    name: UpdateStageOne
    description:  dCombine two database access operations together
    =========================================================== */
    async UpdateStageOne(positionTime,legID,legStatusTypeID,positionID,startLocationID){
        try{
        //let previousPosition = await db.query(`SELECT Latitude, Longitude FROM position WHERE GPSID=${gpsID} AND LegID=${currentLegID} ORDER BY DateTime DESC LIMIT 1`) ;
            //await db.query(`UPDATE gpsgroup SET DateTimeEnd =? WHERE LegID=?`,[time,legID]) ;
            //esults = await db.query(`CALL GetGpsIdList();CALL GetLocations()`); 
            await db.query(`CALL UpdateActualDepartureTime(?,?);CALL InsertLegStatus(?,?,?)`,
            [positionTime,legID,legStatusTypeID,positionID,startLocationID]) ;
            return 1;
        }catch(err){
            console.log(`UpdateStageZero()==>Error occurs when access database.`);
            console.log(`Error Info: ${err}`);
            return 0; // Error occurs 
        }

    },

    /*=========================================================
    name: UpdateStageTwo
    description: Combine four database access operations together
    =========================================================== */
    async UpdateStageTwo(positionTime,legID,nextLegID,legStatusTypeID,positionID,nextStartLocationID){
        try{
        //let previousPosition = await db.query(`SELECT Latitude, Longitude FROM position WHERE GPSID=${gpsID} AND LegID=${currentLegID} ORDER BY DateTime DESC LIMIT 1`) ;
            //await db.query(`UPDATE gpsgroup SET DateTimeEnd =? WHERE LegID=?`,[time,legID]) ;
            //esults = await db.query(`CALL GetGpsIdList();CALL GetLocations()`); 
            await db.query(`CALL UpdateActualArrivalTime(?,?);CALL InsertLegStatus(?,?,?);CALL UpdateGpsGroupDateTimeEnd(?,?);CALL UpdateGpsGroupDateTimeStart(?,?)`,
            [positionTime,nextLegID,legStatusTypeID,positionID,nextStartLocationID,positionTime,legID,positionTime,nextLegID]) ;
            return 1;
        }catch(err){
            console.log(`UpdateStageZero()==>Error occurs when access database.`);
            console.log(`Error Info: ${err}`);
            return 0; // Error occurs 
        }

    },

    /*================================================
    name:GetLastPositionTimePointByGpsId
    description:  Get datatime of the last Position
    return value: 
    ================================================== */  
    async GetLastPositionTimePointByGpsId(gpsID){
        //get last leg
        let timePoint = undefined;
        try{
            //await db.query(`INSERT route(TotalCost,PlantID) VALUES(0,1)`);
            timePoint = await db.query(`SELECT DateTime FROM Position WHERE GPSID = ? order by ID desc limit 1`,[gpsID]);
           // gpsID = await db.query(`SELECT GPSID FROM GPSGroup WHERE LegID = (SELECT ID FROM Leg WHERE RouteID = ? ORDER BY ID DESC LIMIT 1);`,[routeID]);

        }catch(err){
            console.log(`GetGpsIdByRouteId==> Error occurs when access Database!`);  // Write to Log file
            console.log(`Error info: ${err}`);                                      // Write to Log file
            return 0; // Error occurs when access Database.
        }   
        return timePoint;   // if use store procedure

    },
    
    /*================================================
    name:GetLastPositionByRouteId
    description:  get all plantID
    return value:  
    ================================================== */  
    async GetLastPositionByRouteId(routeID){
        //get last leg
        let position = undefined;
        try{
            //await db.query(`INSERT route(TotalCost,PlantID) VALUES(0,1)`);
            position = await db.query(`SELECT * FROM Position WHERE LegID IN (SELECT ID FROM Leg WHERE RouteID=?) ORDER BY DateTime DESC LIMIT 1`,[routeID]);
           // gpsID = await db.query(`SELECT GPSID FROM GPSGroup WHERE LegID = (SELECT ID FROM Leg WHERE RouteID = ? ORDER BY ID DESC LIMIT 1);`,[routeID]);

        }catch(err){
            console.log(`GetLastPositionByGpsId==> Error occurs when access Database!`);  // Write to Log file
            console.log(`Error info: ${err}`);                                      // Write to Log file
            return 0; // Error occurs when access Database.
        }   
        return position;   // if use store procedure

    },


    /*================================================
    name:InsertDistanceMatrix
    description:  
    return value:
    data type : number
           1 :  OK
           0 : error occurs when access database  
    ================================================== */  
    async InsertDistanceMatrix(legID,positionID,locationID,forecastDistance,forecastDuration,positionTime){
        
        let result = 1;  // good
        try{
            //await db.query(`INSERT route(TotalCost,PlantID) VALUES(0,1)`);
            await db.query(`INSERT DistanceMatrix SET ?`,{LegID:legID,FromPositionID:positionID,ToLocationID:locationID,Distance:forecastDistance,ETA:forecastDuration,Time:positionTime});
           // gpsID = await db.query(`SELECT GPSID FROM GPSGroup WHERE LegID = (SELECT ID FROM Leg WHERE RouteID = ? ORDER BY ID DESC LIMIT 1);`,[routeID]);

        }catch(err){
            console.log(`InsertDistanceMatrix==> Error occurs when access Database!`);  // Write to Log file
            console.log(`Error info: ${err}`);                                      // Write to Log file
            return 0; // Error occurs when access Database.
        }   
        return result;   // if use store procedure

    },
};