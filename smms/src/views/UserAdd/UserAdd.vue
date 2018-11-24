<template>
    <div class="useradd">
        <!-- 头部 -->
        <Header></Header>
        <!-- 主体内容 -->
        <el-main>
            <el-card class="box-card">
                <!-- 主面板标题 -->
                <div slot="header" class="clearfix">
                    <span>添加账号</span>
                </div>
                <!-- 添加用户表单 -->
                <el-form :model="adduserform" status-icon :rules="adduerrules" ref="adduserform" label-width="100px" class="demo-ruleForm">

                    <el-form-item label="用户" prop="username">
                        <el-input type="text" v-model="adduserform.username" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="密码" prop="password">
                        <el-input type="text" v-model="adduserform.password" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="text" v-model="adduserform.checkPass"></el-input>
                    </el-form-item>

                    <!-- 选择用户组 -->
                    <el-form-item label="请选择分组" prop="usergroup">
                        <el-select v-model="adduserform.usergroup" placeholder="请选择用户分组">
                            <el-option label="超级管理员" value="超级管理员"></el-option>
                            <el-option label="普通用户" value="普通用户"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm('adduserform')">添加</el-button>
                        <el-button @click="resetForm('adduserform')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-main>
        <!-- 尾部 -->
        <Footer></Footer>
    </div>
</template>
<script>
// 引入axios用于处理post方式请求的qs组件
import qs from "qs";

// 引入头部组件和尾部组件
import Header from "@/components/Header/Header.vue";
import Footer from "@/components/Footer/Footer.vue";
export default {
  components: {
    Header,
    Footer
  },
  data() {
    // 自定义验证密码一致性函数
    const confirmPwd = (rule, value, callback) => {
      // 非空验证
      if (value === "") {
        // 不能为空的提示
        callback(new Error("请再次输入密码"));
      } else if (value !== this.adduserform.password) {
        // 一致性验证
        // 密码不一致的回调
        callback(new Error("两次密码不一致"));
      } else {
        // 成功提示（绿色勾勾）
        callback();
      }
    };

    return {
      // 登录表单数据对象
      adduserform: {
        username: "",
        password: "",
        checkPass: "",
        usergroup: ""
      },
      // 表单验证
      adduerrules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" }, // 非空验证
          { min: 3, max: 6, message: "长度必须 3 到 8 个字符", trigger: "blur" } // 长度验证
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }, // 非空验证
          { min: 3, max: 6, message: "长度必须 3 到 6 个字符", trigger: "blur" } // 长度验证
        ],
        checkPass: [
          { required: true, validator: confirmPwd, trigger: "blur" } // 非空验证以及密码一致性验证
        ],
        usergroup: [
          { required: true, message: "请选择用户分组", trigger: "change" } // 非空验证
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
          // 定义一个对象保存表单数据
          const usersdata = {
            username: this.adduserform.username,
            password: this.adduserform.password,
            usergroup: this.adduserform.usergroup
          };
          // 发送ajax请求  把数据发送给后端
          this.axios.post('http://127.0.0.1:3333/users/useradd', 
            qs.stringify(usersdata), 
            { "headers": { 'Content-Type':'application/x-www-form-urlencoded' }
          })
            .then(response => {
              // 如果请求成功
              if (response.data.rstCode === 1) {
                // 弹出提示信息 
                this.$message({
                  type: 'success',
                  message: response.data.msg
                })
                // 跳到账号管理列表页面
                this.$router.push('/usermanage')
              } else {
                // 弹出账号添加失败信息
                this.$message.error(response.data.msg)
              }
            })
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
.useradd {
  width: 100%;
  // 将盒子改为伸缩盒模型
  display: flex;
  // 改为纵向伸缩
  flex-direction: column;
  .el-main {
    //主体内容自动撑满
    flex: 1;
    .el-card {
      .el-card__header {
        background-color: #f1f1f1;
        font-size: 17px;
        font-weight: bold;
      }
      .el-form {
        width: 350px;
        .el-form-item {
          height: 30px;
          .el-form-item__content {
            height: 30px;
            .el-input {
              height: 30px;
              .el-input__inner {
                width: 240px;
                height: 30px;
                line-height: 30px;
              }
            }
            .el-form-item__error {
              margin-top: 4px;
            }
          }
        }
      }
    }
  }
}
</style>


