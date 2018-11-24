var express = require('express');
var router = express.Router();

// 引入连接数据模块
const connection = require('./connect');


// 接收前端的添加用户请求 /useradd
router.post('/useradd', (req, res) => {
  // 设置响应头用于解决跨域问题
  res.setHeader('Access-Control-Allow-Origin', '*');
  // 接收前端传来的数据
  let { username, password, usergroup } = req.body;

  // 将接收到的数据存入数据库
  // 构建插入数据库的sql语句
  const sqlStr = `insert into users(username, password, usergroup) values('${username}', '${password}', '${usergroup}')`;
  // 执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err;
    } else {
      // console.log('数据：', data);
      if (data.affectedRows > 0) {
        res.send({'rstCode': 1,'msg':'用户添加成功！'})
      } else {
        res.send({'rstCode': 0,'msg':'用户添加失败'})
      }
    }
  })
})

// 接收前端获取用户数据的请求 /userlist
router.get('/userlist',(req,res) => {
  // 设置响应头用于解决跨域问题
  res.setHeader('Access-Control-Allow-Origin', '*');
  // 创建查询所有数据的sql语句
  const sqlStr = 'select * from users order by cdate desc' //order by 用于设置数据的排序方式 asc 是升序，desc是降序
  // 执行sql语句
  connection.query(sqlStr,(err,data) => {
    if(err){
      throw err;
    }else{
      res.send(data);
    }
  })
})

//接收前端删除用户的请求 /deluser
router.get('/deluser',(req,res) => {
  // 设置响应头用于解决跨域问题
  res.setHeader('Access-Control-Allow-Origin', '*');
  // 接收前端传入的参数
  let {id} = req.query;
  // 创建删除数据的sql语句
  const sqlStr = `delete from users where id = ${id}`;
  // 执行sql语句
  connection.query(sqlStr,(err,data) => {
    if(err){
      throw err;
    }else{
      if(data.affectedRows > 0){
        res.send({'rstCode': 1,'msg':'用户删除成功！'})
      }else{
        res.send({'rstCode': 0,'msg':'用户删除失败！'})        
      }
    }
  })
}) 


// 接收前端查询单条数据的请求 /finduser
router.get('/finduser',(req,res) => {
  // 设置响应头用于解决跨域问题
  res.setHeader('Access-Control-Allow-Origin', '*');
  //接收参数
  let {id} = req.query;
  // 创建一个查询数据的sql语句
  const sqlStr = `select * from users where id = ${id}`;
  // 执行sql语句
  connection.query(sqlStr,(err,data) => {
    if(err){
      throw err;
    }else{
      res.send(data)
    }
  })
})

module.exports = router;
