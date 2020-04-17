// 

(async()=>{
    
    
    const Sequelize = require('sequelize');  //  For other calls
    //const path=require('path');

    

    let sequelize = require('./sequelize')
    
    try{
        sequelize.authenticate();
        console.log('success!')
    }
    catch(e)
    {
        console.log('fail!');
    }



})()
