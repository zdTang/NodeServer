"use strict";
let R = require('../dataElements/schedulePIA.js');
//let L = require('../dataElements/legPIA.js');
//const path = require('path');
//path.resolve(__dirname,'../dataElements/cookedSpot.js')
//let Cook = require(path.resolve(__dirname, '/server/src/dist/domain/dataElements/cookedSpot.js'));
let schedulePIA = new R();
//let leg = new L();
schedulePIA.Dispatcher='Mike';
schedulePIA.Date='2020-09-09';
schedulePIA.Routes=[{a:'costco',b:'toyota'}];

// x.latitude = 2;
// x.longitude = 3;
// y.latitude = 9;
// y.longitude = 9;
console.log(schedulePIA);
console.log(schedulePIA.Dispatcher);
let z = [];
z.push(schedulePIA);
//console.log(l1);
console.log(z);
//# sourceMappingURL=testRawSpot.js.map