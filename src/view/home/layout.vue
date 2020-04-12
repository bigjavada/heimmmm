<template>
  <el-container class="layout">
    <el-header class="header">
      <div class="left">
        <i class="el-icon-s-fold saveHeight" @click="collapse=!collapse"></i>
        <img src="@/assets/img/login.png" alt />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <!-- 这里直接拼接,由于请求是在渲染请获取,而渲染的时候userInfo没有值,导致会报404 -->
        <!-- <img class="avatar" :src="baseUrl+'/'+userInfo.avatar" alt /> -->
        <!-- 解决方法:直接在created方法里面重新赋值 -->
        <img class="avatar" :src="userInfo.avatar" alt />
        <span class="name">{{ userInfo.username}},您好</span>
        <el-button type="primary" @click="exit">退出</el-button>
      </div>
    </el-header>
    <el-container>
          <!-- 
            菜单组件
                el-menu  default-active 默认打开哪一项对应下面子项的index值
                collapse 控制菜单是否折叠(仅在mode为vertical时可用)
                el-munu-item 它就是菜单的每一项  它里面的index就表示当前项的值,与default-active对应
                    i表示图标处理
                    slot="title" 重写标题
            collapse 控制菜单是否折叠
            加上后就会在el-menu上产生一个class el-menu--collapse
            然后为了实现动画效果,我们得到一个初始高度.因为默认是没有设置默认高度的
            menuTransition就是el-menu上定义的一个class
            menuTransition就是el:not(.el-menu--collapse){
                widht:200px//初始宽度
            }
            注意点:我们的设置el-aside的宽度为auto,不能写死,不然就没有适配效果 
         -->
      <el-aside class="aside" width="auto">
        <el-menu :router="true" :default-active="$route.fullPath" :collapse="collapse" class="menuTransition">
            <el-menu-item index="/home/chart">
              <i class="el-icon-pie-chart"></i>
              <span slot="title">数据概览</span>
            </el-menu-item>
            <el-menu-item index="/home/userList">
                <i class="el-icon-user"></i>
                <span slot="title">用户列表</span>
              </el-menu-item>
              <el-menu-item index="/home/question">
                <i class="el-icon-edit-outline"></i>
                <span slot="title">题库列表</span>
              </el-menu-item>
              <el-menu-item index="/home/business">
                <i class="el-icon-office-building"></i>
                <span slot="title">企业列表</span>
              </el-menu-item>
              <el-menu-item index="/home/subject">
                <i class="el-icon-notebook-2"></i>
                <span slot="title">学科列表</span>
              </el-menu-item>
          </el-menu>
      </el-aside>
      <el-main class="main">
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getUserInfo, exitLogin } from "@/api/home.js";
import { removeToken,getToken } from "@/utils/token.js";
export default {
  data() {
    return {
      userInfo: "", //存储用户信息的数组
      collapse:false,//左边的菜单是否折叠
    };
  },
  created() {
      //进行一个基本判断,无token跳入登录页
      if(!getToken()){
          this.$router.push('/');
          return;
      }
    getUserInfo().then(res => {
      window.console.log("用户信息", res);
      this.userInfo = res.data;
      // 优化:不仅没有报错了而且少定义了baseUrl基地址
      this.userInfo.avatar =
        process.env.VUE_APP_URL + "/" + this.userInfo.avatar;
    });
  },
  methods: {
    // 点击退出登录的按钮
    exit() {
      /* 
            this.$confirm方法
                第一个参数是内容,第二个参数是标题,第三个是匹配对象
                confirmButtonText确认配置
                cancelButtonText取消配置
                type: warning(警告),success(成功),error(失败)
            then是点击确定后的回调函数
            catch点击取消后的回调函数
        */
      this.$confirm("此操作将退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          // 退出登录接口的调用
          exitLogin().then(() => {
            removeToken(); //删除token
            //跳转到登录页
            this.$router.push("/");
          });
        }).catch(() => {
          this.$message({
            type: "info",
            message: "退出失败"
          });
        });
    }
  }
};
</script>

<style lang="less">
.layout {
  height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    .left {
      .saveHeight {
        font-size: 20px;
        margin: 0 10px;
      }
      .title {
        height: 22px;
        font-size: 22px;
        margin: 0 10px;
        font-weight: bold;
        color: rgba(73, 161, 255, 1);
      }
    }
    .right {
      display: flex;
      align-items: center;
      .avatar {
        height: 43px;
        width: 43px;
      }
      .name {
        margin: 0 10px;
      }
    }
  }
  .aside {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    
  }
  .menuTransition:not(.el-menu--collapse){
        width: 200px;
    }
}
</style>