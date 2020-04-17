"use strict";
/*
* FILENAME      : legPIA.ts
* CREATED BY    : Zhendong Tang
* MODIFIED BY	: N/A
* CREATION DATE : March 13, 2020
* DESCRIPTION   :
*   This class is for each position feeded by GPS device.
*/
let Leg_PIA = require("../dataElements/legPIA.js");
module.exports = class routePiaClass {
    constructor() {
        this.RouteID = "";
        this.GPSid = '';
        this.Legs = [];
    }
};
//# sourceMappingURL=routePIA.js.map