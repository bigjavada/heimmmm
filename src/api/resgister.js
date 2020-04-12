import instance  from '@/utils/request.js'

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