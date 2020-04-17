"use strict";
let R = require('../dataElements/legStatus.js');
//let L = require('../dataElements/legPIA.js');
//const path = require('path');
//path.resolve(__dirname,'../dataElements/cookedSpot.js')
//let Cook = require(path.resolve(__dirname, '/server/src/dist/domain/dataElements/cookedSpot.js'));
let r1 = new R();
let r2 = new R();
//let leg = new L();

// x.latitude = 2;
// x.longitude = 3;
// y.latitude = 9;
// y.longitude = 9;
let z = [];
z.push(r1);
z.push(r2);
//z.push(leg);
//console.log(l1);
console.log(z);
console.log(z[1].LoadDuration);
//# sourceMappingURL=testRawSpot.js.map