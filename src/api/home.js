import instance  from '@/utils/request.js'
//获取用户信息的方法
function getUserInfo(params){
    return instance({
        url:'/info',
        method:'get',
        params
    });
}
// 退出登录的方法
function exitLogin(){
    return instance({
        url:'/logout',
        method:'get',
    });
}
export {getUserInfo,exitLogin}