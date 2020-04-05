import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
// 1.6:在main.js中导入src中创建的router
import router from './router/router.js';

// 2:使用element-ui
// 2.1：导包
import ElementUI from 'element-ui';
// 2.2：导入样式
import 'element-ui/lib/theme-chalk/index.css';
// 2.3：注册
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  // 1.7:将router在main.js中挂载实例中
  router,
}).$mount('#app')
