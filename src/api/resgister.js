//注册页面的请求
import axios from 'axios';
//导入文本框
import { Message } from 'element-ui';
var instance = axios.create({
  baseURL: process.env.VUE_APP_URL,//设置了基地址
  withCredentials: true,//跨域依旧携带cookie
});


// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  if (response.data.code == 200) {
    //返回数据多了一层data,每个都要写很麻烦,所以返回的时候直接返回值.data 
    return response.data;
  } else {
    // 提示用户的错误信息
    Message.error(response.data.message);
    // 对响应数据做点什么
    return Promise.reject('error');
  }
  // 出错了不需要返回数据出去,所以抛出异常,不执行后面代码
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

//获取手机验证码的方法
function getPhoneCode(data) {
  return instance({
    url: '/sendsms',//省略了基地址
    method: 'post',
    data,//data:data
  })
}
// 注册方法
function register(data) {
  return instance({
    url: "/register",
    method: 'post',
    data,//data:data
  })
}

/* 
  在js中使用 export 
  export{a}和 export{b} 他是与import对应使用的
  两个之间就是一个结构赋值
    {a} = {a,b}
  注意点:命名方面需要一一,export可以写多个
*/
export { getPhoneCode, register }