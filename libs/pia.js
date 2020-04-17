/*====================================================================
Discription: encrypo a string with MD5
FileName: pia.js
Project: Karmax
Programmer: Zhendong Tang (Mike)
Date      : Jan 30, 2020
=====================================================================*/
const Path = require('path');
const DAL=require(Path.resolve(__dirname,'./DAL'));
const Validator=require(Path.resolve(__dirname,'./validator'));


module.exports={
    async Process(route){
       
        if (Validator.ValidateRoute(route)==1){

            let insertRouteResult = await DAL.InsertRouteID(route.plantID,route.routeID);
                
            if(insertRouteResult==1){

                console.log(`Insert Route: ${route.routeID} successfully!`);
                               //ready to Insert PIA to Leg Table and receive legIDs
                let insertLegResult = await DAL.InsertLegs(route);
                if(isNaN(insertLegResult)){ // not a number, means insert legs successfully
                    // Insert GpsGroup Table 
                    let insertGpsGroupResult = await DAL.InsertGpsGroup(insertLegResult,route.gpsID);               
                    if(insertGpsGroupResult==1){  // insert legGroup successfully
                        // Finally, 
                        console.log(`Insert Route DONE!!!`)
                    }else{
                        console.log(`Error occurs when insert gpsGroup table, please check log file.`) ;              
                    };

                }else{       
                    console.log(`Error occurs when insert leg table, please check log file.`);               
                };

            }else{
                console.log(`Error occurs when insert Route table, please check log file.`);   
            };   
     
    }else{
         console.log(`Illegal data type of value, please check log file.`);
    };

}

}