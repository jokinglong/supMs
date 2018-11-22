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
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                        Admin <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item>退出登录</el-dropdown-item>
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

