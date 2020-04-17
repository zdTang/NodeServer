"use strict";
/*=========================================
* FILENAME      : processor.ts
* CREATED BY    : Zhendong Tang
* MODIFIED BY	: N/A
* CREATION DATE : March 13, 2020
* DESCRIPTION   :
*   This class is the engine to processing incoming data
===================================================*/
const Spot = require('./dataElements/rawSpot.js');
const Position = require("./position.js");
module.exports = class ProcessorClass {
    /*=========================================================================
    MethodName: Constructor
    Description: Instantiate a Processor Object
    Arguments: config Table :  a method will read it from DB
    Return Value: none
    ===========================================================================*/
    constructor(configTable, locationTable) {
        this.PredefinedLocation = locationTable; // MySQL location Table
        this.ConfigTable = configTable; // MySQL config Table
        this.DateBase = require('../libs/database.js'); // used for DB
        this.axios = require('axios');
    }
    /*=========================================================================
    MethodName: AddNewPIA( the door for PIA data)
    Description: Receive a schedule from PIA
    Arguments: object
    Return Value: none
    ===========================================================================*/
    AddNewPIA(schedule) {
        this.TodaySchedulePIA = schedule; // schedule from PIA
        //const scheduleToday=JSON.parse(schedule); 
        let num = this.TodaySchedulePIA.Routes.length;
        for (let i = 0; i < num; i++) {
            // Write to Database, Return RouteID
            this.InsertNewRoutes(schedule); //@@ Real code 
            console.log(`insert route: ${i + 1}`);
        }
    }
    ;
    /*=========================================================================
    MethodName: AddPosition( the door for GPS data)
    Description: Receive a GPS position and dispatch it to relevant Route
    Arguments: string
    Return Value: none
    ===========================================================================*/
    AddPosition(RawSpotList) {
        for (let i = 0; i < RawSpotList.length; i++) {
            // calculate relevant location first// only cache the location list
            this.PushToLocationList(RawSpotList[i]);
            // how to determine a RouteID by GPSid
            let currentRouteID = this.GetRouteIDFromSpot(RawSpotList[i].GPSid); // Get Route from coming GPSid
            //
            let currentLeg = this.GetCurrentLegByRouteID(currentRouteID); // current leg object get from DB
            let position = new Position(RawSpotList[i], currentRouteID, currentLeg); // position will write to currentRoute
            //====For debug=========
            console.log(position.CurrentRouteID); //for debug
            console.log(position.CurrentLeg); //for debug
            console.log(position.Spot); //for debug
            //====For debug=========
            position.UpdateLegStatus(); // update status
        }
    }
    ;
    /*=========================================================================
    MethodName: GetRoutesDetailStatusByGPSid
    Description: Collect and return status of all Routes based on  Route[]
    Arguments: string
    Return Value: none
    ===========================================================================*/
    GetRouteStatusByGPSid(GPSid) {
        //1, determine RouteID by GPSid
        // 
        //2, Read Whole Route info from DB
        //
        //3, do comparison and put into a JSON
        let routeData = this.GetRouteData(GPSid);
        let currentLegStatus = this.GetLegStatusByGPSid(GPSid);
        let status = {};
        //
    }
    ;
    /*=========================================================================
    MethodName: PushToLocationList()
    Description: return data to front end for display relevant locations
    Arguments: string
    Return Value: none
    ===========================================================================*/
    PushToLocationList(Spot) {
    }
    ;
    /*=========================================================================
    MethodName: GetDisplayLocationPool()
    Description: return data to front end for display relevant locations
    Arguments: string
    Return Value: none
    ===========================================================================*/
    GetDisplayLocationList() {
        // return [displayLocations] to Frontend
    }
    ;
    /*=========================================================================
    MethodName: InsertNewRoutes
    Description: Receive a schedule from PIA
    Arguments: object
    Return Value: none
    ===========================================================================*/
    InsertNewRoutes(schedule) {
        //TODO
        console.log(`Insert the follow Route to DB:===`);
        console.log(schedule);
    }
    ;
    /*=========================================================================
     MethodName: GetCurrentLegByRouteID
     Description: used for Position object's constructor
     Arguments: RouteID
     Return Value: current leg Object from leg table
     ===========================================================================*/
    GetCurrentLegByRouteID(routeID) {
        //TODO
        return { legobject: 'this is legdata' };
    }
    ;
    /*=========================================================================
    MethodName: GetRoutesDetailStatusByGPSid
    Description: Collect and return status of all Routes based on  Route[]
    Arguments: string
    Return Value: none
    ===========================================================================*/
    GetRouteData(GPSid) {
        //1, determine RouteID by GPSid
        // a Method here
        //2, Read Whole Route info from DB
        //
    }
    ;
    /*=========================================================================
    MethodName: GetRouteFromSpot
    Description: determine the RouteID according the coming position
                 used to determine current Route and the Route will pass to
                 a relevant position
    Arguments: string
    Return Value: none
    ===========================================================================*/
    GetRouteIDFromSpot(comingGPSid) {
        return 88; // no match routeID found
    }
    /*=========================================================================
    MethodName: GetRoutesDetailStatusByGPSid
    Description: Get the last status of this GPSid
    Arguments: string
    Return Value: none
    ===========================================================================*/
    GetLegStatusByGPSid(GPSid) {
        //1, determine RouteID by GPSid
        // a Method here
        //2, Read Whole Route info from DB
        //
    }
    ;
    /*====================================================
    MethodName: GetForecastArrivalTime
    Description: used to get the forecast duration between two points
    Arguments: None
    Return Value: Duration between two points
   =======================================================*/
    GetForecastArrivalTime(origins, destination) {
        let queryString = `https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=${origins.latitude},${origins.logitude}&destinations=${destination.latitude},${destination.logitude}&travelMode=${this.ConfigTable.travelMode}&key=${this.ConfigTable.BingMapApiKey}`;
        let duration = 0;
        this.axios.get(queryString)
            .then((response) => {
            //console.log(response.data.resourceSets[0].resources[0]);  
            duration = response.data.resourceSets[0].resources[0].results[0].travelDuration;
            //console.log('good');//used for test
        }).catch((error) => {
            duration = -1; //  error happens
        });
        return duration;
    }
    ;
};
//# sourceMappingURL=processor.js.map