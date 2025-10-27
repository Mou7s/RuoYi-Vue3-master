<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="销售出/退库单号" prop="kdBillno">
        <el-input
          v-model="queryParams.kdBillno"
          placeholder="请输入销售出/退库单号"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
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
      <el-form-item label="出库时间" prop="kdChukuTime">
        <el-date-picker clearable
          v-model="queryParams.kdChukuTime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择出库时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="同步时间" prop="syncTime">
        <el-date-picker clearable
          v-model="queryParams.syncTime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择同步时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Plus"
          @click="handleAdd"
          v-hasPermi="['tk_custom:kucun:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['tk_custom:kucun:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['tk_custom:kucun:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['tk_custom:kucun:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="kucunList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="销售出/退库单号" align="center" prop="kdBillno" />
      <el-table-column label="物料编码" align="center" prop="kdWlbm" />
      <el-table-column label="物料名称" align="center" prop="kdWumc" />
      <el-table-column label="规格型号" align="center" prop="kdGgxh" />
      <el-table-column label="仓库" align="center" prop="kdCangkuName" />
      <el-table-column label="库位" align="center" prop="kdKuweiName" />
      <el-table-column label="出库数量" align="center" prop="kdChukuNumber" />
      <el-table-column label="出库时间" align="center" prop="kdChukuTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.kdChukuTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="同步时间" align="center" prop="syncTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.syncTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['tk_custom:kucun:edit']">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['tk_custom:kucun:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改金蝶库存查询对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="kucunRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="销售出/退库单号" prop="kdBillno">
          <el-input v-model="form.kdBillno" placeholder="请输入销售出/退库单号" />
        </el-form-item>
        <el-form-item label="物料编码" prop="kdWlbm">
          <el-input v-model="form.kdWlbm" placeholder="请输入物料编码" />
        </el-form-item>
        <el-form-item label="物料名称" prop="kdWumc">
          <el-input v-model="form.kdWumc" placeholder="请输入物料名称" />
        </el-form-item>
        <el-form-item label="规格型号" prop="kdGgxh">
          <el-input v-model="form.kdGgxh" placeholder="请输入规格型号" />
        </el-form-item>
        <el-form-item label="仓库id" prop="kdCangkuId">
          <el-input v-model="form.kdCangkuId" placeholder="请输入仓库id" />
        </el-form-item>
        <el-form-item label="仓库" prop="kdCangkuName">
          <el-input v-model="form.kdCangkuName" placeholder="请输入仓库" />
        </el-form-item>
        <el-form-item label="库位id" prop="kdKuweiId">
          <el-input v-model="form.kdKuweiId" placeholder="请输入库位id" />
        </el-form-item>
        <el-form-item label="库位" prop="kdKuweiName">
          <el-input v-model="form.kdKuweiName" placeholder="请输入库位" />
        </el-form-item>
        <el-form-item label="出库数量" prop="kdChukuNumber">
          <el-input v-model="form.kdChukuNumber" placeholder="请输入出库数量" />
        </el-form-item>
        <el-form-item label="出库时间" prop="kdChukuTime">
          <el-date-picker clearable
            v-model="form.kdChukuTime"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择出库时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="同步时间" prop="syncTime">
          <el-date-picker clearable
            v-model="form.syncTime"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择同步时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Kucun">
import { listKucun, getKucun, delKucun, addKucun, updateKucun } from "@/api/tk_custom/kucun";

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

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
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
  listKucun(queryParams.value).then(response => {
    kucunList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}

// 取消按钮
function cancel() {
  open.value = false;
  reset();
}

// 表单重置
function reset() {
  form.value = {
    id: null,
    kdBillno: null,
    kdWlbm: null,
    kdWumc: null,
    kdGgxh: null,
    kdCangkuId: null,
    kdCangkuName: null,
    kdKuweiId: null,
    kdKuweiName: null,
    kdChukuNumber: null,
    kdChukuTime: null,
    syncTime: null
  };
  proxy.resetForm("kucunRef");
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}

// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加金蝶库存查询";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _id = row.id || ids.value
  getKucun(_id).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改金蝶库存查询";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["kucunRef"].validate(valid => {
    if (valid) {
      if (form.value.id != null) {
        updateKucun(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addKucun(form.value).then(response => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _ids = row.id || ids.value;
  proxy.$modal.confirm('是否确认删除金蝶库存查询编号为"' + _ids + '"的数据项？').then(function() {
    return delKucun(_ids);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('tk_custom/kucun/export', {
    ...queryParams.value
  }, `kucun_${new Date().getTime()}.xlsx`)
}

getList();
</script>
