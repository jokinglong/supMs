<template>
    <div class="home">
        <!-- 头部 -->
        <Header></Header>
        <!-- 中间内容 -->
        <el-main>
            <!-- 主面板 -->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>系统信息</span>
                </div>
                <!-- 警告框 -->
                <el-alert
                    title="消息提示的文案"
                    type="info">
                </el-alert>
                <el-alert
                    title="成功提示的文案"
                    type="success">
                </el-alert>
                <!--  -->
                <el-row :gutter="20">
                    <el-col :span="12">
                        <!-- 左侧表格 -->
                        <el-card>
                            <!-- 面板标题 -->
                            <div slot="header" class="clearfix">
                                <span>销售排行</span>
                            </div>
                            <div class="text item">
                                <!-- 表格 -->
                                <el-table
                                    :data="tableDataLeft"
                                    style="width: 100%">
                                    <el-table-column
                                        prop="goodsname"
                                        label="商品名称"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="sales"
                                        label="销量">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="12">
                        <!-- 右侧表格 -->
                        <el-card>
                            <!-- 面板标题 -->
                            <div slot="header" class="clearfix">
                                <span>缺货的商品</span>
                            </div>
                            <div class="text item">
                                <!-- 表格 -->
                                <el-table
                                    :data="tableDataRight"
                                    style="width: 100%">
                                    <el-table-column
                                        prop="goodsname"
                                        label="商品名称">
                                    </el-table-column>
                                    <el-table-column
                                        prop="repertoryCount"
                                        label="库存">
                                    </el-table-column>
                                    <el-table-column
                                        prop="option"
                                        label="操作">
                                    </el-table-column>
                                        
                                </el-table>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-card>
            
        </el-main>
        <!--尾部 -->
        <Footer></Footer>
    </div>
</template>
<script>

// 引入头部组件和尾部组件
import Header from '@/components/Header/Header.vue'
import Footer from '@/components/Footer/Footer.vue'

export default {
    // 注册组件
    components: {
        Header,
        Footer
    },
    data() {
    return {
      // 左侧表格数据
      tableDataLeft: [
        {
          goodsname: "清扬男士去屑洗发露",
          sales: 112
        },
        {
          goodsname: "海飞丝",
          sales: 124
        },
        {
          goodsname: "欧莱雅",
          sales: 12
        },
        {
          goodsname: "自动扫地机器人",
          sales: 500
        }
      ],
      tableDataRight: [
        {
          goodsname: "暴龙太阳镜",
          repertoryCount: 1,
          option: '入库'
        },
        {
          goodsname: "婴儿手推车",
          repertoryCount: 0,
          option: '入库'
        },
        {
          goodsname: "曲屏液晶电视",
          repertoryCount: 2,
          option: '入库'
        },
        {
          goodsname: "全自动洗衣机",
          repertoryCount: 0,
          option: '入库'
        }
      ]
    };
  }
}
</script>
<style lang="less">
    .home{
        width: 100%;
        // 将盒子改为伸缩盒模型 
        display: flex; 
        // 改为纵向伸缩
        flex-direction: column;
        .el-main{
            //主体内容自动撑满
            flex: 1;
            .el-card{
                .el-card__header{
                    background-color: #f1f1f1;
                    font-size: 17px;
                    font-weight: bold;
                }
                .el-card__body{
                    .el-alert{
                        margin-bottom: 20px;
                    }
                }
            }
           
        }
    }
</style>