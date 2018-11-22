<template>
  <div class="login">
    <div class="login-from">
        <!-- 标题 -->
        <div class="title">
          <h1>
            <i class="el-icon-setting"></i>
            华联超市管理系统

          </h1>
        </div>
        
        <el-form :model="loginform" status-icon :rules="loginrules" ref="loginform" label-width="100px" class="demo-ruleForm">
          
          <el-form-item label="用户" prop="username">
            <el-input type="text" v-model="loginform.username" autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="密码" prop="password">
            <el-input type="text" v-model="loginform.password" autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="text" v-model="loginform.checkPass"></el-input>
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginform')">登陆</el-button>
            <el-button @click="resetForm('loginform')">重置</el-button>
          </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
     // 自定义验证密码一致性函数
    const confirmPwd = (rule, value, callback) => {
        // 非空验证
        if (value === '') {
            // 不能为空的提示
            callback(new Error('请再次输入密码'));
        } else if (value !== this.loginform.password) { // 一致性验证
            // 密码不一致的回调
            callback(new Error('两次密码不一致'))
        } else {
            // 成功提示（绿色勾勾）
            callback()
        }
    }

    return {
      // 登录表单数据对象
      loginform: {
        username: "",
        password: "",
        checkPass: ""
      },
      // 表单验证
      loginrules: {
        username: [
          { required: true, message: '账号不能为空', trigger: 'blur' }, // 非空验证
          { min: 3, max: 6, message: '长度必须 3 到 8 个字符', trigger: 'blur' } // 长度验证
          ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }, // 非空验证
          { min: 3, max: 6, message: '长度必须 3 到 6 个字符', trigger: 'blur' } // 长度验证
          ],
        checkPass: [
          { required: true, validator: confirmPwd, trigger: 'blur' }, // 非空验证以及密码一致性验证
        ]
      }
    };
  },
  methods: {
    // 提交验证
    submitForm(formName) {
      // 获取整个表单
      this.$refs[formName].validate(valid => {
        // 如果表单所有的内容都合法，就提交
        if (valid) {
          // 成功的提示文字
          alert("前端验证成功，即将登陆!");
          // 成功后获取表单的填写内容
          let username = this.loginform.username;
          let password = this.loginform.password;

          // 跳转到后端系统首页
          this.$router.push('/');

        } else {
          // 如果表单中有任何一项不合法，就验证失败，并输出提示
          console.log("前端验证失败，请检查填写的信息");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less">
.login {
  height: 100%;
  background-image: url("./1.jpg");
  .title{
    color: #fff;
    font-size: 12px; 
    text-align: center; 
    margin-bottom: 30px;
  }
  .login-from {
    width: 500px;
    height: 350px;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 7px;
    padding-right: 34px;
    

    // 居中
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    .el-form{
      .el-form-item{
        .el-form-item__label {
          color: #fff!important;
        }
      } 
    }
  }
 
}
</style>


