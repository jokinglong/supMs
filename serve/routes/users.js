var express = require('express');
var router = express.Router();

// 引入连接数据模块
const connection = require('./connect');

// 接收前端的添加用户请求 /useradd
router.post('/useradd',(req,res) => {
  // 设置响应头用于解决跨域问题
  res.setHeader('Access-Control-Allow-Origin', '*');
  // 接收前端传来的数据
  let {username,password,usergroup} = req.body;
  // 将接收到的数据存入数据库
  // 构建插入数据库的sql语句
  const sqlstr = `insert into users(username, password, usergroup) values(?, ?, ?)`;
  // 创建一个数组存放需要插入数据库的数据
  const sqlData = [username,password,usergroup];
  // 执行sql语句
  connection.query(sqlstr, sqlData, (err, data) => {
    // 如果有错，抛出错误
    if(err){
      throw err;
    }else{
      // 如果没错，就进行数据存入与否的判断
      if(data.affectedRows > 0){
        res.send({'rstCode': 1,'msg':'用户添加成功！'})
      }else{
        res.send({'rstCode': 0,'msg':'用户添加失败！'})        
      }
    }
  })
})


module.exports = router;
