"use strict";
let myLoa = require('../dataElements/RouteAllStatus.js');
//const path = require('path');
//path.resolve(__dirname,'../dataElements/cookedSpot.js')
//let Cook = require(path.resolve(__dirname, '/server/src/dist/domain/dataElements/cookedSpot.js'));
let l1 = new myLoa();
let l2 = new myLoa();
l1.GPSid='123';
l2.LegsTruck=[12,13];

// x.latitude = 2;
// x.longitude = 3;
// y.latitude = 9;
// y.longitude = 9;
let z = [];
z.push(l1);
z.push(l2);
console.log(l1);
console.log(l2);
console.log(z);
//# sourceMappingURL=testRawSpot.js.map