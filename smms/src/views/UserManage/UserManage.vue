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
        <el-table ref="userlist" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">

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
              <el-button size="mini" type="primary" @click="handleEdit(scope.row.id)">
                <i class="el-icon-edit"></i>编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">
                <i class="el-icon-delete"></i>删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 批量删除 -->
        <div style="margin-top: 20px">
          <el-button type="danger" @click="batchDel">批量删除</el-button>
          <el-button @click="toggleSelection">取消选择</el-button>
        </div>

        <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible" width="40%">
          <el-form :model="editform" status-icon :rules="edituerrules" ref="editform" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户" prop="username">
              <el-input type="text" v-model="editform.username" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input type="text" v-model="editform.password" autocomplete="off"></el-input>
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
            <el-button type="primary" @click="submitForm('editform')">确 定</el-button>
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
// 引入qs模块处理axios放post方式请求参数
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
    return {
      tableData: [],
      seletedUsers: [],
      editId: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      // 登录表单数据对象
      editform: {
        username: "",
        password: "",
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
        usergroup: [
          { required: true, message: "请选择用户分组", trigger: "change" } // 非空验证
        ]
      }
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.seletedUsers = val;
    },
    toggleSelection() {
      // 取消选择
      this.$refs.userlist.clearSelection();
    },
    handleEdit(id) {
      this.editId = id;
      //发送一个查询数据的请求
      this.axios
        .get(`http://127.0.0.1:3333/users/finduser?id=${id}`)
        .then(response => {
          this.editform.username = response.data[0].username;
          this.editform.password = response.data[0].password;
          this.editform.usergroup = response.data[0].usergroup;
        });
      this.dialogFormVisible = true;
    },
    // 确认修改
    submitForm(formName) {
      // 获取整个表单
      this.$refs[formName].validate(valid => {
        // 如果表单所有的内容都合法，就提交
        if (valid) {
          // 定义一个对象保存表单数据
          const usersdata = {
            username: this.editform.username,
            password: this.editform.password,
            usergroup: this.editform.usergroup,
            editid: this.editId
          };
          // 发送ajax请求  把数据发送给后端
          this.axios
            .post(
              "http://127.0.0.1:3333/users/saveedit",
              qs.stringify(usersdata),
              {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
              }
            )
            .then(response => {
              // 如果请求成功
              if (response.data.rstCode === 1) {
                // 弹出提示信息
                this.$message({
                  type: "success",
                  message: response.data.msg
                });
                // 刷新页面
                this.getUserData();
              } else {
                // 弹出账号添加失败信息
                this.$message.error(response.data.msg);
              }
            });
          this.dialogFormVisible = false;
        } else {
          // 如果表单中有任何一项不合法，就验证失败，并输出提示
          console.log("前端验证失败，请检查填写的信息");
          return false;
        }
      });
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
    // 批量删除函数
    batchDel() {
      // 获取需要批量删除的数据中的id
      let idArr = this.seletedUsers.map(v => v.id); //map遍历的es6写法
      // 先进行判断是否有选中数据，如果没有就显示提示，然后直接返回
      if (!idArr.length) {
        this.$message.error("请先选择数据，没有数据怎么操作，你这大傻子！！！");
        return;
      }
      // 定义变量保存数据
      let idData = {
        // 将数据转为字符串方便后端接收
        idArr: JSON.stringify(idArr)
      };

      // 发送请求，发送数据给后端
      this.axios.post(
        "http://127.0.0.1:3333/users/batchdel",
        qs.stringify(idData),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
      ).then(response => {
        if(response.data.rstCode === 1){
          this.$message({
            type:'success',
            message:response.data.msg
          })
          // 删除成功后刷新页面
          this.getUserData();
        }else{
          this.$message.error(response.data.msg)
        }
      })
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

  resetForm(formName) {
    this.$refs[formName].resetFields();
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
      .el-dialog__wrapper {
        .el-dialog {
          .el-dialog__header {
            font-weight: bold;
          }
          .el-dialog__body {
            .el-form {
              width: 70%;
            }
          }
        }
      }
    }
  }
}
</style>


