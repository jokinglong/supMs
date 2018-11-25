<template>
    <div class="header">
        <el-header>
            <h1 class="title">
                <i class="el-icon-menu"></i>                
                华联超市管理系统
            </h1>
            <!-- 当前登录用户名 -->
            <div class="username">
                <!-- 下拉框 -->
                <el-dropdown trigger="click"  @command="handleCommand">
                    <span class="el-dropdown-link">
                        Admin <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="personal">个人中心</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <div class="avatar">
                    <img style="border-radius: 50%;" width="50px" height="50px" src="./avatar.jpg" alt="">
                </div>
            </div>
        </el-header>
    </div>
</template>
<script>
export default {
     methods: {
        // 点击下拉框中选项触发函数
        handleCommand (command) {
            if(command === 'personal'){
                // 点击个人中心选项，直接跳转到个人中心页面
                this.$router.push('/personal')
            }else if(command === 'logout'){
                // 点击退出登录选项，向后台发送请求，删除cookie
                this.axios.get('http://127.0.0.1:3333/users/logout').then(response => {
                    if(response.data.rstCode === 1){
                        // 如果退出登录成功，显示提示信息
                        this.$message({
                            type:'success',
                            message:response.data.msg
                        })
                        // 弹出提示后，一秒后跳转到登录页面
                        setTimeout(() => {
                            this.$router.push('/login')
                        },1000)
                    }
                })
                
            }
        }
    }
}
</script>
<style lang="less">
    .header {
      
        // 头
       .el-header {
      
           position: relative;
           height: 60px;
           line-height: 60px;
           background-color: #ffffff;
           text-align: right;
           border-bottom: 1px solid rgba(0, 0, 0, 0.1);
           .title {
               margin: 0;
               position: absolute;
               height: 60px;
               line-height: 60px;
           }
           .username {
               vertical-align: top;
               display: inline-block;
               height: 60px;
               line-height: 60px;
               margin-right: 20px;
               .avatar {
                   vertical-align: top;
                   margin-top: 5px;
                   display: inline-block;
                   margin-left: 10px;
                   height: 50px;
                   line-height: 50px;
                   border-radius: 50%;
                   text-align: center;
                   background-color: red;
               }
           }
       }
    }
</style>

