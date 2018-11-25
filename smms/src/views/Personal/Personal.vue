<template>
    <div class="personal">
        <!-- 头部 -->
        <Header></Header>
        <!-- 主体内容 -->
        <el-main>
            <el-card class="box-card">
                <!-- 主面板标题 -->
                <div slot="header" class="clearfix">
                    <span>个人中心</span>
                </div>         
            </el-card>
        </el-main>
        <!-- 尾部 -->
        <Footer></Footer>
    </div>
</template>
<script>
// 引入头部组件和尾部组件
import Header from "@/components/Header/Header.vue";
import Footer from "@/components/Footer/Footer.vue";
export default {
  components: {
    Header,
    Footer
  }
};
</script>
<style lang="less">
.personal {
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
    }
  }
}
</style>


