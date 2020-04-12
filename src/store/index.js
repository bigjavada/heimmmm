import Vue  from 'vue'

/* 
  vuex的使用和路由很相似(也是一个插件实现功能,这个插件叫做vuex)
1:安装 npm i vuex
2:导入  import Vuex from 'vuex'
3:注册  Vue.use(Vuex)
4:实例化  const store = new Vuex.Store({
//共享数据
state:{}
})
5:注入到new Vue实例中
new Vue({
store,
})
*/
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state:{
        userInfo:'',//用户信息
    }
});

export default store