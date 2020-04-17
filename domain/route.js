"use strict";
let Leg = require("./leg.js");
let RoutePIA = require("./dataElements/routePIA.js");
let CookedSpot = require('./dataElements/cookedSpot.js');
let SingleLegStatus = require('./dataElements/legStatus.js');
let RouteAllStatus = require("./dataElements/RouteAllStatus.js");
let TruckLeg = require("./dataElements/legPIA.js");
module.exports = class RouteClass {
    /*=========================================================================
    MethodName: constructor
    Description:
    Arguments: none
    Return Value: none
    ===========================================================================*/
    constructor(routePIA) {
        // data will came from constructor
        this.Legs = []; // the leg list
        // data will be updated by Position object
        this.Track = []; // the track of this route
        this.RoutePIA = routePIA; // whole planned Route
        this.InitRoutes();
    }
    /*=========================================================================
    MethodName: InitRoutes
    Description:
    Arguments: none
    Return Value: none
    ===========================================================================*/
    InitRoutes() {
        let num = this.RoutePIA.Legs.length;
        for (let i = 0; i < num; i++) {
            this.Legs.push(new Leg(this.RoutePIA.Legs[i]));
        }
    }
    ;
    // private InitLegs():void{
    //     let num: number= this.RoutePIA.Legs.length;
    //     for(let i=0;i<num;i++)
    //     {
    //         this.Legs.push(new Leg(this.RoutePIA.Legs[i]))
    //     }
    // };
    /*=========================================================================
    MethodName: AllLegStatus
    Description: Collect and return status of all Legs based on  Legs[]
    Arguments: string
    Return Value: none
    ===========================================================================*/
    GetAllLegStatus() {
        let allLegStatus = [];
        let num = this.Legs.length;
        for (let i = 0; i < num; i++) {
            allLegStatus.push(this.Legs[i].GetLegTotalStatus());
        }
        return allLegStatus;
    }
    /*=========================================================================
    MethodName: GetAllLegDataFromTruck()
    Description: Collect and return real Leg Data from Truck based on  Legs[]
    Arguments: string
    Return Value: none
    ===========================================================================*/
    GetAllLegDataFromTruck() {
        let allLegRealData = [];
        let num = this.Legs.length;
        for (let i = 0; i < num; i++) {
            allLegRealData.push(this.Legs[i].GetRealLegData());
        }
        return allLegRealData;
    }
    /*=========================================================================
    MethodName: GetRouteStatus
    Description: Collect and return status of all Routes based on  Legs[]
               : RouteID, GPSid,[LegStatus],[legPIA]
    Arguments: string
    Return Value: none
    ===========================================================================*/
    GetRouteStatus() {
        // let status= new RouteAllStatus();
        // status.RouteID = this.RoutePIA.RouteID;
        // status.GPSid = this.RoutePIA.GPSid;
        // // status.legStatus = this.GetAllLegStatus();
        // // status.legsFromPIA = this.RoutePIA.Legs; // PIA legs' Schedule data
        // // status.legsFromTruck = this.GetAllLegDataFromTruck(); // Truck legs' Real  data
        // status.legStatus = [1,2,3];
        // status.legsFromPIA = [3,4,5]; // PIA legs' Schedule data
        // status.legsFromTruck = [6,6,7]; // Truck legs' Real  data
        // //collect 
        // return status;
        let totalStatus = {
            RouteID: this.RoutePIA.RouteID,
            GPSid: this.RoutePIA.GPSid,
            legsFromPIA: this.RoutePIA.Legs,
            legsFromTruck: this.GetAllLegDataFromTruck(),
            legStatus: this.GetAllLegStatus(),
        };
        return totalStatus;
    }
    ;
    //==========Previous solution: only Return Legs Info.
    // GetRouteStatus():object[]{
    //     let thisRouteStatus = [];
    //     let num = this.Legs.length;
    //     for (let i = 0; i < num; i++) {
    //         thisRouteStatus.push(this.Legs[i].GetLegTotalStatus());
    //     }
    //     return thisRouteStatus;
    // }; 
    /*=========================================================================
    MethodName: UpdateTrack
    Description: used by Position Object to add new cookedSpot
    Arguments: cookedSpot
    Return Value: none
    ===========================================================================*/
    UpdateTrack(cookedSpot) {
        this.Track.push(cookedSpot);
    }
    ;
};
//# sourceMappingURL=route.js.map