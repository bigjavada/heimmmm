<template>
  <div class="login">
    <div class="left">
      <div class="title">
        <img src="@/assets/img/login.png" alt />
        <span class="titleName">黑马面面</span>
        <span class="titleLinee">|</span>
        <span class="titleName2">用户登录</span>
      </div>
    </div>
    <div class="right">
      <img src="@/assets/img/login_banner_ele.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "login"
};
</script>

<style lang="less">
.login {
  display: flex; //弹性布局
  justify-content: space-around; //主轴对齐
  align-items: center; //侧轴居中
  //直接在这里设置宽高100%是没有用的,因为在父组件App.vue中,有一个id为app的div,将id改为class即可
  height: 100%;
  background: linear-gradient(225deg,rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  .left {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding:50px;
      .titleName {
          margin-left: 10px;
        height: 22px;
        font-size: 24px;
        color: rgba(12, 12, 12, 1);
      }
      .titleLinee {
        font-size: 24px;
        background: #ccc;
        display: inline-block;
        margin: 0 20px;
      }
      .titleName2 {
        font-size: 22px;
        color: rgba(12, 12, 12, 1);
      }
  }
}
</style>