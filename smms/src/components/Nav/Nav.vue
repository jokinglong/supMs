<template>
    <el-menu :default-active="$route.path" :unique-opened="true" active-text-color="rgb(64, 158, 255)" background-color="#2d3a4b" router>
        <el-submenu index='0'>
            <template slot="title"><i class="el-icon-setting"></i>系统管理</template>
            <el-menu-item  index='/'>
                <i class="el-icon-menu"></i>
                系统信息
            </el-menu-item>
        </el-submenu>
        <!-- 导航一 -->
        <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>账号管理</template>
            <el-menu-item index="/usermanage">账号管理</el-menu-item>
            <el-menu-item index="/useradd">添加账号</el-menu-item>
            <el-menu-item index="/editpassword">密码修改</el-menu-item>
        </el-submenu>
        <!-- 导航二 -->
        <el-submenu index="2">
            <template slot="title"><i class="el-icon-goods"></i>商品管理</template>
            <el-menu-item index="/goodsmanage">商品管理</el-menu-item>
            <el-menu-item index="/goodsadd">添加商品</el-menu-item>
        </el-submenu>
        <!-- 导航三 -->
        <el-submenu index="3">
            <template slot="title"><i class="el-icon-edit-outline"></i>统计管理</template>
            <el-menu-item index="/salescharts">销售统计</el-menu-item>
        </el-submenu>
    </el-menu>
</template>
<script>
export default {
}
</script>
<style lang="less">
 // 左侧导航
    .el-menu {
        border: none;
        color: #ffffff;
        .el-submenu__title {
            color: #ffffff;
        }
        .el-menu-item {
            color: #ffffff;
        }
    }
</style>
