// mysql2.js

class data{
    constructor(){
        this.result={};
       
    }
async getResult(){

    //(async () => {
        // get the client
        const mysql = require('mysql2/promise');
        // 连接配置
        const cfg = {
        host: "localhost",
        user: "root",
        password: "mysql", // 修改为你的密码
        database: "flos" // 请确保数据库存在
        };
        // create the connection
        const connection = await mysql.createConnection(cfg);
        // 查询 conn.query()
    // 创建表
    // const CREATE_SQL = `CREATE TABLE IF NOT EXISTS test (
    //     id INT NOT NULL AUTO_INCREMENT,
    //     message VARCHAR(45) NULL,
    //     PRIMARY KEY (id))`;
        const CREATE_SQL = `Select * From location`;
        const INSERT_SQL = `INSERT INTO test(message) VALUES(?)`;
        const SELECT_SQL = `SELECT * FROM test`;
        // query database
        let ret = await connection.execute(CREATE_SQL);
        console.log('create:', ret)
        
        // ret = await connection.execute(INSERT_SQL, ['abc']);
        // console.log('insert:', ret)
        // const [rows, fields] = await connection.execute(SELECT_SQL);
        // console.log('select:', rows)
      
       // })()



}

}

let a=new data();
a.getResult();
console.log(a.result);