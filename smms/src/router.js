// 引入vue
import Vue from 'vue'
// 引入路由
import Router from 'vue-router'

// 引入所需组件
// 引入登录页面组件
import Login from '@/views/Login/Login.vue'
// 引入后台主页（系统信息）页面组件
import Index from '@/views/Index/Index.vue'
import Home from '@/views/Home/Home.vue'
// 引入添加用户页面组件
import UserAdd from '@/views/UserAdd/UserAdd.vue'
// 引入用户管理页面组件
import UserManage from '@/views/UserManage/UserManage.vue'
// 引入修改密码页面组件
import EditPassword from '@/views/EditPassword/EditPassword.vue'
// 引入商品管理页面组件
import GoodsManage from '@/views/GoodsManage/GoodsManage.vue'
// 引入添加商品页面组件
import GoodsAdd from '@/views/GoodsAdd/GoodsAdd.vue'
// 引入销售统计页面组件
import SalesCount from '@/views/SalesCount/SalesCount.vue'
// 引入个人中心页面组件
import Personal from '@/views/Personal/Personal.vue'



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
        },
        {
          path: '/goodsmanage',
          name: 'goodsmanage',
          component: GoodsManage
        },
        {
          path: '/goodsadd',
          name: 'goodsadd',
          component: GoodsAdd
        },
        {
          path: '/salescount',
          name: 'salescount',
          component: SalesCount
        },
        {
          path: '/personal',
          name: 'personal',
          component: Personal
        }
      ]
    }

  ]
})
