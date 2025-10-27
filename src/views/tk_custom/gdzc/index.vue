<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="卡片编码" prop="kpBm">
        <el-input
          v-model="queryParams.kpBm"
          placeholder="请输入卡片编码"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="资产编码" prop="zcBm">
        <el-input
          v-model="queryParams.zcBm"
          placeholder="请输入资产编码"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="资产名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入资产名称"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="规格型号" prop="ggxh">
        <el-input
          v-model="queryParams.ggxh"
          placeholder="请输入规格型号"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="资产位置" prop="zcLocation">
        <el-input
          v-model="queryParams.zcLocation"
          placeholder="请输入资产位置"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="使用部门" prop="useDept">
        <el-input
          v-model="queryParams.useDept"
          placeholder="请输入使用部门"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="盘点日期" prop="pddate">
        <el-input
          v-model="queryParams.pddate"
          placeholder="请输入盘点日期"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建人" prop="creator">
        <el-input
          v-model="queryParams.creator"
          placeholder="请输入创建人"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="盘点数量" prop="number">
        <el-input
          v-model="queryParams.number"
          placeholder="请输入盘点数量"
          clearable
          @keyup.enter="handleQuery"
        />
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
          v-hasPermi="['tk_custom:gdzc:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['tk_custom:gdzc:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['tk_custom:gdzc:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['tk_custom:gdzc:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="gdzcList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="卡片编码" align="center" prop="kpBm" />
      <el-table-column label="资产编码" align="center" prop="zcBm" />
      <el-table-column label="资产名称" align="center" prop="name" />
      <el-table-column label="规格型号" align="center" prop="ggxh" />
      <el-table-column label="资产位置" align="center" prop="zcLocation" />
      <el-table-column label="使用部门" align="center" prop="useDept" />
      <el-table-column label="盘点日期" align="center" prop="pddate" />
      <el-table-column label="创建人" align="center" prop="creator" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="盘点数量" align="center" prop="number" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['tk_custom:gdzc:edit']">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['tk_custom:gdzc:remove']">删除</el-button>
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

    <!-- 添加或修改固定资产盘点对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="gdzcRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="卡片编码" prop="kpBm">
          <el-input v-model="form.kpBm" placeholder="请输入卡片编码" />
        </el-form-item>
        <el-form-item label="资产编码" prop="zcBm">
          <el-input v-model="form.zcBm" placeholder="请输入资产编码" />
        </el-form-item>
        <el-form-item label="资产名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入资产名称" />
        </el-form-item>
        <el-form-item label="规格型号" prop="ggxh">
          <el-input v-model="form.ggxh" placeholder="请输入规格型号" />
        </el-form-item>
        <el-form-item label="资产位置" prop="zcLocation">
          <el-input v-model="form.zcLocation" placeholder="请输入资产位置" />
        </el-form-item>
        <el-form-item label="使用部门" prop="useDept">
          <el-input v-model="form.useDept" placeholder="请输入使用部门" />
        </el-form-item>
        <el-form-item label="盘点日期" prop="pddate">
          <el-input v-model="form.pddate" placeholder="请输入盘点日期" />
        </el-form-item>
        <el-form-item label="创建人" prop="creator">
          <el-input v-model="form.creator" placeholder="请输入创建人" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="盘点数量" prop="number">
          <el-input v-model="form.number" placeholder="请输入盘点数量" />
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

<script setup name="Gdzc">
import { listGdzc, getGdzc, delGdzc, addGdzc, updateGdzc } from "@/api/tk_custom/gdzc";

const { proxy } = getCurrentInstance();

const gdzcList = ref([]);
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
    kpBm: null,
    zcBm: null,
    name: null,
    ggxh: null,
    zcLocation: null,
    useDept: null,
    pddate: null,
    creator: null,
    number: null
  },
  rules: {
    kpBm: [
      { required: true, message: "卡片编码不能为空", trigger: "blur" }
    ],
    zcBm: [
      { required: true, message: "资产编码不能为空", trigger: "blur" }
    ],
    name: [
      { required: true, message: "资产名称不能为空", trigger: "blur" }
    ],
    ggxh: [
      { required: true, message: "规格型号不能为空", trigger: "blur" }
    ],
    zcLocation: [
      { required: true, message: "资产位置不能为空", trigger: "blur" }
    ],
    useDept: [
      { required: true, message: "使用部门不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询固定资产盘点列表 */
function getList() {
  loading.value = true;
  listGdzc(queryParams.value).then(response => {
    gdzcList.value = response.rows;
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
    kpBm: null,
    zcBm: null,
    name: null,
    ggxh: null,
    zcLocation: null,
    useDept: null,
    pddate: null,
    creator: null,
    remark: null,
    number: null
  };
  proxy.resetForm("gdzcRef");
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
  title.value = "添加固定资产盘点";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _id = row.id || ids.value
  getGdzc(_id).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改固定资产盘点";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["gdzcRef"].validate(valid => {
    if (valid) {
      if (form.value.id != null) {
        updateGdzc(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addGdzc(form.value).then(response => {
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
  proxy.$modal.confirm('是否确认删除固定资产盘点编号为"' + _ids + '"的数据项？').then(function() {
    return delGdzc(_ids);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('tk_custom/gdzc/export', {
    ...queryParams.value
  }, `gdzc_${new Date().getTime()}.xlsx`)
}

getList();
</script>
