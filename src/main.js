import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

// 导入子路由
// import login from './components/login.vue';//登录子路由
// 1:使用element-ui
// 1.1：导包
import ElementUI from 'element-ui';
// 1.2：导入样式
import 'element-ui/lib/theme-chalk/index.css';
// 1.3：注册
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  // 2.4:注册到实例中
  router
}).$mount('#app')
