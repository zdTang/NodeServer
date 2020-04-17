// (async function() {

//     const mysql = require('mysql2/promise');

//     const connection = await mysql.createConnection({
//         host: '127.0.0.1',
//         user: 'root',
//         password: mysql,
//         database: 'flos'
//     });

//     /**
//      * arr返回一个数组，第一个数组是记录的值，第二个数组是记录中包含的字段的信息
//      */
//     // let arr = await connection.query("SELECT username,age,gender FROM users");
//     // console.log(arr);

//     /**
//      * 解构赋值
//      */
//     let [users] = await connection.query("SELECT * from location");
//     console.log(users);

//     // users.forEach(user => {
//     //     console.log(user.username);
//     // });

// })();

// const mysql=require('mysql');
// const config=require('../../libs/config');
// const pool=mysql.createPool({
//     host: config.DB_HOST,
//     port:config.PORT,
//     database: config.database,
//     user:config.user,
//     password:config.password
// });

const http=require('http');
const mysql=require('mysql');
//connect to databse
// default: port:3306
let db=mysql.createConnection({host:'localhost',user:'root',password:'mysql',database:'flos'});
// 无论查询还是插入都是QUERY
db.query(`SELECT * FROM location`,(err,data)=>
{
if(err){    console.log("wrong",err);}
else{    console.log(data);}
})

// function query(sql){
//     console.log(sql);
//     return new Promise((resolve,reject)=>{
//         pool.getConnection((err,connection)=>{
//             if(err){
//                 resolve(err);
//                 return;
//             }
//             connection.query(sql,(error,result)=>{
//                 if(err){
//                     reject(error)
//                 }else{
//                     //console.log(result);
//                     resolve(result);
//                 }
//                 connection.release();
//             })
//         })
//     })
// }

// sql='Select * from location'
// console.log(query(sql));



