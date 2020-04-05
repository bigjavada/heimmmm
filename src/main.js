import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

// 导入子路由
// import login from './components/login.vue';//登录子路由
// 2:使用element-ui
// 2.1：导包
import ElementUI from 'element-ui';
// 2.2：导入样式
import 'element-ui/lib/theme-chalk/index.css';
// 2.3：注册
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
}).$mount('#app')
