<template>
    <div class="index">
        <!-- 大容器 -->
        <el-container>
            <!-- 左侧 -->
            <el-aside width="200px">
                <!-- 导航组件 -->
                <Nav></Nav>
            </el-aside>
            <!-- 右侧 -->
            <el-container>
              <!-- 路由出口 -->
              <router-view></router-view>
            </el-container>
        </el-container>
    </div>
</template>
<script>
// 引入导航组件
import Nav from '@/components/Nav/Nav.vue';

export default {
    // 注册组件
    components: {
        Nav
    }
};
</script>

<style lang="less">
.index {
    height: 100%;
    .el-container {
        height: 100%;
        // 左侧边栏样式
        .el-aside {
            background-color: #2d3a4b;
            color: #333;
        }
    }
}
</style>

