<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="物料编码" prop="mertiralid">
        <el-input
          v-model="queryParams.mertiralid"
          placeholder="请输入物料编码"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="物料名称" prop="mertiralname">
        <el-input
          v-model="queryParams.mertiralname"
          placeholder="请输入物料名称"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="封装" prop="fengzhuang">
        <el-input
          v-model="queryParams.fengzhuang"
          placeholder="请输入封装"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="印字" prop="yinzi">
        <el-input
          v-model="queryParams.yinzi"
          placeholder="请输入印字"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="库位" prop="kuwei">
        <el-input
          v-model="queryParams.kuwei"
          placeholder="请输入库位"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="数量" prop="number">
        <el-input
          v-model="queryParams.number"
          placeholder="请输入数量"
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
          v-hasPermi="['tk_custom:pd_ck:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['tk_custom:pd_ck:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['tk_custom:pd_ck:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['tk_custom:pd_ck:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="pd_ckList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="物料编码" align="center" prop="mertiralid" />
      <el-table-column label="物料名称" align="center" prop="mertiralname" />
      <el-table-column label="封装" align="center" prop="fengzhuang" />
      <el-table-column label="印字" align="center" prop="yinzi" />
      <el-table-column label="库位" align="center" prop="kuwei" />
      <el-table-column label="数量" align="center" prop="number" />
      <el-table-column label="盘点日期" align="center" prop="pddate" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['tk_custom:pd_ck:edit']">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['tk_custom:pd_ck:remove']">删除</el-button>
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

    <!-- 添加或修改盘点_仓库对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="pd_ckRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="物料编码" prop="mertiralid">
          <el-input v-model="form.mertiralid" placeholder="请输入物料编码" />
        </el-form-item>
        <el-form-item label="物料名称" prop="mertiralname">
          <el-input v-model="form.mertiralname" placeholder="请输入物料名称" />
        </el-form-item>
        <el-form-item label="封装" prop="fengzhuang">
          <el-input v-model="form.fengzhuang" placeholder="请输入封装" />
        </el-form-item>
        <el-form-item label="印字" prop="yinzi">
          <el-input v-model="form.yinzi" placeholder="请输入印字" />
        </el-form-item>
        <el-form-item label="库位" prop="kuwei">
          <!--todo-->
          <el-input v-model="form.kuwei" placeholder="请输入库位" />
        </el-form-item>
        <el-form-item label="数量" prop="number">
          <el-input v-model="form.number" placeholder="请输入数量" />
        </el-form-item>
        <el-form-item label="盘点日期" prop="pddate">
          <el-input v-model="form.pddate" placeholder="请输入盘点日期" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" v-if="!saving" @click="submitForm">确 定</el-button>
          <el-button type="warning" v-if="saving">保存中...</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Pd_ck">
import { listPd_ck, getPd_ck, delPd_ck, addPd_ck, updatePd_ck } from "@/api/tk_custom/pd_ck";

const { proxy } = getCurrentInstance();

const pd_ckList = ref([]);
const open = ref(false);
const loading = ref(true);
const saving = ref(false);
const showSearch = ref(false);
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
    mertiralid: null,
    mertiralname: null,
    fengzhuang: null,
    yinzi: null,
    kuwei: null,
    number: null,
    pddate: null,
  },
  rules: {
    mertiralid: [
      { required: true, message: "物料编码不能为空", trigger: "blur" }
    ],
    mertiralname: [
      { required: true, message: "物料名称不能为空", trigger: "blur" }
    ],
    fengzhuang: [
      { required: true, message: "封装不能为空", trigger: "blur" }
    ],
    yinzi: [
      { required: true, message: "印字不能为空", trigger: "blur" }
    ],
    kuwei: [
      { required: true, message: "库位不能为空", trigger: "blur" }
    ],
    number: [
      { required: true, message: "数量不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询盘点_仓库列表 */
function getList() {
  loading.value = true;
  listPd_ck(queryParams.value).then(response => {
    pd_ckList.value = response.rows;
    total.value = response.total;
  }).finally(response=>{
      loading.value = false;
  });;
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
    mertiralid: null,
    mertiralname: null,
    fengzhuang: null,
    yinzi: null,
    kuwei: null,
    number: null,
    pddate: null,
    remark: null
  };
  proxy.resetForm("pd_ckRef");
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
  title.value = "添加盘点_仓库";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _id = row.id || ids.value
  getPd_ck(_id).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改盘点_仓库";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["pd_ckRef"].validate(valid => {
    if (valid) {
        saving.value=true;
      if (form.value.id != null) {
        updatePd_ck(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        }).finally(response=>{
            saving.value=false;
        });
      } else {
        addPd_ck(form.value).then(response => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        }).finally(response=>{
            saving.value=false;
        });;
      }
    }
  });
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _ids = row.id || ids.value;
  proxy.$modal.confirm('是否确认删除盘点_仓库编号为"' + _ids + '"的数据项？').then(function() {
    return delPd_ck(_ids);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('tk_custom/pd_ck/export', {
    ...queryParams.value
  }, `pd_ck_${new Date().getTime()}.xlsx`)
}

getList();
</script>
