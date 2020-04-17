"use strict";
let Schedule = require('../schedule.js');
//let L = require('../dataElements/legPIA.js');
//const path = require('path');
//path.resolve(__dirname,'../dataElements/cookedSpot.js')
//let Cook = require(path.resolve(__dirname, '/server/src/dist/domain/dataElements/cookedSpot.js'));



let Route_PIA = require("../dataElements/routePIA.js");
let Leg_PIA = require("../dataElements/legPIA.js");
let Schedule_PIA = require("../dataElements/schedulePIA.js");



//  Construct a routePIA_A ====================
let routePIA_A= new Route_PIA();
routePIA_A.RouteID='ABC';
routePIA_A.GPSid='A123999';
routePIA_A.Legs=[];

// construct Leg_PIA1
let legPIA1=new Leg_PIA();
legPIA1.legID=0;
legPIA1.locationName='Costco';
legPIA1.ArriveStart='2020-8-9';
legPIA1.Depart='2020-8-9';
legPIA1.LoadTime='2020-8-9';
legPIA1.TransitTime='2020-8-9';
legPIA1.DeliverLocation='TOYATO';
legPIA1.ArriveEnd='2020-8-9';
legPIA1.Cost=99;

// construct Leg_PIA2
let legPIA2=new Leg_PIA();
legPIA2.LegID=1;
legPIA2.locationName='Walmart';
legPIA2.ArriveStart='2020-8-9';
legPIA2.Depart='2020-8-9';
legPIA2.LoadTime='2020-8-9';
legPIA2.TransitTime='2020-8-9';
legPIA2.DeliverLocation='Karmax';
legPIA2.ArriveEnd='2020-8-9';
legPIA2.Cost=199;

routePIA_A.Legs.push(legPIA1);
routePIA_A.Legs.push(legPIA2);

//====================================
//  Construct a routePIA_B 
let routePIA_B= new Route_PIA();
routePIA_B.RouteID='ABC';
routePIA_B.GPSid='A123999';
routePIA_B.Legs=[];

// construct Leg_PIA1
let legPIA3=new Leg_PIA();
legPIA3.legID=0;
legPIA3.locationName='Costco';
legPIA3.ArriveStart='2020-8-9';
legPIA3.Depart='2020-8-9';
legPIA3.LoadTime='2020-8-9';
legPIA3.TransitTime='2020-8-9';
legPIA3.DeliverLocation='TOYATO';
legPIA3.ArriveEnd='2020-8-9';
legPIA3.Cost=99;

// construct Leg_PIA2
let legPIA4=new Leg_PIA();
legPIA4.LegID=1;
legPIA4.locationName='Walmart';
legPIA4.ArriveStart='2020-8-9';
legPIA4.Depart='2020-8-9';
legPIA4.LoadTime='2020-8-9';
legPIA4.TransitTime='2020-8-9';
legPIA4.DeliverLocation='Karmax';
legPIA4.ArriveEnd='2020-8-9';
legPIA4.Cost=199;

routePIA_B.Legs.push(legPIA3);
routePIA_B.Legs.push(legPIA4);

//============= Create a SchedulePIA
let schedulePIA= new Schedule_PIA();
schedulePIA.Dispatcher='Mike';
schedulePIA.Date='2020-04-01';
schedulePIA.Routes=[];
schedulePIA.Routes.push(routePIA_A);
schedulePIA.Routes.push(routePIA_B);


// Start test=========

let schedule=new Schedule(schedulePIA)
//console.log(schedule.Routes);
// console.log(schedule.TodaySchedulePIA);
 //console.log(schedule.Routes[0].GetRouteStatus());
//console.log(schedule.Routes[1].RoutePIA);
console.log(schedule.Routes[1].Legs);
//console.log(schedule.GetScheduleDetailStatus());

//let r1 = new Route(routePIA);
//let r2 = new R();
//let leg = new L();

// x.latitude = 2;
// x.longitude = 3;
// y.latitude = 9;
// y.longitude = 9;
//let z = [];
// r1.SetCurrentRouteStatus(4);
// r2.SetLoadDurationStatus(5);
// z.push(r1);
// z.push(r2);
//z.push(leg);
//console.log(l1);
//console.log(R);

// TEST LEG
//console.log(r1.Legs);

// TEST GetRouteStatus
//console.log(r1.GetRouteStatus());

// test updateTrack()
// r1.UpdateTrack({a:12,b:44});
// r1.UpdateTrack({a:32,b:84});
// console.log(r1.Track);





// console.log(z[0].GetLegTotalStatus());
// console.log(z[0].GetLoadDurationStatus());
// console.log(z[1].GetLoadDurationStatus());
// console.log(z[1].GetLoadDurationStatus());
//# sourceMappingURL=testRawSpot.js.map