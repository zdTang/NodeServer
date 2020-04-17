/*
* FILENAME      : legStatus.ts
* CREATED BY    : Zhendong Tang
* MODIFIED BY	: N/A
* CREATION DATE : March 13, 2020
* DESCRIPTION   :
*   This class stores status for each leg
*/
'use strict';
module.exports = class LegStatus {
    constructor() {
        // set default value as -1 means no status at all
        this.LoadDuration = -1; // 0: late, 1:within tolerance, 2: on time
        this.OnTimeDeparture = -1; // 0: late, 1:within tolerance, 2: on time
        this.ThisLegWholeStatus = 0; // 0: in-process, 1: complete,open, 2: open
        this.RouteStatus = 0; // 0: load, 1: wait at border, 2: in transit, 3:arrival, 4 wait in traffic, 5: departure
        this.InTransitDuration = -1; // 0: late, 1:within tolerance, 2: on time
        this.OnTimeArrival = -1; // 0: late, 1:within tolerance, 2: on time
        this.OnTimeArrivalForecast = -1; // 0: late, 1:within tolerance, 2: on time
        this.RealQuantity = 0; // the actual Quantity picked
        //Getter
        //  Here to determine status based on analyzing CookedSpot list
        // GetLegStatus():any{
        //     return {}
        // };
    }
};
//# sourceMappingURL=legStatus.js.map