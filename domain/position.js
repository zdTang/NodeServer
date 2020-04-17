"use strict";
/*==================================================
* FILENAME      : position.ts
* CREATED BY    : Zhendong Tang
* MODIFIED BY	: N/A
* CREATION DATE : March 13, 2020
* DESCRIPTION   :
*   This class is for each position feeded by GPS device.
=========================================================*/
const Sche = require("./schedule.js");
const Raw_Spot = require('./dataElements/rawSpot.js');
const Cooked_Spot = require('./dataElements/cookedSpot.js');
const Route = require('./route.js');
const Coordinate = require('./dataElements/coordinate.js');
module.exports = class Position {
    /*=========================================================================
    MethodName: constructor
    Description:
    Arguments:
        spot:        Raw_Spot,
        route:       typeof Route,
        configTable: TODO
        db:          TODO
    Return Value: None
    Logic:  The CookedSpotList will used as temporary [] for determine Leg status
 
    ===========================================================================*/
    constructor(spot, routeID, leg) {
        this.DataBase = require('../libs/database.js');
        this.PositionID = 0; // the return value of InsertPosition: the ID of table's new row
        //here to initialize 
        this.Spot = spot;
        this.CurrentLeg = leg; //
        this.CurrentRouteID = routeID;
        this.Coordinate = this.CreateCoordinate(this.Spot);
    }
    /*=========================================================================
      MethodName: CreateCoordinate
      Description:
      Arguments: Spot object
      Return Value: JS object
      ===========================================================================*/
    CreateCoordinate(spot) {
        //let coordinate={latitude:this.Spot.Latitude, Longitude: this.Spot.Longitude};
        let coordinate = new Coordinate();
        coordinate.latitude = this.Spot.Latitude;
        coordinate.longitude = this.Spot.Longitude;
        return coordinate;
    }
    // eslint-disable-next-line spaced-comment
    /*=========================================================================
        MethodName: isThisLegStartLocation
        Description: Compare the two GPS location to determine if current Position
                     is at LegStartLocation
        Arguments: Current Position, Route.Leg.StartLocation
        Return Value: boolean
        Logic:
     
        ===========================================================================*/
    isThisLegStartLocation() {
        //check if this location is at StartLocation
        return true;
    }
    /*=========================================================================
    MethodName: isThisLegToLocation
    Description: Compare the two GPS location to determine if current Position
                 is at legToLocation
    Arguments: Current Position, Route.Leg.ToLocation
    Return Value: boolean
    Logic:
 
    ===========================================================================*/
    isThisLegToLocation() {
        //check if this location is at ToLocation
        return true;
    }
    /*=========================================================================
    MethodName: isAtBorder
    Description:
    Arguments:
        location:        Raw_Spot,
    Return Value: None
    Logic:
 
    ===========================================================================*/
    isAtBorder(Position) {
        return false;
    }
    /*===================================================================
     MethodName: InsertPosition
     Description: Insert a new Position to Position table
     Arguments: 1:  GPSid, 2: LegID,  3: Latitude, 4: Longitude, 5: DateTime
     Return Value: the ID of the new row
     GIC =========*/
    InsertPosition() {
        //  Insert to legstatus table
        //  Position has foreign key constrict,  should insert Position first and get PositionID
        //5,
        //this.PositionID, 
        //this.CurrentLeg.StartLocationID
        return 99;
    }
    ;
    /*===================================================================
     MethodName: UpdatePositionStatus
     Description: Calculate position status and assign to property: Status
     Arguments: 1, leg status  2, Position ID  3, leg's StartLocation
     Return Value: boolean
      ======DETERMINATION LOGIC =========*/
    InsertLegStatus(legStatus, positionID, startLocationID) {
        //  Insert to legstatus table
        //  Position has foreign key constrict,  should insert Position first and get PositionID
        //5,
        //this.PositionID, 
        //this.CurrentLeg.StartLocationID
        return true;
    }
    ;
    /*===================================================================
        MethodName: InsertLegArrivalTime
        Description: Insert current position time as leg arrival time
        Arguments:
        Return Value: boolean
         ======DETERMINATION LOGIC =========*/
    InsertLegArrivalTime(routeID, CurrentLegID, GPStime) {
        //this.Route.RoutePIA.RouteID, this.CurrentLegID, this.Spot.DateTime 
        //  Insert to legstatus table
        //  Position has foreign key constrict,  should insert Position first and get PositionID
        //5,
        //this.PositionID, 
        //this.CurrentLeg.StartLocationID
        return true;
    }
    ;
    /*===================================================================
    MethodName: InsertLegDepartureTime
    Description: Insert current position time as leg departure time
    Arguments:
    Return Value: boolean
     ======DETERMINATION LOGIC =========*/
    InsertDepartureTime(routeID, CurrentLegID, GPStime) {
        //this.Route.RoutePIA.RouteID, this.CurrentLegID, this.Spot.DateTime 
        //  Insert to legstatus table
        //  Position has foreign key constrict,  should insert Position first and get PositionID
        //5,
        //this.PositionID, 
        //this.CurrentLeg.StartLocationID
        return true;
    }
    ;
    /*===================================================================
    MethodName: ifFirstTimeUpdateStatus
    Description: Check if this status has been written to Legstatus Table
    Arguments: 1, leg status  2, Position ID  3, leg's StartLocation
    Return Value: boolean
     ======DETERMINATION LOGIC =========*/
    ifFirstTimeUpdateStatus(statusID, positionID, LocationID) {
        //1,this.PositionID,this.CurrentLeg.StartLocationID
        return true;
    }
    /*===================================================================
        MethodName: ifMoving()
        Description: To compare with previous Location to determine if the truck is stop
        Arguments: GPS ID
        Return Value: boolean
        ======DETERMINATION LOGIC =========*/
    isMoving(GPSid) {
        // Get this GPS's ID's last Latitude and Longitude from Database
        // Get current Position's Latitude and Longitude from current Spot Position
        return true;
    }
    /*===================================================================
       MethodName: UpdatePositionStatus
       Description: Calculate position status and assign to property: Status
       Arguments: None
       Return Value: None
       Logic:
       based on current location and history record
       speed, nearLocation, currentLegID,
   
        ======DETERMINATION LOGIC =========
       
        Previous Leg's END's arrival time point === This Leg's START's arrival time point
        Except the last LEG, each leg has two location:
        The last Leg'S data is fixed
        
        1: START
        2: END
   
        Each Location has three status:
        0: Arrival(only one)    //  For first Leg's StartLocation => The truck is at this location,  ActualArrivalTime===null
                                //  For all Leg's ToLocation => The truck is at this location, truck stops, previous POSITION status is 'In-transit'
        1: loading              //  Condition: 1,Speed < tolerate, 2. belong to this location, 3,the previous status is 'Arrival' or 'Loading'
        2: departure (only one) //  Condition: 1,not belong to this location, 2, the previous status is loading // Speed > tolerate,
        3: In-transit           //  Condition: 1,Speed > tolerate the previous status is 'departure' or 'In-transit' or 'stuck at border'
        4: stuck in traffic     //  Condition: 1,Speed < tolerate , the previous status is 'stuck in In-transit' or 'In-transit' or 'stuck at border'
        //5: stuck at border      //  Condition: 1,near border, 2, Speed < tolerate,
        6: Wait at Location
        
   
    
       =====================================================================*/
    // arrival  : used by two Legs as it is Previous Leg's 'To location'
    //            it is also next Leg's 'start location'
    UpdateLegStatus() {
        // console.log(`has update status`);  // Debug
        // return 
        let status = 9; //  departure, 
        if ((this.CurrentLeg.ID == 1 && this.isThisLegStartLocation() && this.CurrentLeg.ActArrivalTime === null)) { // The first Leg of Current Route
            status = 5; // Arrival
            // Status changed, Update MySQL table
            this.InsertLegStatus(5, this.PositionID, this.CurrentLeg.StartLocationID); // write a row to legstatus table
            this.InsertLegArrivalTime(this.CurrentRouteID, this.CurrentLeg.ID, this.Spot.DateTime); //update Leg Table
            //Every Location only have one Arrival
            //=======[scenario ONE] ==> Route start point
            //the StartLocation of first Leg of this Route 
            //=======[Scenario TWO] ==>  End time point of Previous Leg and the Start time point of next Leg     
            //reach  the ToLocation 
        }
        else if (this.CurrentLeg.ActArrivalTime !== null && this.isThisLegStartLocation()) {
            //status=1; // load  
            if (this.ifFirstTimeUpdateStatus(1, this.PositionID, this.CurrentLeg.StartLocationID)) {
                this.InsertLegStatus(1, this.PositionID, this.CurrentLeg.StartLocationID); // write a row to legstatus table
            }
        }
        else if (!this.isThisLegStartLocation() && this.CurrentLeg.ActArrivalTime !== null && this.CurrentLeg.ActDepartureTime === null) {
            //if(this.ifFirstTimeUpdateStatus(2,this.PositionID,this.CurrentLeg.StartLocationID)){
            this.InsertLegStatus(2, this.PositionID, this.CurrentLeg.StartLocationID); // write a row to legstatus table
            this.InsertDepartureTime(this.CurrentRouteID, this.CurrentLeg.ID, this.Spot.DateTime); // Insert current GPS time as Leg's Departure time
        }
        else if ((this.CurrentLeg.ActDepartureTime !== null) && !this.isMoving(this.Spot.GPSid) && this.isAtBorder(this.Coordinate)) {
            //status=6;  //wait at border
            if (this.ifFirstTimeUpdateStatus(6, this.PositionID, this.CurrentLeg.StartLocationID)) {
                this.InsertLegStatus(6, this.PositionID, this.CurrentLeg.StartLocationID); // write a row to legstatus table
            }
        }
        else if ((this.CurrentLeg.ActDepartureTime !== null) && !this.isMoving(this.Spot.GPSid)) {
            //status=4; stuck in traffic
            if (this.ifFirstTimeUpdateStatus(4, this.PositionID, this.CurrentLeg.StartLocationID)) {
                this.InsertLegStatus(4, this.PositionID, this.CurrentLeg.StartLocationID); // write a row to legstatus table
            }
        }
        else if ((this.CurrentLeg.ActDepartureTime !== null) && this.isMoving(this.Spot.GPSid)) {
            //status=3; In transit
            if (this.ifFirstTimeUpdateStatus(3, this.PositionID, this.CurrentLeg.StartLocationID)) {
                this.InsertLegStatus(3, this.PositionID, this.CurrentLeg.StartLocationID); // write a row to legstatus table
            }
        }
        else if ((this.CurrentLeg.ActDepartureTime !== null) && this.isThisLegToLocation()) {
            // reach to this leg's destination
            this.InsertLegStatus(5, this.PositionID, this.CurrentLeg.StartLocationID); // write a row to legstatus table
            this.InsertLegArrivalTime(this.CurrentRouteID, this.CurrentLeg.ID + 1, this.Spot.DateTime); //update Leg Table
        }
    }
};
//# sourceMappingURL=position.js.map