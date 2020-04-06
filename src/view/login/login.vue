<template>
  <div class="login">
    <div class="left">
      <div class="title">
        <img src="@/assets/img/login.png" alt />
        <span class="titleName">黑马面面</span>
        <span class="titleLinee">|</span>
        <span class="titleName2">用户登录</span>
      </div>
      <!-- 
          1:添加一个el-form表单,在加入子项el-form-item
              :model属性:  绑定表单元素的值
          2:在el-form-item中加入el-inpput
            v-model:双向绑定表单元素的值
            placeholder 
            prefix-icon input前面的图标
            show-password 是否显示密码图标
                注意:前面要加上":"号,将里面的值由字符串变为布尔值
      -->
      <!-- 
          加入表单验证
            1：实现基本布局与数据绑定
            2：在el-form上绑定一个rules属性  rules属性的值要是一个对象
            3:在需要验证的项的el-form-item上定义一个prop属性，prop的值为该项内表单元素v-model绑定的值
            4:在rules里写相应项的验证规则(rules是对象)
               { porp定义的属性名:[{required:true,message:"手机号必填哦",trigger:"change"}]}
          登陆的点击校验
            1.在el-form上定义一个ref  ref="值"
            2.为登陆按钮绑定一个事件
            3.调用el-form的表单验证方法
              this.$refs.form.validate(result=>{
                result它是一个boolean值，
                true验证通过
                false表示 验证不通过
              })
      -->
      <el-form ref="form" :model="form" :rules="rules">
        <!-- 手机号 -->
        <el-form-item prop="phone">
          <el-input v-model="form.phone" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            prefix-icon="el-icon-lock"
            :show-password="true"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <!-- 3:栅格系统  -- 验证码 -->
        <el-form-item prop="code">
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.code" prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="8">
              <img src="@/assets/img/key.jpg" class="key" />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 4:多选框:v-model默认值为空字符串,这样选择结果为true和false -->
        <el-form-item>
          <el-checkbox v-model="form.isCheck">
            我已经阅读并同意
            <!-- el-link  type值决定颜色 -->
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <!-- 5:按钮 -->
        <el-form-item>
          <el-button type="primary" class="btn" @click="subForm">登录</el-button>
          <br />
          <!-- 不写换行由于回车导致按钮前面的空格 -->
          <el-button type="primary" class="btn">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/img/login_banner_ele.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      form: {
        phone: "", //手机号
        password: "", //密码
        code: "", //验证码
        isCheck: "" //多选框的值(true/false)
      },
      rules: {
        phone: [{ required: true, message: "请输入手机号", trigger: "change" }],
        // 密码 6-12位,不能为空
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 6, max: 12, message: "长度在6到12个字符", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "change" },
          { min: 4, max: 4, message: "长度在6到12个字符", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    subForm() {
      this.$refs.form.validate(result => {
        this.$message.success(result + "");
      });
    }
  }
};
</script>

<style lang="less">
.login {
  display: flex; //弹性布局
  justify-content: space-around; //主轴对齐
  align-items: center; //侧轴居中
  //直接在这里设置宽高100%是没有用的,因为在父组件App.vue中,有一个id为app的div,将id改为class即可
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  .left {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding: 50px;
    .title {
      margin-bottom: 20px;
    }
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
    .key {
      width: 100%;
      height: 40px;
    }
    .btn {
      width: 100%;
      margin-bottom: 26px;
    }
  }
}
</style>