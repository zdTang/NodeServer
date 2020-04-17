"use strict";
let R = require('../leg.js');
let P = require('../dataElements/legPIA.js')
//let L = require('../dataElements/legPIA.js');
//const path = require('path');
//path.resolve(__dirname,'../dataElements/cookedSpot.js')
//let Cook = require(path.resolve(__dirname, '/server/src/dist/domain/dataElements/cookedSpot.js'));
let p1= new P();
//let p2= new P();
p1.ArriveStart='3';
p1.Cost=100;
p1.locationName='costco';
p1.DeliverLocation='toyota';
p1.LoadTime='2020-1-1';
let r1 = new R(p1);
// let r2 = new R(p2);
// r2.LegFromPIA.locationName=2;
//let leg = new L();

// x.latitude = 2;
// x.longitude = 3;
// y.latitude = 9;
// y.longitude = 9;
// let z = [];
// r1.SetCurrentRouteStatus(4);
// r2.SetLoadDurationStatus(5);
// z.push(r1);
// z.push(r2);
//z.push(leg);
//console.log(l1);
//console.log(r1.GetLegTotalStatus());
r1.SetRealArriveStart('2020-12-12');
console.log(r1.GetRealLegData());
console.log(r1.GetRealArriveStart());
//console.log(p1);
// console.log(z[0].GetLegTotalStatus());
// console.log(z[0].GetLoadDurationStatus());
// console.log(z[1].GetLoadDurationStatus());
// console.log(z[1].GetLoadDurationStatus());
//# sourceMappingURL=testRawSpot.js.map