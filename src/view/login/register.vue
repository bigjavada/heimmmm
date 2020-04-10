<template>
  <el-dialog :visible.sync="dialogFormVisible" class="register" width="600px" :show-close="false">
    <!-- 
            el-dialog
            visible.sync属性控该弹窗口是否显示
            slot可以重写title
            width属性用于设置宽度
            show-close	是否显示关闭按钮
    -->
    <!-- 标题 -->
    <div slot="title" class="soltTitle">用户注册</div>
    <!-- 表格 -->
    <el-form :model="form" label-width="100px" ref="form" :rules="rules">
      <el-form-item label="头像" prop="avatar">
        <!-- 上传东西
            el-upload
           1:上传地址  action
           2：参数     name="值" 该值就是上传文件的参数
           3:是否显示已上传文件列表    show-file-list 
           4:上传成功的回调函数   on-success
              成功回调函数里面有个res就是接口返回信息
           5：上传前的处理（还没调用上传接口前的处理）       before-upload
              上传前处理它有一个file文件信息，通过file文件信息能够限制上传格式（file.type），大小等控制  (file.size以字节)
              该回调函数return的值就是控制让不让你通过  true通过  false不通过
        -->
        <el-upload
          class="avatar-uploader"
          :action="baseUrl+'/uploads'"
          name="image"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <!-- 图形码 
        el-row  行
        el-col  列  :span="值1" :offset="值2"   offset左移偏移栏数
      -->
      <el-form-item label="图形码" prop="code">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.code"></el-input>
          </el-col>
          <!-- offset图片和左边栅格布局的间隔 -->
          <!-- <el-col :span="7" offset="1"><img src="@/assets/img/key.jpg" alt=""></el-col> -->
          <!-- 动态的图形验证码 -->
          <el-col :span="7" :offset="1">
            <img :src="codeUrl" alt class="code" @click="codeClick" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" prop="rcode">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.rcode"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <!-- 获取验证码按钮不为60的时候就不能点击(清空定时器后totalTime值为60的时候) -->
            <!-- 设置一个span标签显示倒计时(判断是否不为60的时候才显示) -->
            <el-button @click="rcodeClick" :disabled="totalTime!=60">
              获取用户验证码
              <span v-if="totalTime!=60">{{totalTime}}</span>
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <!-- 按钮 -->
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible=false">取 消</el-button>
      <el-button type="primary" @click="submitClick">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 手机验证码和注册方法
import {getPhoneCode,register} from '@/api/resgister.js';
// import {a} from './test.js';
export default {
  data() {
    return {
      totalTime:60,//验证码的时间
      dialogFormVisible: false, //弹窗是否显示
      // 表单数据
      form: {
        avatar: "", //头像路径(用来表单检验)
        username: "", //昵称
        email: "", //邮箱
        phone: "", //手机号
        password: "", //密码
        code: "", //图形码
        rcode: "" //验证码
      },
      baseUrl: process.env.VUE_APP_URL, //基地址
      codeUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms", //图形验证码的请求
      imageUrl: "", //存储头像完整路径(用来注册使用的)
      // 表单的验证规则
      rules: {
        // trigger主动触发在没有在元素里面使用v-model的情况他是无效的
        avatar: [{ required: true, message: "请上传头像", trigger: "change" }],
        username: [{ required: true, message: "请写昵称", trigger: "change" }],
        email: [
          { required: true, message: "请写邮箱", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              if (/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)) {
                callback();
              } else {
                callback("请输入正确的邮箱格式");
              }
            }
          }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              if (
                /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
                  value
                )
              ) {
                callback();
              } else {
                callback("请输入正确的手机格式");
              }
            }
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 6, max: 12, message: "请输入6-12位的密码", trigger: "change" }
        ],
        code: [
          { required: true, message: "请输入图形码", trigger: "change" },
          { min: 4, max: 4, message: "请输入4位的图形码", trigger: "change" }
        ],
        rcode: [
          { required: true, message: "请输入验证码", trigger: "change" },
          { min: 4, max: 4, message: "请输入4位的验证码", trigger: "change" }
        ]
      }
    };
  },
      /* 
        问题:由于点击取消按钮,点击弹窗外面,点击关闭按钮,都需要将表单里面的数据清除
        分析:都是由dialogFormVisible这个值来决定的
        解决:监听器
          1:放到watch:{}
          2:写要监听的值  this.dialogFormVisible
          3:去掉this把该传转换成字符串dialogFormVisible
          4:监听器本质就是一个函数 function(当前值,旧值){

          }

      */
     watch: {
       dialogFormVisible(newVal){
          if(newVal == false){
              this.$refs.form.resetFields();
              this.imageUrl = '';//由于图片没有绑定,所以只有将图片路径清空
          }
       }
     },
  created() {
    // alert(a);
  },
  methods: {
    // 上传前处理
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 文件上传成功
    handleAvatarSuccess(res) {
      window.console.log("上传成功的res");
      window.console.log(res);
      this.imageUrl = this.baseUrl + "/" + res.data.file_path; //将获得的图片地址存入变量中
      this.form.avatar = res.data.file_path; //获取上传文件的文件路径(作用:校验文件是否上传)
      // 主动触发一下头像的表单验证validateField
      // 第一个参数是时间传入要验证的值
      // 第二个参数是结果的回调函数
      // 如果第一个传入的是数组,有多个值,执行多次
      // 结果为空表示没问题,不为空表示验证不通过
      this.$refs.form.validateField("avatar");
    },
    // 注册确认按钮的点击事件(自动验证头像是否上传的方法)
    submitClick() {
      // 在el-form上面定义一个ref,调用el-form上的validate方法
      this.$refs.form.validate(result => {
        if(result){
          register(this.form).then(res=>{
            window.console.log('注册信息',res);
            if(res.code==200){
               window.console.log('1');
                this.$message.success('注册成功');
                this.dialogFormVisible = false;//隐藏弹框
            }
          })
        }
        //  if (result) {
        //     this.$message.success(result + "");
        //   } else {
        //     console.log('error submit!!');
        //     this.$message.error(result + "");
        //   }
        // this.$message.success(result + "");
        // window.console.log(result);
      });
    },
    // 点击图形验证码刷新图片的方法
    codeClick() {
      this.codeUrl =
        process.env.VUE_APP_URL + "/captcha?type=sendsms" + Date.now();
    },
    // 点击获取手机号发送的验证码
    rcodeClick() {
      //访问el-form上的validateField方法
      //这个方法有两个参数
      // 第一个是要验证的项,资产string/array(字符串/数组)
      // 第二个是错误信息的回调函数
      // 需求是两次都通过,所以需要判断,只要有错误信息就失败
      let getRcode = true;
      this.$refs.form.validateField(["code", "phone"], error => {
        // window.console.log('验证码错误的提示信息'+error);
        // 需求是两次都通过,所以需要判断,只要有错误信息就失败
        if (error != "") {
          //不为空就是两个条件都成立
          getRcode = false;
        }
      });
      //如果条件成立,就调用接口获取验证码
      if (getRcode === false) {
        return;
      } else {
        //成立调用接口获取验证码
        window.console.log("获取的验证码");
          //获取验证码后设置定时器不重复获取验证码
          this.totalTime--;//有一秒的空隙时间,所有调用前减下值(从59秒开始运行)
          let timeId = setInterval(()=>{
            this.totalTime--;
            // 当验证码小于零的时候,清除定时器,即可由继续获取验证码
            if( this.totalTime <=0 ){
              clearInterval(timeId);
              this.totalTime = 60;
            }
          },1000);
        // 发送axios验证码方法
        getPhoneCode({
          code: this.form.code,
          phone: this.form.phone,
        }).then(res=>{
            this.$message.success(res.data.captcha+'');//数字转成字符串
        });

        // 原本的发送axios请求,实际开发需要封装

        // axios({
        //   url:process.env.VUE_APP_URL+'/sendsms',
        //   method:'post',
        //   data: {
        //     code:this.form.code,
        //     phone:this.form.phone,
        //   },
        // }).then(res=>{
        //   //成功回调
        //   console.log(res);
        //   this.$message.success(res.data.data.captcha+'');//数字转成字符串
        // });
      }
    }
  }
};
</script>

<style lang="less">
.register {
  .soltTitle {
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: rgba(3, 192, 249, 1);
    color: #fff;
  }
  .el-dialog__header {
    padding: 0;
  }
  .avatar-uploader {
    width: 178px;
    margin: 0 auto;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .code {
    width: 100%;
    height: 40px;
    border: 1px solid #ccc;
  }
}
</style>