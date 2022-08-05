<template>
  <div>
    <div class="graph-toolbar">
      <div class="toolbar-left">
        <h3>样例3</h3>
        <i class="el-icon-copy-document"></i>
      </div>
      <div class="toolbar-right">
        <el-input ref="serchInput" v-if="showSearchInput" v-model="searchNode" prefix-icon="el-icon-search" clearable @blur="blurSearch">
        </el-input>
        <div class="toolbarBtn" v-for="(item, index) in toolbarData" :key="index">
          <template v-if="item.type === 'default'">
            <el-tooltip v-if="(item.id === '1' && !showSearchInput) || item.id !== '1'" class="item" effect="dark" :content="item.content" placement="bottom">
              <el-button type="default" :icon="item.icon" @click="clickToolBtn(item.id)"></el-button>
            </el-tooltip>
          </template>
          <el-button v-else :type="item.type" :icon="item.icon" @click="clickToolBtn(item.id)">{{item.content}}</el-button>
        </div>
      </div>
    </div>
    <el-dialog title="格式化DAG" :visible.sync="showFormatDAG">
      <el-form :model="formDAG">
        <el-form-item label="布局类型">
          <el-radio-group v-model="formDAG.radioDAG" @change="changeRadioDAG">
            <el-radio :label="3">网格布局</el-radio>
            <el-radio :label="6">层次布局</el-radio>
          </el-radio-group>
        </el-form-item>
        <template v-if="formDAG.radioDAG === 3">
          <el-form-item label="行数">
            <el-input-number v-model="formDAG.rowNum"></el-input-number>
          </el-form-item>
          <el-form-item label="列数">
            <el-input-number v-model="formDAG.colNum"></el-input-number>
          </el-form-item>
        </template>
      </el-form>  
      <div slot="footer" class="dialog-footer">
        <el-button @click="showFormatDAG = false">取 消</el-button>
        <el-button type="primary" @click="onSubmitDAG">确 定</el-button>
      </div>
    </el-dialog>
    <el-drawer
      title="版本信息" 
      :show-close="false"
      :visible.sync="versionDialog" 
      direction="rtl" 
      :size="500" 
      ref="drawer">
      <el-table :data="gridData.slice((queryInfo.currentPage - 1) * queryInfo.pagesize, queryInfo.currentPage * queryInfo.pagesize)">
        <el-table-column
          v-for="(item, index) in tableSet"
          :key="index"
          :prop="item.prop"
          :label="item.label">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.row, gridData)"
              type="danger"
              icon="el-icon-delete"
              size="mini">
            </el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.row, gridData)"
              type="primary"
              icon="el-icon-info"
              size="mini"> 
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="footerBtn">
        <el-button @click="versionDialog = false">取消</el-button>
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentPage"
          :total="total"
          :current-page="queryInfo.currentPage"
          :page-size="queryInfo.pagesize">
        </el-pagination>
      </div>
    </el-drawer>
    <el-dialog title="设置DAG图名称" :visible.sync="showSetDAG">
      <el-form :model="setFormDAG">
        <el-form-item label="" prop="name">
          <el-input v-model="setFormDAG.name"></el-input>
        </el-form-item>
        <el-form-item label="" prop="desc">
          <el-input type="textarea" v-model="setFormDAG.desc"></el-input>
        </el-form-item>
        <el-form-item label="选择租户" prop="selectUser">
          <el-select v-model="setFormDAG.selectUser">
            <el-option v-for="item in selectUserOption" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="超时告警" prop="timeWarn">
          <el-switch v-model="setFormDAG.timeWarn"></el-switch>
        </el-form-item>
        <el-form-item v-if="setFormDAG.timeWarn" prop="longTimes">
          <el-input v-model.number="setFormDAG.longTimes">
            <span slot="append">分</span>
          </el-input>
        </el-form-item>
        <el-form-item label="设置全局" prop="setValue">
          <DynamicParams :schemasType="schemas" :paramsArray.sync="paramsArray"></DynamicParams>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer saveDialog">
        <div>
          <el-checkbox v-model="setFormDAG.checked">是否上线流程定义</el-checkbox>
        </div>
        <div>
          <el-button @click="showSetDAG = false">取 消</el-button>
          <el-button type="primary">添加</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import dataParams from "@/mock/paramsForm";
import DynamicParams from '../form/component/DynamicParams.vue';
export default {
  name: 'Toolbar',
  components: {
    DynamicParams
  },
  data () {
    return {
      searchNode: '',
      showSearchInput: false,
      toolbarData: [{
        id: '1',
        type: 'default',
        content: '搜索节点',
        icon: 'el-icon-search'
      }, {
        id: '2',
        type: 'default',
        content: '删除选中的线或节点',
        icon: 'el-icon-delete'
      }, {
        id: '3',
        content: '下载',
        type: 'default',
        icon: 'el-icon-download'
      }, {
        id: '4',
        type: 'default',
        content: '格式化DAG',
        icon: 'el-icon-s-operation'
      }, {
        id: '5',
        type: 'default',
        content: '全屏',
        icon: 'el-icon-full-screen'
      }, {
        id: '6',
        type: 'primary',
        content: '版本信息',
        icon: 'el-icon-info'
      }, {
        id: '7',
        type: 'primary',
        content: '保存',
        icon: ''
      }, {
        id: '8',
        type: 'primary',
        content: '关闭',
        icon: 'el-icon-switch-button'
      }],
      showFormatDAG: false,
      formDAG: {
        radioDAG: 6,
        rowNum: 0,
        colNum: 0
      },
      tableSet: [{
        label: '日历',
        prop: 'date',
        width: '100px'
      }, {
        label: '姓名',
        prop: 'name',
        width: '100px'
      }, {
        label: '地址',
        prop: 'address',
        width: ''
      }],
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      versionDialog: false,
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 1,
        currentPage: 1
      },
      total: 0,
      showSetDAG: false,
      setFormDAG: {
        name: '样例3',
        desc: '读文件转换文件格式',
        selectUser: '',
        timeWarn: false,
        longTimes: 0,
        setValue: [],
        checked: false
      },
      selectUserOption: [{
        label: 'default',
        value: 'default'
      }, {
        label: 'dolphinscheduler',
        value: 'dolphinscheduler'
        }],
      schemas: {},
      paramsArray: [],
    }
  },
  watch: {
    paramsArray: {
      immediate: true,
      deep: true,
      handler (val) {
        this.setFormDAG.setValue = val
      }
    }
  },
  mounted() {
    this.getListVersion()
    const schemas = Object.assign({}, dataParams);
    this.schemas = schemas?.shellForm;
  },
  methods: {
    changeRadioDAG () {
      this.$set(this.formDAG, 'rowNum', 0)
      this.$set(this.formDAG, 'colNum', 0)
    },
    onSubmitDAG () {
      this.showFormatDAG = false
      console.log(this.formDAG)
    },
    deleteRow(row, table) {
      console.log(row)
    },
    handleCurrentPage(val) {
      // this.queryInfo.pagesize = val
      this.queryInfo.currentPage = val;
      console.log(val)
      this.getListVersion()
    },
    getListVersion() {
      this.total = this.gridData.length
    },
    clickToolBtn (id) {
      if (id === '1') {
        this.showSearchInput = true
        this.$nextTick(() => {
          this.$refs.serchInput.focus()
        })
      } else if (id === '4') {
        this.showFormatDAG = true
      } else if (id === '6') {
        this.versionDialog = true
      } else if (id === '7') {
        this.showSetDAG = true
      } else {
        console.log(id)
      }
    },
    blurSearch () {
      this.showSearchInput = this.searchNode === '' ? false : true
    },
  }
}
</script>

<style lang="scss" scoped>
.graph-toolbar {
  width: 100%;
  height: 50px;
  background-color: #fff;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  .toolbar-left {
    h3 {
      display: inline-block;
      font-size: 14px;
      font-weight: 700;
    }
    i {
      margin-left: 20px;
    }
  }
  .toolbar-right {
    display: flex;
    align-items: center;
    .toolbarBtn {
      margin-left: 10px;
    }
    .el-button--default {
      border: 0px;
      padding: 12px 10px;
    }
    .el-button--primary {
      padding: 7px 10px;
    }
  }
}
::v-deep .el-drawer__header {
  border-bottom: 1px solid #dcdedc;
  padding: 20px;
}
::v-deep .el-drawer__body {
  padding: 0px 15px;
}
::v-deep .el-dialog__header {
  border-bottom: 1px solid #dcdedc;
  padding: 20px;
}
.footerBtn {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  border-top: 1px solid #dcdedc;
  height: 60px;
  line-height: 60px;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 20px;
  .el-button {
    z-index: 9;
  }
}
::v-deep .el-pagination {
  margin-top: 30px;
}
.saveDialog {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #dcdedc;
  padding-top: 10px;
}
</style>