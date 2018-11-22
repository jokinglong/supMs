// 引入vue
import Vue from 'vue'
// 引入路由
import Router from 'vue-router'

// 引入所需组件
import Login from '@/views/Login/Login.vue'
import Index from '@/views/Index/Index.vue'



// 注册路由
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'index',
      component: Index
    }

  ]
})
