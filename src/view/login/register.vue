<template>
  <el-dialog title="收货地址" :visible.sync="dialogFormVisible" class="register">
        <!-- 
            el-dialog
            visible.sync属性控该弹窗口是否显示
            slot可以重写title
            width属性用于设置宽度
            show-close	是否显示关闭按钮
        -->
    <div slot="title" class="soltTitle">用户注册</div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false
    };
  }
};
</script>

<style lang="less">
.register{
    .soltTitle {
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: rgba(3, 192, 249, 1);
  color: #fff;
}
.el-dialog__header {
  padding: 0
}
}

</style>