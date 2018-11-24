// 引入vue
import Vue from 'vue'
// 引入路由
import Router from 'vue-router'

// 引入所需组件
import Login from '@/views/Login/Login.vue'
import Index from '@/views/Index/Index.vue'
import Home from '@/views/Home/Home.vue'
import UserAdd from '@/views/UserAdd/UserAdd.vue'
import UserManage from '@/views/UserManage/UserManage.vue'
import EditPassword from '@/views/EditPassword/EditPassword.vue'



// 注册路由
Vue.use(Router)

export default new Router({
  routes: [
    // 登录页面路由
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    // 后台系统首页路由
    {
      path: '/',
      name: 'index',
      component: Index,
      children:[
        // 后台子路由-系统信息
        {
          path: '',
          name: 'home',
          component: Home
        },
        // 后台子路由-添加用户
        {
          path: '/useradd',
          name: 'useradd',
          component: UserAdd
        },
        {
          path: '/usermanage',
          name: 'usermanage',
          component: UserManage
        },
        {
          path: '/editpassword',
          name: 'editpassword',
          component: EditPassword
        }
      ]
    }

  ]
})
