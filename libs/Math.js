/*====================================================================
FileName: Math.js
Description: This file contains all methods about Math 
Project: Karmax
Programmer: Zhendong Tang (Mike)
Date      : April, 2020
=====================================================================*/

const Config = require(`../config`);
const axios = require('axios');


module.exports={

   /*================================================
    Name         :   MinuteDiff
    description  :   Return a status based by comparison
    return value :   0, OK; 1, Within tolerant; 2, Late
    ================================================== */ 
    MinuteDiff(expect, actual, tolerant){
        let status=0;// ok
        let thisActual=Date.fromMysqlDate(`${actual}`);
        let thisExpect=Date.fromMysqlDate(`${expect}`);
        let minutesDiff=(thisActual.getTime()-thisExpect.getTime())/(60*1000);
        if(minutesDiff>0&&minutesDiff<tolerant){
            status=1;// within tolerant
        }
        else if(minutesDiff>tolerant){
            status=2;// late
        }
        return status;
    
    },
   /*========================================================================
    Name         :   GetDistance
    description  :   Calculate distance between two GPS points
    Credit       :   https://blog.csdn.net/qq_28562411/article/details/76439162
    return value :   Distance between two GPS coordinates
    =========================================================================*/ 
 
    GetDistance(lat1, lng1, lat2, lng2) {// coordinates of two GPS positions
        var radLat1 = this.Rad(lat1);
        var radLat2 = this.Rad(lat2);
        var a = radLat1 - radLat2;
        var b = this.Rad(lng1) - this.Rad(lng2);
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
            s = s * 6378.137;// EARTH_RADIUS;
            s = Math.round(s * 10000) / 10000; //output unit is kilo
            s = s.toFixed(2);//2 digitals after dot
        return s;
    },

    Rad(d) {
        return d * Math.PI / 180.0;//Convert latitude and longitude to trigonometric function
    },
    
   /*========================================================================
    Name         :   IsWithinGeofence
    Description  :   Check if a Position is within certain geofence.
    Credit       :   https://blog.csdn.net/qq_28562411/article/details/76439162
    return value :   Distance between two GPS coordinates
    =========================================================================*/ 

        IsWithinGeofence(position, location) {//coordinates of two GPS positions
        let radLat1 = this.Rad(position.Latitude);
        let radLat2 = this.Rad(location.Latitude);
        let a = radLat1 - radLat2;
        let b = this.Rad(position.Longitude) - this.Rad(location.Longitude);
        let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
            s = s * 6378.137;// EARTH_RADIUS;
            s = Math.round(s * 10000) / 10000; //the unit of output is Kilometer 
        console.log(`DistanceToTarget is ${s}`);
            s = s.toFixed(2);//Keep two digit after point
        if(s<location.Radius){
            return true;
        };
        return false;
    },
   /*========================================================================
    Name         :   IsWithinInterestLocation
    Description  :   Calculate interest locations
    Credit       :   https://blog.csdn.net/qq_28562411/article/details/76439162
    return value :   Distance between two GPS coordinates
    =========================================================================*/ 

    IsWithinInterestLocation(position, location) {//two locations
           let radLat1 = this.Rad(position.Latitude);
           let radLat2 = this.Rad(location.Latitude);
           let a = radLat1 - radLat2;
           let b = this.Rad(position.Longitude) - this.Rad(location.Longitude);
           let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
               Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
               s = s * 6378.137;// EARTH_RADIUS;
               s = Math.round(s * 10000) / 10000; //the unit of output is Kilometer 
           console.log(`DistanceToTarget is ${s}`);
               s = s.toFixed(2);//Keep two digit after point
           if(s<Config.InterestDistance){ // if the distance between location and truck is near enough
               return true;
           };
           return false;
       },
    /*=========================================================
    name: Get speed
    description: Get the previous position for this GPSid
    =========================================================== */
    GetSpeed(position,previousPosition){

            let distance = this.GetDistance(position.Latitude,position.Longitude,previousPosition.Latitude,previousPosition.Longitude);
            console.log(`distanceFromPreviousPoint=====${distance}`);
            let now=Date.fromMysqlDate(`${position.DateTime}`);
            console.log(`Time Now is: ${now}`);
            //let start=Date.fromMysqlDate('2018-03-22 10:22:00');
            let previous=Date.fromMysqlDate(`${previousPosition.DateTime}`);
            console.log(`Time Previous is: ${previous}`);
            let diff=now.getTime()-previous.getTime();
            let hourDiff=diff/(60*60*1000);
            if(hourDiff===0){
                return -1;
            }
            console.log(`hourDiff=====${hourDiff}`);
            let speed=distance/hourDiff;
            
            return speed;
        },
    /*====================================================
    MethodName: GetForecastArrivalTime
    Description: used to get the forecast duration between two points
    Arguments: None
    Return Value: Duration between two points
    Test case:
    let a={latitude:43.48956, longitude:-80.5196};
    let b={latitude:43.51166, longitude:-80.54905};
    let duration = await  Math.GetForecastArrivalTime(a, b) ;
    console.log(duration);
    The result is about:8.067    
   =======================================================*/
    async GetForecastArrivalTime(origins, destination) {
        let queryString = `https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=${origins.latitude},${origins.longitude}&destinations=${destination.latitude},${destination.longitude}&travelMode=${Config.travelMode}&key=${Config.BingMapAPI}`;
        let duration = 0;
        await axios.get(queryString)
            .then((response) => {
            //console.log(response.data.resourceSets[0].resources[0]);  
            duration = response.data.resourceSets[0].resources[0].results[0].travelDuration;
            //console.log('good');//used for test
        }).catch((error) => {
            duration = -1; //  error happens
        });
        return duration;
    },
    /*====================================================
    MethodName: GetDistanceFromBing
    Description: used to get Distance between two points
    Return Value: Distance between two points
    Test case:
    let a={latitude:43.48956, longitude:-80.5196};
    let b={latitude:43.51166, longitude:-80.54905};
    let duration = await  Math.GetForecastArrivalTime(a, b) ;
    console.log(duration);
    The result is about:8.067    
   =======================================================*/
   async GetDistanceDurationFromBing(origins, destination) {
    //let queryString = `https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=${origins.latitude},${origins.longitude}&destinations=${destination.latitude},${destination.longitude}&travelMode=${Config.travelMode}&key=${Config.BingMapAPI}`;
    let queryString = `https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=${origins.Latitude},${origins.Longitude}&destinations=${destination.Latitude},${destination.Longitude}&travelMode=${Config.travelMode}&key=${Config.BingMapAPI}`;
    let result = undefined;
    await axios.get(queryString)
        .then((response) => {
        //console.log(response.data.resourceSets[0].resources[0]);  
        //duration = response.data.resourceSets[0].resources[0].results[0].travelDuration;
        result = response.data.resourceSets[0].resources[0].results[0];
         //console.log(duration);
        //console.log('good');//used for test
    }).catch((error) => {
        result = -1; //  error happens
    });
    return result;
},
    /*====================================================
    MethodName: GetAngle
    Description: Get angle from start point to end point.  East is 0 degree level, counterclockwise
    Arguments: None
    Credit: https://blog.csdn.net/findmebug/article/details/78611385?depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-4&utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-4
    Return Value: degree  
   =======================================================*/
   GetAngle(First, Next) {
    let  dRotateAngle = Math.atan2(Math.abs(First.Latitude - Next.Latitude), Math.abs(First.Longitude - Next.Longitude));
    if (Next.Latitude >= First.Latitude) {
        if (Next.Longitude >= First.Longitude) {
        } else {
            dRotateAngle = Math.PI - dRotateAngle;
        }
    } else {
        if (Next.Longitude >= First.Longitude) {
            dRotateAngle = 2 * Math.PI - dRotateAngle;
        } else {
            dRotateAngle = Math.PI + dRotateAngle;
        }
    }
    dRotateAngle = dRotateAngle * 180 / Math.PI;
    return dRotateAngle;

},

    /*====================================================
    MethodName: MinutesToTimeFormat
    Description: convert minutes into Mysql Time format
    Arguments: minutes
    Return Value: mySql Time
   =======================================================*/
   MinutesToTimeFormat(inputTime) {
  
        // let hours = (time/ 60);
        // let rhours = Math.floor(hours);
        // let minutes = (hours - rhours) * 60;
        // let rminutes = Math.round(minutes);
        let time = Number(inputTime);
        let hours = Math.floor(time/60);
        //let rhours = Math.floor(hours);
        let minutes = Math.round(time - (hours * 60));
        let outHour = undefined;
        if (hours<10){
            outHour = '0'+hours.toString();
        }
        else{
            outHour = hours.toString();
        }
        let outMinute = undefined;
        if (minutes<10){
            outMinute = '0'+ minutes.toString();
        }
        else{
            outMinute = minutes.toString();
        }
        //let rminutes = Math.round(minutes);
        
        return outHour + ':'+ outMinute + ':' + '00';
        

    }


    

    
}      

