// 连接到数据库公用模块

// 引入mysql
const mysql = require('mysql');

// 使用mysql创建连接
const connection = mysql.createConnection({
    host     : 'localhost',       
    user     : 'root',              
    password : 'root',       
    port: '3307',                   
    database: 'smms'
})
// 执行连接
connection.connect();

console.log('数据库连接成功!')

// 将连接暴露出去
module.exports = connection;