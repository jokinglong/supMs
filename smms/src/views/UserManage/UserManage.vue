<template>
    <div class="usermanage">
        <!-- 头部 -->
        <Header></Header>
        <!-- 主体内容 -->
        <el-main>
            <el-card class="box-card">
                <!-- 主面板标题 -->
                <div slot="header" class="clearfix">
                    <span>账户管理</span>
                </div>
                <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">

                    <el-table-column type="selection">
                    </el-table-column>

                    <el-table-column prop="username" label="用户名">
                    </el-table-column>

                    <el-table-column prop="usergroup" label="用户分组" show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column label="日期">
                        <template slot-scope="scope">{{ scope.row.cdate | filterCdate }}</template>
                    </el-table-column>

                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.row.id)">
                                <i class="el-icon-edit"></i>编辑</el-button>
                            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">
                                <i class="el-icon-delete"></i>删除</el-button>
                        </template>
                    </el-table-column>

                </el-table>
                <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible">
                    <el-form :model="editform" status-icon :rules="edituerrules" ref="adduserform" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="用户" prop="username">
                            <el-input type="text" v-model="editform.username" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="密码" prop="password">
                            <el-input type="text" v-model="editform.password" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="确认密码" prop="checkPass">
                            <el-input type="text" v-model="editform.checkPass"></el-input>
                        </el-form-item>

                        <!-- 选择用户组 -->
                        <el-form-item label="请选择分组" prop="usergroup">
                            <el-select v-model="editform.usergroup" placeholder="请选择用户分组">
                                <el-option label="超级管理员" value="超级管理员"></el-option>
                                <el-option label="普通用户" value="普通用户"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>

                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="handleEditConfirm">确 定</el-button>
                    </div>
                </el-dialog>

            </el-card>
        </el-main>
        <!-- 尾部 -->
        <Footer></Footer>
    </div>
</template>
<script>
// 引入moment处理时间格式
import moment from "moment";

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
      } else if (value !== this.editform.password) {
        // 一致性验证
        // 密码不一致的回调
        callback(new Error("两次密码不一致"));
      } else {
        // 成功提示（绿色勾勾）
        callback();
      }
    };
    return {
      tableData: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      // 登录表单数据对象
      editform: {
        username: "",
        password: "",
        checkPass: "",
        usergroup: ""
      },
      // 表单验证
      edituerrules: {
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
      },
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(id) {
      //发送一个查询数据的请求
      this.axios.get(`http://127.0.0.1:3333/users/finduser?id=${id}`).then(response => {
        this.editform.username = response.data[0].username;
        this.editform.password = response.data[0].password;
        this.editform.usergroup = response.data[0].usergroup;
      }) 
       this.dialogFormVisible = true;
    },
    handleEditConfirm(){
      //发送一个修改数据的请求 


      this.dialogFormVisible = false;
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "友情提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          // 向后台发送一个请求并将id发给后台
          this.axios
            .get(`http://127.0.0.1:3333/users/deluser?id=${id}`)
            .then(response => {
              if (response.data.rstCode === 1) {
                // 删除成功显示提示信息
                this.$message({
                  type: "success",
                  message: response.data.msg
                });
                // 然后调用数据请求函数，刷新页面
                this.getUserData();
              } else {
                // 删除失败，提示失败信息
                this.$message.error(respnse.data.msg);
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //封装一个函数请求所有的用户数据
    getUserData() {
      //   向后台发送请求
      this.axios.get("http://127.0.0.1:3333/users/userlist").then(response => {
        this.tableData = response.data;
      });
    }
  },
  // 定义一个生命周期钩子函数（作用：只要进入组件就会触发这个函数，适合用于请求数据）
  created() {
    // 引用请求数据函数
    this.getUserData();
  },
  // 设置过滤器
  filters: {
    filterCdate(value) {
      return moment(value).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  // 确认修改
  sumbit(formName) {
    // 获取整个表单
    this.$refs[formName].validate(valid => {
      // 如果表单所有的内容都合法，就提交
      if (valid) {
        // 定义一个对象保存表单数据
        const usersdata = {
          username: this.editform.username,
      
          usergroup: this.editform.usergroup
        };
        // 发送ajax请求  把数据发送给后端
        this.axios
          .post(
            "http://127.0.0.1:3333/users/useredit",
            qs.stringify(usersdata),
            {
              headers: { "Content-Type": "application/x-www-form-urlencoded" }
            }
          )
          .then(response => {
            // // 如果请求成功
            // if (response.data.rstCode === 1) {
            //   // 弹出提示信息
            //   this.$message({
            //     type: "success",
            //     message: response.data.msg
            //   });
            //   // 跳到账号管理列表页面
            //   this.$router.push("/usermanage");
            // } else {
            //   // 弹出账号添加失败信息
            //   this.$message.error(response.data.msg);
            // }
            console.log(response.data)
          });
      } else {
        // 如果表单中有任何一项不合法，就验证失败，并输出提示
        console.log("前端验证失败，请检查填写的信息");
        return false;
      }
    });
    
  }
};
</script>
<style lang="less">
.usermanage {
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
      .el-dialog__wrapper{
          .el-dialog{
              .el-dialog__body{
                  .el-form{
                      width: 400px;
                  }
              }
          }
      }
    }
  }
}
</style>


