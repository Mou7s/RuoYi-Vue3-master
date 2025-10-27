<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="是否已发送" prop="isSend">
        <el-input
          v-model="queryParams.isSend"
          placeholder="请输入是否已发送"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建时间" prop="createtime">
        <el-date-picker clearable
          v-model="queryParams.createtime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择创建时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="源单id" prop="parentid">
        <el-input
          v-model="queryParams.parentid"
          placeholder="请输入源单id"
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
          v-hasPermi="['tk_custom:msgtowx:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['tk_custom:msgtowx:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['tk_custom:msgtowx:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['tk_custom:msgtowx:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="msgtowxList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="类型" align="center" prop="type" />
      <el-table-column label="是否已发送" align="center" prop="isSend" />
      <el-table-column label="接收人ID集合" align="center" prop="receiverIds" />
      <el-table-column label="创建时间" align="center" prop="createtime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.createtime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="源单id" align="center" prop="parentid" />
      <el-table-column label="消息内容" align="center" prop="msg" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['tk_custom:msgtowx:edit']">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['tk_custom:msgtowx:remove']">删除</el-button>
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

    <!-- 添加或修改发送到企微的消息队列对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="msgtowxRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="是否已发送" prop="isSend">
          <el-input v-model="form.isSend" placeholder="请输入是否已发送" />
        </el-form-item>
        <el-form-item label="接收人ID集合" prop="receiverIds">
          <el-input v-model="form.receiverIds" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="源单id" prop="parentid">
          <el-input v-model="form.parentid" placeholder="请输入源单id" />
        </el-form-item>
        <el-form-item label="消息内容" prop="msg">
          <el-input v-model="form.msg" type="textarea" placeholder="请输入内容" />
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

<script setup name="Msgtowx">
import { listMsgtowx, getMsgtowx, delMsgtowx, addMsgtowx, updateMsgtowx } from "@/api/tk_custom/msgtowx";

const { proxy } = getCurrentInstance();

const msgtowxList = ref([]);
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
    type: null,
    isSend: null,
    receiverIds: null,
    createtime: null,
    parentid: null,
    msg: null
  },
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询发送到企微的消息队列列表 */
function getList() {
  loading.value = true;
  listMsgtowx(queryParams.value).then(response => {
    msgtowxList.value = response.rows;
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
    type: null,
    isSend: null,
    receiverIds: null,
    createtime: null,
    parentid: null,
    msg: null
  };
  proxy.resetForm("msgtowxRef");
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
  title.value = "添加发送到企微的消息队列";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _id = row.id || ids.value
  getMsgtowx(_id).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改发送到企微的消息队列";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["msgtowxRef"].validate(valid => {
    if (valid) {
      if (form.value.id != null) {
        updateMsgtowx(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addMsgtowx(form.value).then(response => {
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
  proxy.$modal.confirm('是否确认删除发送到企微的消息队列编号为"' + _ids + '"的数据项？').then(function() {
    return delMsgtowx(_ids);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('tk_custom/msgtowx/export', {
    ...queryParams.value
  }, `msgtowx_${new Date().getTime()}.xlsx`)
}

getList();
</script>
