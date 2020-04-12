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
import login from '@/view/login/login.vue'//登录组件
import layout from '@/view/home/layout.vue'// 首页
// 导入的子组件
import chart from '@/view/home/chart/chart.vue'
import userList from '@/view/home/userList/userList.vue'
import question from '@/view/home/question/question.vue'
import business from '@/view/home/business/business.vue'
import subject from '@/view/home/subject/subject.vue'
import Vue from 'vue'
// 1.2：导入路由
import VueRouter from 'vue-router';
// 1.2:注册
Vue.use(VueRouter);
// 1.4:实例化
const router = new VueRouter({
  routes:[
      {
        path:"/", component:login 
      },
      {
        path: "/home",
        component: layout,
        redirect:'/home/subject',
        children:[
          {path:"chart", component:chart },
          {path:"userList", component:userList },
          {path:"question", component:question },
          {path:"business", component:business },
          {path:"subject", component:subject },
        ],
    }
  ]
});

//路由导航守卫
//前守卫
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
router.beforeEach((to,form,next)=>{
  Nprogress.start();
  setTimeout(()=>{
    next();
  },1000);
});
//后守卫
router.afterEach((to,from)=>{
  Nprogress.done();
  window.console.log(from);
});

// 1.5:输出出去
export default router;