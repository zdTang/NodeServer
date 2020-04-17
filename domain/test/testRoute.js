"use strict";
let Route = require('../route.js');
//let L = require('../dataElements/legPIA.js');
//const path = require('path');
//path.resolve(__dirname,'../dataElements/cookedSpot.js')
//let Cook = require(path.resolve(__dirname, '/server/src/dist/domain/dataElements/cookedSpot.js'));


//  Construct a routePIA object
let Route_PIA = require("../dataElements/routePIA.js");
let Leg_PIA = require("../dataElements/legPIA.js");

let routePIA= new Route_PIA();
routePIA.RouteID='ABC';
routePIA.GPSid='A123999';
routePIA.Legs=[];

// construct Leg_PIA
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

routePIA.Legs.push(legPIA1);
routePIA.Legs.push(legPIA2);





let r1 = new Route(routePIA);
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
r1.UpdateTrack({a:12,b:44});
r1.UpdateTrack({a:32,b:84});
console.log(r1.GetRouteStatus());
//console.log(r1.GetAllLegDataFromTruck());
//console.log(r1.GetAllLegStatus());
//console.log(r1.RoutePIA.Legs);





// console.log(z[0].GetLegTotalStatus());
// console.log(z[0].GetLoadDurationStatus());
// console.log(z[1].GetLoadDurationStatus());
// console.log(z[1].GetLoadDurationStatus());
//# sourceMappingURL=testRawSpot.js.map