// token保存


// name="token" --> 如果不传name,值默认为token
// 1:token的保存
function saveToken(val,name="token"){
    window.localStorage.setItem(name,val);
}

// 2:token的获取
function getToken(name="token"){
    return window.localStorage.getItem(name);
}

// 3:删除token
function removeToken(name="token"){
    window.localStorage.removeItem(name);
}
// 将增删改的方法暴露出去
export { saveToken,getToken,removeToken}