<template>
  <div id="app">
      <div class="a"><span></span></div>
      <el-row>
            <el-button>默认按钮</el-button>
            <el-button type="primary">主要按钮</el-button>
        </el-row>
      <!-- 1.6:路由出口 -->
      <router-view></router-view>
  </div>
</template>

<script>

export default {
   
}
</script>

<style lang="less">
  #app{
    width: 500px;
    height: 500px;
    background-color: yellow;
    .a{
      width: 100px;
      height: 100px;
      background-color: pink;
      border: 1px solid skyblue
    }
  }
</style>
