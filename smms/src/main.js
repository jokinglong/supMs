// 引入vue
import Vue from 'vue'

// // 引入Elementui资源文件
import ElementUI from 'element-ui'; // 组件代码js
import 'element-ui/lib/theme-chalk/index.css'; // 样式代码css

// 引入axios
import axios from 'axios';
// 把axios挂在vue原型上
Vue.prototype.axios = axios;

// base.css
import '@/common/css/base.css';

// 引入顶级组件
import App from './App.vue'
// 引入路由
import router from './router'

// 设置全局路由守卫，用于拦截路由
router.beforeEach((to,from,next) => {
  // 定义一个变量保存登录状态
  let isLogin;
  // 允许携带cookie
  axios.defaults.withCredentials=true;
  // 发送请求 查看用户登录状态，有cookie就就是登陆过
  axios.get('http://127.0.0.1:3333/users/checkIsLogin').then(response => {
    // 将后台返回来的状态值赋值给isLogin变量
    isLogin = response.data.isLogin;
    // 进行判断是否登录
    if(!isLogin){
      // 如果没有登录进一步判断
      if(to.path !== '/login'){ //to 表示将要访问的
        // 如果将要访问的地址不是登录页面，就直接跳转到登录页面
        return next({"path":"/login"})
      }else{
        // 如果访问的地址是登录页面直接放行
        next();
      }
    }else{
      // 已经登录，放行
      next();
    }
  })
  // 放行，让其他的路由通过
  next();
})

// 注册ElementUI
Vue.use(ElementUI);

// 阻止生产提示
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
