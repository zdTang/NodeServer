"use strict";
/*
* FILENAME      : leg.ts
* CREATED BY    : Zhendong Tang
* MODIFIED BY	: N/A
* CREATION DATE : March 18, 2020
* DESCRIPTION   :
*   This class is for each Leg and will be updated  by each Position.
*/
//let  Status = require("./dataElements/legStatus.js");
let LegPIA = require('./dataElements/legPIA.js');
module.exports = class LegClass {
    //private Status: typeof Status;
    /*=========================================================================
    MethodName: Constructor
    Description: this status will be updated by Position Object
    Arguments: string
    Return Value: none
    ===========================================================================*/
    constructor(leg) {
        // this.StartLocation = leg.locationName;
        // this.ToLocation = leg.DeliverLocation;
        this.LegFromPIA = leg;
        this.LegFromTruck = this.InitiateLegFromTruck();
        //this.Status=new Status();
    }
    /*=========================================================================
    MethodName: InitiateLegFromTruck
    Description: Insert
    Arguments: string
    Return Value: none
    ===========================================================================*/
    InitiateLegFromTruck() {
        let legFromTruck = new LegPIA();
        legFromTruck.legID = this.LegFromPIA.legID; // From PIA
        legFromTruck.locationName = this.LegFromPIA.locationName; // From PIA
        legFromTruck.DeliverLocation = this.LegFromPIA.DeliverLocation; // From PIA
        // Other Data of this object will come from Real truck GPS info.
        return legFromTruck;
    }
    ;
    // Getter
    /*=========================================================================
    MethodName: GetLegTotalStatus
    Description: uses by Route object to collect status
    Arguments: string
    Return Value: none
    ===========================================================================*/
    // GetLegTotalStatus():typeof Status{
    //     return this.Status;    // // the real time status of this truck
    // };
    /*=========================================================================
    MethodName: GetRealLegData
    Description: uses by Route object to collect status
    Arguments: string
    Return Value: none
    ===========================================================================*/
    // GetRealLegData():typeof LegPIA{
    //     return this.LegFromTruck;   // the real time data of this truck
    // };
    /*=========================================================================
    MethodName: GetLegID
    Description: Get LegID from PIA information
    Arguments: none
    Return Value: none
    ===========================================================================*/
    GetLegID() {
        return this.LegFromPIA.legID;
    }
};
//# sourceMappingURL=leg.js.map