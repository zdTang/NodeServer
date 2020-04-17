"use strict";
/*
* FILENAME      : rawSpot.ts
* CREATED BY    : Zhendong Tang
* MODIFIED BY	: N/A
* CREATION DATE : March 13, 2020
* DESCRIPTION   :
*   This class is for each position feeded by GPS device.
*/
module.exports = class rawSpotClass {
    constructor() {
        this.GPSid = '';
        this.Data = '';
        this.Time = '';
        this.Latitude = 0;
        this.Longitude = 0;
        this.Speed = 0;
        // RouteID: string ='';
        // LegID: string = '';
        // isLocal: boolean = true;
        // RelevantLocations: string[] = [];
        // Status:string='';    
    }
};
//# sourceMappingURL=rawSpot.js.map