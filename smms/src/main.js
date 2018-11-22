// 引入vue
import Vue from 'vue'

// // 引入Elementui资源文件
import ElementUI from 'element-ui'; // 组件代码js
import 'element-ui/lib/theme-chalk/index.css'; // 样式代码css

// base.css
import '@/common/css/base.css';

// 引入顶级组件
import App from './App.vue'
// 引入路由
import router from './router'

// 注册ElementUI
Vue.use(ElementUI);

// 阻止生产提示
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
