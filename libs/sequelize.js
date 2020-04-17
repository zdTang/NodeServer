/*====================================================================
Discription: An instance of Sequelize
FileName: Sequelize.js
Project: Karmax
Programmer: Zhendong Tang (Mike)
Date      : March 3, 2020
=====================================================================*/

const Sequelize = require('sequelize');
const config=require('../config');

 module.exports = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASS, {
    host: config.DB_HOST,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
});

