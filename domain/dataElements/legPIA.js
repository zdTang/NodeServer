"use strict";
/*
* FILENAME      : legPIA.ts
* CREATED BY    : Zhendong Tang
* MODIFIED BY	: N/A
* CREATION DATE : March 13, 2020
* DESCRIPTION   :
*   This class is for each position feeded by GPS device.
*/
module.exports = class legPiaClass {
    constructor() {
        this.legID = 0;
        this.locationName = "";
        this.ArriveStart = '';
        this.Depart = '';
        this.LoadTime = '';
        this.TransitTime = '';
        this.DeliverLocation = '';
        this.ArriveEnd = '';
        //Quantity:number=0;
        this.Cost = 0;
    }
};
//# sourceMappingURL=legPIA.js.map