"use strict";
let Schedule = require("../../dist/domain/schedule.js");
module.exports = class DispatcherClass {
    constructor() {
        //here to initialize 
        //consider how to do it
        this.ScheduleLists = [];
    }
    // push a new schedule into stack
    AddNewSchedule(schedule) {
        const scheduleToday = JSON.parse(schedule);
        this.ScheduleLists.push(new Schedule(scheduleToday));
    }
    ;
    // Deal with GPS information
    TakePosition() { }
    ; //Receive Position and dispatch it to relevant route and leg
    GetOpenSchedule() { }
    ;
    GetScheduleStatus(schedule) {
    }
    ; // 
    GetGeneralStatus() { }
    ; // get all status
    ReviewSchedules() { }
    ; // delete closed schedule
};
//# sourceMappingURL=dispatcher.js.map