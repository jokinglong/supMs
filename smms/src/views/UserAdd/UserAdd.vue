<template>
    <div class="useradd">
        <!-- 头部 -->
        <Header></Header>
        <!-- 主体内容 -->
        <el-main>
            添加用户
        </el-main>
        <!-- 尾部 -->
        <Footer></Footer>
    </div>
</template>
<script>
// 引入头部组件和尾部组件
import Header from '@/components/Header/Header.vue'
import Footer from '@/components/Footer/Footer.vue'
export default {
    components: {
        Header,
        Footer
    }
}
</script>
<style lang="less">
    .useradd{
        width: 100%;
        // 将盒子改为伸缩盒模型 
        display: flex; 
        // 改为纵向伸缩
        flex-direction: column;
        .el-main{
            //主体内容自动撑满
            flex: 1;
        }
    }
</style>


