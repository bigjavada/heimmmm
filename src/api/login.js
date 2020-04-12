import instance  from '@/utils/request.js'

// 登录方法
function toLogin(data) {
  return instance({
    url: "/login",
    method: 'post',
    data,//data:data
  })
}

export { toLogin}