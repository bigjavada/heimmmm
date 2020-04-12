//注册页面的请求
import axios from 'axios';
//导入文本框
import { Message } from 'element-ui';
import { getToken, removeToken } from './token.js';
import router from '../router/router.js';

var instance = axios.create({
  baseURL: process.env.VUE_APP_URL,//设置了基地址
  withCredentials: true,//跨域依旧携带cookie
});


// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  //首先判断也没有token
  if(getToken()){
      //如果有token,就将这个token赋值给config(发送请求的)
      config.headers.token = getToken();
  }
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
  } else  if(response.data.code == 206){
      // token的出错处理
      //token的消息提示
      Message.error(response.data.message);
      // router使用需要import
      router.push('/');// 跳转到登录页
      removeToken();//清除错误的token
      return Promise.reject('error');
  }else{
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

export default instance;