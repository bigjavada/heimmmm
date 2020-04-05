/* 
1使用路由
1.1:安装路由
1.2:导入路由
1.3:注册路由
1.4:实例化
1.5:注入路由
1.6:在app.vue中写路由接口(router-view)
*/
// 1.0:导入子组件

import Vue from 'vue'
// 1.2：导入路由
import VueRouter from 'vue-router';
// 1.2:注册
Vue.use(VueRouter);
// 1.4:实例化
const router = new VueRouter({
  routes:[
    //   {path:"/", component:login }
  ]
});
// 1.5:输出出去
export default router;