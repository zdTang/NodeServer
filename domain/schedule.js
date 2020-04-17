"use strict";
/*==================================================
* FILENAME      : schedule.ts
* CREATED BY    : Zhendong Tang
* MODIFIED BY	: N/A
* CREATION DATE : March 13, 2020
* DESCRIPTION   :
*   Schedule object is the container of daily routes.
*   One schedulePIA will initiate one Schedule object
=========================================================*/
let RouteType = require("./route.js");
let SchedulePIA = require("./dataElements/schedulePIA.js");
module.exports = class ScheduleClass {
    /*=========================================================================
    MethodName: Constructor
    Description: Constructor
    Arguments: schedule : the schedule received from PIA system every morning
    Return Value: none
    ===========================================================================*/
    constructor(schedule) {
        this.Routes = []; //hold all generated Routes
        this.TodaySchedulePIA = schedule; // schedule from PIA
        this.InitRoutes(); // initiate Route objects and push to Routes[]
    }
    /*=========================================================================
    MethodName: InitRoutes
    Description: Dispatch schedule to different Route
                 Routes[] will hold all generated Routes
    Arguments: none
    Return Value: none
    ===========================================================================*/
    InitRoutes() {
        //console.log(this.TodaySchedulePIA);
        let num = this.TodaySchedulePIA.Routes.length;
        for (let i = 0; i < num; i++) {
            //Attention: RouteType===Route( name conflict)
            this.Routes.push(new RouteType(this.TodaySchedulePIA.Routes[i]));
        }
    }
    /*=========================================================================
    MethodName: GetAllRoutesDetailStatus
    Description: Collect and return status of all Routes based on  Route[]
    Arguments: string
    Return Value: none
    ===========================================================================*/
    GetAllRoutesDetailStatus() {
        let ScheduleStatus = [];
        let num = this.Routes.length;
        for (let i = 0; i < num; i++) {
            ScheduleStatus.push(this.Routes[i].GetRouteStatus());
        }
        return ScheduleStatus;
    }
    ;
    /*=========================================================================
    MethodName: GetScheduleWholeStatus
    Description: Collect and return status of this Schedule
    Arguments: none
    Return Value: none
    ===========================================================================*/
    GetScheduleWholeStatus() {
        let ScheduleWholeStatus = {
            dispatcher: this.TodaySchedulePIA.Dispatcher,
            date: this.TodaySchedulePIA.Date,
            RoutesStatus: this.GetAllRoutesDetailStatus()
        };
        return ScheduleWholeStatus;
    }
    ;
    /*=========================================================================
    MethodName: GetScheduleStatus
    Description: Collect and return status of this Schedule: open/close
                 When all Routes are close, this schedule will close too.
    Arguments: string
    Return Value: none
    ===========================================================================*/
    GetScheduleStatus() {
        //To do
        return 0; // open : 0 /close: 1
    }
    ;
    /*=========================================================================
    MethodName: GetScheduleDispatcher
    Description: Return current schedule's dispatcher
    Arguments: string
    Return Value: none
    ===========================================================================*/
    GetScheduleDispatcher() {
        //To do
        return this.TodaySchedulePIA.Dispatcher;
    }
    ;
    /*=========================================================================
    MethodName: GetScheduleDate
    Description: Return current schedule's date
    Arguments: string
    Return Value: none
    ===========================================================================*/
    GetScheduleDate() {
        //To do
        return this.TodaySchedulePIA.Date;
    }
    ;
};
//# sourceMappingURL=schedule.js.map