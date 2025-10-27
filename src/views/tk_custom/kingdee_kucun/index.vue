<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
        <el-form-item label="物料编码" prop="kdWlbm">
          <el-input
                  v-model="queryParams.kdWlbm"
                  placeholder="请输入物料编码"
                  clearable
                  @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item label="物料名称" prop="kdWumc">
          <el-input
                  v-model="queryParams.kdWumc"
                  placeholder="请输入物料名称"
                  clearable
                  @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item label="规格型号" prop="kdGgxh">
          <el-input
                  v-model="queryParams.kdGgxh"
                  placeholder="请输入规格型号"
                  clearable
                  @keyup.enter="handleQuery"
          />
        </el-form-item>

      <el-form-item label="仓库" prop="kdCangkuName">
        <el-input
          v-model="queryParams.kdCangkuName"
          placeholder="请输入仓库"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="库位" prop="kdKuweiName">
        <el-input
          v-model="queryParams.kdKuweiName"
          placeholder="请输入库位"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button type="warning" icon="Refresh" @click="resetQuery">重置查询条件</el-button>
        <el-button type="info" @click="handleExport">导出excel</el-button>
      </el-form-item>
    </el-form>


    <el-table v-loading="loading" :data="kucunList" @selection-change="handleSelectionChange" style=" height:calc(100vh - 293px)">
      <el-table-column label="物料编码" align="center" prop="kdWlbm" />
      <el-table-column label="物料名称" align="center" prop="kdWumc" />
      <el-table-column label="规格型号" align="center" prop="kdGgxh" />
      <el-table-column label="仓库" align="center" prop="kdCangkuName" />
      <el-table-column label="库位" align="center" prop="kdKuweiName" />
      <el-table-column label="库存数量(K)" align="center" prop="kdChukuNumber" />
    </el-table>
    <div style="    color: royalblue;font-size: 20px;font-weight: 900;">
     D栋仓库库存统计：{{totalKucun}}
    </div>
    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

  </div>
</template>

<script setup name="kingdee_kucun">
import { listKucun_sum,list_sum_total } from "@/api/tk_custom/kucun";

const { proxy } = getCurrentInstance();

const kucunList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");
const totalKucun=ref(0);
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 100,
    kdBillno: null,
    kdWlbm: null,
    kdWumc: null,
    kdGgxh: null,
    kdCangkuName: null,
    kdKuweiName: null,
    kdChukuTime: null,
    syncTime: null
  },
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询金蝶库存查询列表 */
function getList() {
  loading.value = true;
    listKucun_sum(queryParams.value).then(response => {
    kucunList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
    list_sum_total(queryParams.value).then(response => {
        var str="";
        str+="累计入库数量："+response.xsch+"\t；";
        str+="累计出库数量："+response.xsth*-1+"\t；";
        str+="现有库存数量："+response.total+"\t；";
        totalKucun.value=str;
    });
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
/** 导出按钮操作 */
function handleExport() {
  proxy.download('tk_custom/kucun/export1', {
    ...queryParams.value
  }, `库存_${new Date().getTime()}.xlsx`)
}
/** 重置按钮操作 */
function resetQuery() {
    proxy.resetForm("queryRef");
    handleQuery();
}
getList();
</script>
