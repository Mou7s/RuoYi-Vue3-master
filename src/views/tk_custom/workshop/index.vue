<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryRef"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="姓名" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入姓名"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="部门" prop="dept">
        <el-input
          v-model="queryParams.dept"
          placeholder="请输入部门"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="申请时间" prop="requesttime">
        <el-date-picker
          clearable
          v-model="queryParams.requesttime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择申请时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="登记理由" prop="reason">
        <el-input
          v-model="queryParams.reason"
          placeholder="请输入登记理由"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="结束时间" prop="outtime">
        <el-date-picker
          clearable
          v-model="queryParams.outtime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择结束时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery"
          >搜索</el-button
        >
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
          v-hasPermi="['tk_custom:workshop:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['tk_custom:workshop:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['tk_custom:workshop:remove']"
          >删除</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['tk_custom:workshop:export']"
          >导出</el-button
        >
      </el-col>
      <right-toolbar
        v-model:showSearch="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="workshopList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="姓名" align="center" prop="name" />
      <el-table-column label="部门" align="center" prop="dept" />
      <el-table-column
        label="申请时间"
        align="center"
        prop="requesttime"
        width="180"
      >
        <template #default="scope">
          <span>{{ parseTime(scope.row.requesttime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="登记理由" align="center" prop="reason" />
      <el-table-column
        label="结束时间"
        align="center"
        prop="outtime"
        width="180"
      >
        <template #default="scope">
          <span>{{ parseTime(scope.row.outtime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template #default="scope">
          <el-button
            link
            type="primary"
            icon="Edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['tk_custom:workshop:edit']"
            >修改</el-button
          >
          <el-button
            link
            type="primary"
            icon="Delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['tk_custom:workshop:remove']"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改扫码登记（车间）对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form
        ref="workshopRef"
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="部门" prop="dept">
          <el-input v-model="form.dept" placeholder="请输入部门" />
        </el-form-item>
        <el-form-item label="申请时间" prop="requesttime">
          <el-date-picker
            clearable
            v-model="form.requesttime"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择申请时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="登记理由" prop="reason">
          <el-input v-model="form.reason" placeholder="请输入登记理由" />
        </el-form-item>
        <el-form-item label="结束时间" prop="outtime">
          <el-date-picker
            clearable
            v-model="form.outtime"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择结束时间"
          >
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

<script setup name="Workshop">
import {
  listWorkshop,
  getWorkshop,
  delWorkshop,
  addWorkshop,
  updateWorkshop,
} from "@/api/tk_custom/workshop";

const { proxy } = getCurrentInstance();

const workshopList = ref([]);
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
    name: null,
    dept: null,
    requesttime: null,
    reason: null,
    outtime: null,
  },
  rules: {
    name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
    reason: [{ required: true, message: "登记理由不能为空", trigger: "blur" }],
  },
});

const { queryParams, form, rules } = toRefs(data);

/** 查询扫码登记（车间）列表 */
function getList() {
  loading.value = true;
  listWorkshop(queryParams.value).then((response) => {
    workshopList.value = response.rows;
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
    name: null,
    dept: null,
    requesttime: null,
    reason: null,
    outtime: null,
  };
  proxy.resetForm("workshopRef");
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
  ids.value = selection.map((item) => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加扫码登记（车间）";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _id = row.id || ids.value;
  getWorkshop(_id).then((response) => {
    form.value = response.data;
    open.value = true;
    title.value = "修改扫码登记（车间）";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["workshopRef"].validate((valid) => {
    if (valid) {
      if (form.value.id != null) {
        updateWorkshop(form.value).then((response) => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addWorkshop(form.value).then((response) => {
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
  proxy.$modal
    .confirm('是否确认删除扫码登记（车间）编号为"' + _ids + '"的数据项？')
    .then(function () {
      return delWorkshop(_ids);
    })
    .then(() => {
      getList();
      proxy.$modal.msgSuccess("删除成功");
    })
    .catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download(
    "tk_custom/workshop/export",
    {
      ...queryParams.value,
    },
    `workshop_${new Date().getTime()}.xlsx`,
  );
}

getList();
</script>
