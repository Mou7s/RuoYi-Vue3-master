<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="入厂时间"  style="width: 240px" prop="vDate">
        <el-date-picker clearable
          v-model="queryParams.vDate"
          type="datetime"
          value-format="YYYY-MM-DD HH:mm:ss"
          placeholder="请选择入厂时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="访客姓名" prop="vName">
        <el-input
          v-model="queryParams.vName"
          placeholder="请输入访客姓名"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手机号码" prop="vTelephone">
        <el-input
          v-model="queryParams.vTelephone"
          placeholder="请输入手机号码"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="身份证号码" prop="vCardid">
        <el-input
          v-model="queryParams.vCardid"
          placeholder="请输入身份证号码"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="来访事由" prop="vReason">
        <el-input
          v-model="queryParams.vReason"
          placeholder="请输入来访事由"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="被访人" prop="receiver">
        <el-input
          v-model="queryParams.receiver"
          placeholder="请输入被访人"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="车牌号码" prop="carNumber">
        <el-input
          v-model="queryParams.carNumber"
          placeholder="请输入车牌号码"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="来访公司" prop="company">
        <el-input
          v-model="queryParams.company"
          placeholder="请输入来访公司"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审核" prop="approve">
        <el-select
                v-model="queryParams.approve"
                clearable
                style="width: 240px"
        >
          <el-option
                  v-for="dict in sys_yes_no"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="审核时间" prop="approvedate">
        <el-date-picker clearable
          v-model="queryParams.approvedate"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择审核时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="审核人" prop="approver">
        <el-input
          v-model="queryParams.approver"
          placeholder="请输入审核人"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="需要鞋套" prop="needshoes">
        <el-select
                v-model="queryParams.needshoes"
                clearable
                style="width: 240px"
        >
          <el-option
                  v-for="dict in is_or_not"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="洽谈地点" prop="room">
        <el-select
                v-model="queryParams.room"
                clearable
                style="width: 240px"
        >
          <el-option
                  v-for="dict in tk_visit_room"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
          />
        </el-select>
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
          v-hasPermi="['tk_custom:visit:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['tk_custom:visit:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['tk_custom:visit:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['tk_custom:visit:export']"
        >导出</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
                type="warning"
                plain
                icon="Download"
                @click="syncDept"
                v-hasPermi="['tk_custom:WX:syncDept']"
        >同步企业微信部门信息</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
                type="warning"
                plain
                icon="Download"
                @click="syncEmploee"
                v-hasPermi="['tk_custom:WX:syncEmploee']"
        >同步企业微信员工信息</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table  border stripe v-loading="loading" :data="visitList" max-height="calc(100vh - 230px)" fit @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center"  width="55"/>
      <el-table-column label="入厂时间" align="center" prop="vDate" width="150">
        <template #default="scope">
          <span>{{ parseTime(scope.row.vDate, '{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出厂时间" align="center" prop="outtime" width="150">
        <template #default="scope">
          <span>{{ parseTime(scope.row.outtime, '{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column  label="访客姓名" align="center" prop="vName"  width="120" />
      <el-table-column label="手机号码" align="center" prop="vTelephone"   width="120"/>

      <el-table-column label="来访事由" align="center" prop="vReason"   width="120"/>
      <el-table-column label="被访人" align="center" prop="receiver"  width="120" />
      <el-table-column label="车牌号码" align="center" prop="carNumber"  width="120" />
      <el-table-column label="来访公司" align="center" prop="company"  width="120"/>
      <el-table-column label="来访人数" align="center" prop="peoplecount"  width="120"/>
      <el-table-column label="审核" align="center" prop="approve"  width="120">
        <template #default="scope">
          <dict-tag :options="sys_yes_no" :value="scope.row.approve"/>
        </template>
      </el-table-column>

      <el-table-column label="审核人" align="center" prop="approver"  width="120" />
      <el-table-column label="需要鞋套" align="center" prop="needshoes" width="120" >
        <template #default="scope">
          <dict-tag :options="is_or_not" :value="scope.row.needshoes"/>
        </template>
      </el-table-column>
      <el-table-column label="洽谈地点" align="center" prop="room" width="120" >
        <template #default="scope">
          <dict-tag :options="tk_visit_room" :value="scope.row.room"/>
        </template>
      </el-table-column>
      <el-table-column label="身份证号码" align="center" prop="vCardid"  width="180" />
      <el-table-column label="操作" align="center" fixed="right"  class-name="small-padding fixed-width"  width="80" >
        <template #default="scope">
          <el-button link type="danger" style="background: orangered;color: white;line-height: 30px;width: 100%;"  @click="handleApprove(scope.row.id,scope.row.approve)" v-hasPermi="['tk_custom:visit:approve']" v-if="scope.row.approve=='Y'">反审</el-button>
          <el-button link type="primary"  style="background: cornflowerblue;color: white;line-height: 30px;width: 100%;"  @click="handleApprove(scope.row.id,scope.row.approve)" v-hasPermi="['tk_custom:visit:approve']"   v-else>审核</el-button>
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

    <!-- 添加或修改来访登记对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="visitRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="入厂时间" prop="vDate">
          <el-date-picker clearable
            v-model="form.vDate"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择入厂时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="访客姓名" prop="vName">
          <el-input v-model="form.vName" placeholder="请输入访客姓名" />
        </el-form-item>
        <el-form-item label="手机号码" prop="vTelephone">
          <el-input v-model="form.vTelephone" placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item label="身份证号码" prop="vCardid">
          <el-input v-model="form.vCardid" placeholder="请输入身份证号码" />
        </el-form-item>
        <el-form-item label="来访事由" prop="vReason">
          <el-input v-model="form.vReason" placeholder="请输入来访事由" />
        </el-form-item>
        <el-form-item label="被访人" prop="receiver">
          <el-input v-model="form.receiver" placeholder="请输入被访人" />
        </el-form-item>
        <el-form-item label="车牌号码" prop="carNumber">
          <el-input v-model="form.carNumber" placeholder="请输入车牌号码" />
        </el-form-item>
        <el-form-item label="来访公司" prop="company">
          <el-input v-model="form.company" placeholder="请输入来访公司" />
        </el-form-item>
        <el-form-item label="来访人数" prop="peoplecount">
          <el-input v-model="form.peoplecount" placeholder="请输入来访人数" />
        </el-form-item>
        <el-form-item label="需要鞋套" prop="needshoes">
          <el-select v-model="form.needshoes" placeholder="请选择">
            <el-option
                    v-for="dict in is_or_not"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="洽谈地点" prop="room">
          <el-select v-model="form.room" placeholder="请选择">
            <el-option
                    v-for="dict in tk_visit_room"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
            ></el-option>
          </el-select>
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

<script setup name="Visit">
import { listVisit, getVisit, delVisit, addVisit, updateVisit ,syncDeptWX,syncEmploeeWX,approveVisit} from "@/api/tk_custom/visit";
import { parseTime } from '@/utils/ruoyi'
const { proxy } = getCurrentInstance();
const { sys_yes_no } = proxy.useDict("sys_yes_no");
const { tk_visit_room } = proxy.useDict("tk_visit_room");
const { is_or_not } = proxy.useDict("is_or_not");
const visitList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(false);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");

const data = reactive({
  form: {
  },
  queryParams: {
    pageNum: 1,
    pageSize: 50,
    vDate: null,
    vName: null,
    vTelephone: null,
    vCardid: null,
    vReason: null,
    receiver: null,
    carNumber: null,
    createdate: null,
    company: null,
    peoplecount: null,
    approve: null,
    approvedate: null,
    approver: null,
    needshoes: null,
    room: null,
  },
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询来访登记列表 */
function getList() {
  loading.value = true;
  listVisit(queryParams.value).then(response => {
    visitList.value = response.rows;
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
    vDate: null,
    vName: null,
    vTelephone: null,
    vCardid: null,
    vReason: null,
    receiver: null,
    carNumber: null,
    createdate: null,
    company: null,
    peoplecount: null,
    approve: null,
    approvedate: null,
    approver: null,
    needshoes: null,
    room: null,
    id: null
  };
  proxy.resetForm("visitRef");
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
/** 审核按钮操作 */
function handleApprove(id,approve) {
    approveVisit(id).then(response => {
        if(approve=='Y')
        proxy.$modal.msgSuccess("反审成功");
        else
            proxy.$modal.msgSuccess("审核成功");
        getList();
    });
}
/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}
function syncDept() {
    proxy.$modal.confirm('是否重新拉取企业微信部门信息？').then(function() {
        return syncDeptWX();
    }).then(() => {
        getList();
        proxy.$modal.msgSuccess("部门信息更新成功");
    }).catch(() => {});
}
function syncEmploee() {
    proxy.$modal.confirm('是否重新拉取企业微信员工信息？').then(function() {
        return syncEmploeeWX();
    }).then(() => {
        getList();
        proxy.$modal.msgSuccess("员工信息更新成功");
    }).catch(() => {});
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
  title.value = "添加来访登记";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _id = row.id || ids.value
  getVisit(_id).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改来访登记";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["visitRef"].validate(valid => {
    if (valid) {
      if (form.value.id != null) {
        updateVisit(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addVisit(form.value).then(response => {
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
  proxy.$modal.confirm('是否删除选中的数据项？').then(function() {
    return delVisit(_ids);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('tk_custom/visit/export', {
    ...queryParams.value
  }, `来访登记_${parseTime(new Date(), '{y}{m}{d}{h}{i}')}.xlsx`)
}

getList();
</script>
<style>
</style>
