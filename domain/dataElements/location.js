"use strict";
/*
* FILENAME      : location.ts
* CREATED BY    : Zhendong Tang
* MODIFIED BY	: N/A
* CREATION DATE : March 13, 2020
* DESCRIPTION   :
*   This class is for each position feeded by GPS device.
*/
module.exports = class locationClass {
    constructor() {
        this.Latitude = 0;
        this.Longitude = 0;
        this.Name = '';
        this.Address = '';
        this.LocationType = '';
        this.Radius = '';
    }
};
//# sourceMappingURL=location.js.map