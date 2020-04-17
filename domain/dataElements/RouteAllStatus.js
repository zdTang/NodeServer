"use strict";
/*
* FILENAME      : RouteAllStatus.ts
* CREATED BY    : Zhendong Tang
* MODIFIED BY	: N/A
* CREATION DATE : March 13, 2020
* DESCRIPTION   :
*   This class is only a data format as a container to hold All information
*   for the front end.
*/
let PIA_leg = require("../dataElements/legPIA.js");
let LegStatus = require("../dataElements/legStatus.js");
module.exports = class routePiaClass {
    constructor() {
        this.RouteID = "";
        this.GPSid = '';
        this.LegsFromPIA = []; // PIA Schedule
        this.LegsFromTruck = []; // Real Leg data => updated by Position Object
        this.legStatus = []; //  leg status => updated by Position Object
    }
};
//# sourceMappingURL=RouteAllStatus.js.map