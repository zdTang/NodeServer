"use strict";
let MyCo = require('../dataElements/coordinate.js');
let x = new MyCo();
let y=new MyCo();
x.latitude = 2;
x.longitude = 3;
y.latitude = 9;
y.longitude = 9;
let z=[];
z.push(x);
z.push(y);
console.log(x);
console.log(z);
console.log(z[1].longitude);
console.log(x.latitude);
console.log(x.longitude);
//# sourceMappingURL=test.js.map