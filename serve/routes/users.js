var express = require('express');
var router = express.Router();

// 引入连接数据模块
const connection = require('./connect');
// 给所有的路由统一设置响应头
router.all('*', (req, res, next) => {
  // 设置响应头用于解决跨域问题
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
  // 设置允许设置cookie
  res.setHeader('Access-Control-Allow-Credentials', true);

  // 给其他路由放行
  next();
})

// 接收前端验证登录的请求 /checklogin
router.post('/checklogin',(req,res) => {
  // 接收前端的数据
  let {username,password} = req.body;
  // 检查该用户是否存在和是否正确
  // 创建查询该用户信息的sql语句
  const sqlStr = `select * from users where username= '${username}' and password= '${password}'`;
  // 执行sql语句
  connection.query(sqlStr,(err,data) => {
    if(err){
      throw err;
    }else{
      if(data.length){
        // 成功查询到数据就设置cookie
        res.cookie('userid',data[0].id);
        res.cookie('username',data[0].username);
        res.cookie('usergroup',data[0].usergroup);
        // 向前端返回成功的提示信息
        res.send({'rstCode': 1, 'msg': '登陆成功！欢迎登录华联超市管理系统！'})
      }else{
        // 返回失败的提示信息
        res.send({'rstCode': 0, 'msg': '登陆失败！请请检查用户名和密码是否正确！'})
      }
    }
  })

})

// 就收前端验证登录状态的请求 /checkIsLogin
router.get('/checkIsLogin',(req,res) => {
  // 获取浏览器cookie
  let userid = req.cookies.userid;
  let username = req.cookies.username;
  let usergroup = req.cookies.usergroup;
  // 根据获取的cookie进行判断
  if(userid && username && usergroup){
    // 如果cookie存在，返回状态true
    res.send({"isLogin": true})
  }else{
    // cookie不存在，返回状态值false
    res.send({"isLogin": false})
  }
})

// 接收前端的添加用户请求 /useradd
router.post('/useradd', (req, res) => {
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
        res.send({ 'rstCode': 1, 'msg': '用户添加成功！' })
      } else {
        res.send({ 'rstCode': 0, 'msg': '用户添加失败' })
      }
    }
  })
})

// 接收前端获取用户数据的请求 /userlist
router.get('/userlist', (req, res) => {
  // 创建查询所有数据的sql语句
  const sqlStr = 'select * from users order by cdate desc' //order by 用于设置数据的排序方式 asc 是升序，desc是降序
  // 执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err;
    } else {
      res.send(data);
    }
  })
})

//接收前端删除用户的请求 /deluser
router.get('/deluser', (req, res) => {
  // 接收前端传入的参数
  let { id } = req.query;
  // 创建删除数据的sql语句
  const sqlStr = `delete from users where id = ${id}`;
  // 执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err;
    } else {
      if (data.affectedRows > 0) {
        res.send({ 'rstCode': 1, 'msg': '用户删除成功！' })
      } else {
        res.send({ 'rstCode': 0, 'msg': '用户删除失败！' })
      }
    }
  })
})

// 接收前端查询单条数据的请求 /finduser
router.get('/finduser', (req, res) => {
  //接收参数
  let { id } = req.query;
  // 创建一个查询数据的sql语句
  const sqlStr = `select * from users where id = ${id}`;
  // 执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err;
    } else {
      res.send(data)
    }
  })
})

// 接收前端保存修改内容请求 /saveedit
router.post('/saveedit',(req,res) => {
  // 接收前端传来的参数
  let {username,password,usergroup,editid} = req.body;
  // 创建sql语句根据id修改这一条数据
  const sqlStr = `update users set username='${username}',password='${password}',usergroup='${usergroup}' where id=${editid}`;
  //执行sql语句
  connection.query(sqlStr,(err,data) => {
    if(err){
      throw err;
    }else{
      if(data.affectedRows > 0){
        res.send({'rstCode': 1,'msg': '用户数据修改成功！'})
      }else{
        res.send({'rstCode': 0,'msg': '用户数据修改失败！'})        
      }
    }
  })  
 
})

// 接收前端批量删除请求  /batchdel
router.post('/batchdel',(req,res) => {
  //接收前端数据
  let {idArr} = req.body;
  // 先将接收的前端数据转为对象
  idArr = JSON.parse(idArr);
  // 构造批量删除的sql语句
  const sqlStr = `delete from users where id in (${idArr})`;
  // 执行sql语句
  connection.query(sqlStr,(err,data) => {
    if(err){
      throw err;
    }else{
      if(data.affectedRows > 0){
        res.send({'rstCode': 1,'msg': '批量删除成功！'})
      }else{
        res.send({'rstCode': 0,'msg': '批量删除失败！'})        
      }
    }
  })

})

// 接收前端退出登录请求 /logout
router.get('/logout',(req,res) => {
  // 清除cookie
  res.clearCookie('userid');
  res.clearCookie('username');
  res.clearCookie('usergroup');
  // 返回前端退出成功的提示信息
  res.send({'rstCode': 1,'msg': '退出登陆成功，欢迎再次登录！'})
})

module.exports = router;
