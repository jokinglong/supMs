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
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">

                    <el-table-column
                    type="selection"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="username"
                    label="用户名"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="usergroup"
                    label="用户分组"
                    show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                    label="日期"
                    >
                    <template slot-scope="scope">{{ scope.row.cdate }}</template>
                    </el-table-column>

                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i>编辑</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i>删除</el-button>
                        </template>
                    </el-table-column>   

                </el-table>
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
  },
  data() {
      return {
        tableData: [{
            username: '王小二',
            usergroup: '超级管理员',
            cdate: '2018-11-23'
        }]
      }
    },
  methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleEdit() {
        console.log('修改当前用户');
      },
      handleDelete() {
        console.log('删除当前用户');
      }
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
        }
    }
    }
</style>


