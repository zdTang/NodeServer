"use strict";
/*
* FILENAME      : spot.ts
* CREATED BY    : Zhendong Tang
* MODIFIED BY	: N/A
* CREATION DATE : March 13, 2020
* DESCRIPTION   :
*   This class is for each position feeded by GPS device.
*/
let Raw = require('../dataElements/rawSpot.js');
module.exports = class cookedSpotClass {
    constructor() {
        // Source Information
        this.RawSpot = {}; // all information from GPS will keep
        // Calculated Information
        this.LegID = '';
        this.Status = '';
        // StartLocation: string=''; // can get from LegID
        // ToLocation: string=''; // can get from LegID
        this.isLocal = true;
    }
};
//# sourceMappingURL=cookedSpot.js.map