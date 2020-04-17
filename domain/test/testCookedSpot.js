"use strict";
const path = require('path');
//path.resolve(__dirname,'../dataElements/cookedSpot.js')
let Cook = require(path.resolve(__dirname, '/server/src/dist/domain/dataElements/cookedSpot.js'));
let x = new Cook();
let y = new Cook();
x.latitude = 2;
x.longitude = 3;
y.latitude = 9;
y.longitude = 9;
let z = [];
z.push(x);
z.push(y);
console.log(x);
console.log(z);
console.log(z[1].longitude);
console.log(x.latitude);
console.log(x.longitude);
//# sourceMappingURL=testCookedSpot.js.map