// class ProcessorClass{

    
//     // Properties
    
    
    
//      constructor(){

//     this.DateBase=require('../../libs/database.js');
//     this.getFile();
//     }
//     async getFile(){
//         this.PredefinedLocation=await this.DateBase.query(`select * from plant`) ;
//         //return x;
//     }


// }
//let ConfigTable=require('../../libs/config.js');
//let DateBase=require('../../libs/database.js');

// let mysql=require('mysql');
// const con = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'mysql',
//     database: 'flos'
//   });
// con.query(`select * from plant`,(err, result) => {
//     if (err) throw err;

//     console.log(result);
//     console.log('good');
//   }
// );


// console.log("where am I ");
let Processor = require('../processor.js');
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
routePIA_B.RouteID='zzy';
routePIA_B.GPSid='ttttuuu';
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






let t1={a:12,b:4};
let t2={e:23,r:33};
let spot=[{x:999,y:999},{x:888,y:888},{x:777,y:777}];

let p=new Processor(t1,t2);
p.AddNewPIA(schedulePIA);
p.AddPosition(spot);
//console.log(p.PredefinedLocation);
//console.log(p.ScheduleLists);
// console.log(p.DisplayLocationPool);
//console.log(p.ConfigTable);
// console.log(p.Routes);
// console.log(p.GetRoutesDetailStatusByGPSid('A123999'));
// console.log(p.GetRoutesDetailStatusByRouteID('zzy'));


    