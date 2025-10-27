<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true"  v-show="showSearch" label-width="68px">
      <div style="display: flex;">
        <div style="flex: 1">
          <el-form-item label="卡片编码" prop="kpBm">
            <el-input
                    v-model="queryParams.kpBm"
                    placeholder="请输入卡片编码"
                    clearable
                    @keyup.enter="handleQuery"
            />
          </el-form-item>
        </div>
        <div style="flex: 1">
          <el-form-item label="资产编码" prop="zcBm">
            <el-input
                    v-model="queryParams.zcBm"
                    placeholder="请输入资产编码"
                    clearable
                    @keyup.enter="handleQuery"
            />
          </el-form-item>
        </div>
      </div>

      <div style="display: flex;">
        <div style="flex: 1">
          <el-form-item label="资产名称" prop="name">
            <el-input
                    v-model="queryParams.name"
                    placeholder="请输入资产名称"
                    clearable
                    @keyup.enter="handleQuery"
            />
          </el-form-item>
        </div>
        <div style="flex: 1">
          <el-form-item label="资产位置" prop="zcLocation">
            <el-input
                    v-model="queryParams.zcLocation"
                    placeholder="请输入资产位置"
                    clearable
                    @keyup.enter="handleQuery"
            />
          </el-form-item>
        </div>

      </div>

      <div style="display: flex;">
        <div style="flex: 1">
          <el-form-item label="使用部门" prop="useDept">
            <el-input
                    v-model="queryParams.useDept"
                    placeholder="请输入使用部门"
                    clearable
                    @keyup.enter="handleQuery"
            />
          </el-form-item>
        </div>
      </div>

      <div style="display: flex;">
        <div style="flex: 1">
          <el-form-item label="盘点日期" prop="pddate">
            <el-input
                    v-model="queryParams.pddate"
                    placeholder="请输入盘点日期"
                    clearable
                    @keyup.enter="handleQuery"
            />
          </el-form-item>
        </div>
        <div style="flex: 1">
          <el-form-item label="盘点人" prop="number">
            <el-input
                    v-model="queryParams.creator"
                    placeholder=""
                    clearable
                    @keyup.enter="handleQuery"
            />
          </el-form-item>
        </div>
      </div>



      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
    <template v-for="item in pd_gdzcList">
      <div class="listmain">
        <div>
          <span class="label_own">卡片编码:</span> <span class="content_own">{{item.kpBm}}</span>
        </div>
        <div>
          <span class="label_own">资产编码:</span> <span class="content_own">{{item.zcBm}}</span>
        </div>
        <div>
          <span class="label_own">资产名称:</span> <span class="content_own">{{item.name}}</span>
        </div>
        <div>
          <span class="label_own">规格型号:</span> <span class="content_own">{{item.ggxh}}</span>
        </div>
        <div style="display: flex;">
          <div style="flex: 1">
            <span class="label_own">使用部门:</span> <span class="content_own">{{item.useDept}}</span>
          </div>
          <div style="flex: 1">
            <span class="label_own">日期:</span> <span class="content_own">{{item.pddate.substring(0,16)}}</span>
          </div>
        </div>

        <div style="display: flex;">
          <div style="flex: 1">
            <span class="label_own">资产位置:</span> <span class="content_own">{{item.zcLocation}}</span>
          </div>
          <div style="flex: 1">
            <span class="label_own">数量:</span> <span class="content_own">{{item.number}}</span>
          </div>
          <div class="btnscls">
            <button class="btnedit" @click="handleUpdate(item.id)">修改</button>
            <button class="btndel" @click="handleDelete(item.id,item.name)">删除</button>
          </div>

        </div>


        <div>

        </div>
        <div style="display: flex;">
          <div style="flex: 1">
            <span class="label_own">备注:</span> <span class="content_own">{{item.remark}}</span>
          </div>
          <div style="flex: 1">
            <span class="label_own">盘点人:</span> <span class="content_own">{{item.creator}}</span>
          </div>
        </div>
      </div>
    </template>
    <img class="scan" v-show="!open" @click="scan" src="../../../assets/icons/scan.png"/>
    <pagination
            v-show="total>0"
            :total="total"
            v-model:page="queryParams.pageNum"
            v-model:limit="queryParams.pageSize"
            @pagination="getList"
    />

    <!-- 添加或修改盘点_仓库对话框 -->
    <el-dialog :title="title" v-model="open" width="100vw" height="100vh" append-to-body>
      <el-form ref="Pd_gdzcRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="卡片编码" prop="zcBm">
          <el-input v-model="form.kpBm" placeholder="请输入资产编码" />
        </el-form-item>
        <el-form-item label="资产编码" prop="zcBm">
          <el-input v-model="form.zcBm" placeholder="请输入资产编码" />
        </el-form-item>

        <el-form-item label="资产名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入资产名称" />
        </el-form-item>
        <el-form-item label="规格型号" prop="fengzhuang">
          <el-input v-model="form.ggxh" placeholder="请输入规格型号" />
        </el-form-item>
        <el-form-item label="资产位置" prop="zcLocation">
          <el-input v-model="form.zcLocation" placeholder="请输入资产位置" />
        </el-form-item>
        <el-form-item label="使用部门" prop="kuwei">
          <el-input v-model="form.useDept" placeholder="请输入使用部门" />
        </el-form-item>
        <el-form-item label="数量" prop="number">
          <el-input v-model="form.number" placeholder="请输入数量" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="盘点日期" prop="pddate">
          <el-input v-model="form.pddate" readonly  placeholder="新增时不需要输入" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" v-if="!saving" @click="submitForm">保 存</el-button>
          <el-button type="warning" v-if="saving" >保 存 中...</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Pd_gdzc">
    import { selectFromKingdee,listPd_gdzc, getPd_gdzc, delPd_gdzc, addPd_gdzc, updatePd_gdzc } from "@/api/tk_custom/pd_gdzc";
    import {getInfo} from "../../../api/login";

    const { proxy } = getCurrentInstance();

    const pd_gdzcList = ref([]);
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
            kpBm: null,
            name: null,
            useDept: null,
            zcBm: null,
            zcLocation: null,
            ggxh: null,
            pddate: null,
            remark: null,
            creator:null
        },
        rules: {
            zcLocation: [
                { required: true, message: "资产位置不能为空", trigger: "blur" }
            ],
            useDept: [
                { required: true, message: "使用部门不能为空", trigger: "blur" }
            ]
        }
    });

    const { queryParams, form, rules } = toRefs(data);

    /** 查询盘点_仓库列表 */
    function getList() {
        loading.value = true;
        listPd_gdzc(queryParams.value).then(response => {
            pd_gdzcList.value = response.rows;
            total.value = response.total;
            loading.value = false;
        });
    }
    function scan() {
        try{
            AndroidJs.scan();
        }catch {
            proxy.$modal.msgError("请安装指定APP!");
        }

    }
    window.getBarCodeResult=function(code){
        selectFromKingdee(code).then(response=>{
            form.value=response;
            handleAdd();
        })

    };

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
            name: null,
            useDept: null,
            zcBm: null,
            zcLocation: null,
            ggxh: null,
            pddate: null,
            remark: null,
            number:0,
            creator:null
        };
        proxy.resetForm("Pd_gdzcRef");
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
        // reset();
        open.value = true;
        title.value = "添加";
    }

    /** 修改按钮操作 */
    function handleUpdate(id) {
        reset();
        getPd_gdzc(id).then(response => {
            form.value = response.data;
            open.value = true;
            title.value = "修改";
        });
    }

    /** 提交按钮 */
    function submitForm() {
        proxy.$refs["Pd_gdzcRef"].validate(valid => {
            if (valid) {
                saving.value=true;
                if (form.value.id != null) {
                    updatePd_gdzc(form.value).then(response => {
                        if(response.code!='200'){
                            proxy.$modal.msgError("保存失败！");
                        }else{
                            proxy.$modal.msgSuccess("修改成功");
                            open.value = false;
                            getList();
                        }

                    }).finally(response=>{
                        saving.value=false;
                    });
                } else {
                    addPd_gdzc(form.value).then(response => {
                        if(response.code!='200'){
                            proxy.$modal.msgError("保存失败！");
                        }else{
                            proxy.$modal.msgSuccess("新增成功");
                            open.value = false;
                            //新增成功，调起继续扫描
                            scan();
                            getList();
                        }
                    }).finally(response=>{
                        saving.value=false;
                    });
                }
            }
        });
    }

    /** 删除按钮操作 */
    function handleDelete(id,name) {
        proxy.$modal.confirm('是否确认删除"' + name + '"？').then(function() {
            return delPd_gdzc(id);
        }).then(() => {
            getList();
            proxy.$modal.msgSuccess("删除成功");
        }).catch(() => {});
    }

    /** 导出按钮操作 */
    function handleExport() {
        proxy.download('tk_custom/Pd_gdzc/export', {
            ...queryParams.value
        }, `Pd_gdzc_${new Date().getTime()}.xlsx`)
    }
    getInfo().then(function (resp) {
        queryParams.value.creator=resp.user.userName;
        getList();
    })
</script>
<style>
  .app-container {
    padding: 5px;
  }
  .listmain{
    position: relative;
    padding: 5px;
    background: #edf2fa;
    color:black;
    border-radius: 10px;
    margin-top:3px
  }
  .label_own{
    font-weight: bold;
    font-size:16px;
    font-family: Arial;
  }
  .content_own{
    font-size:16px;
    font-family: Arial;
  }
  .btnscls{
    position:absolute;top:5px;right:5px;display: flex;flex-direction: row;width: 100px;
  }
  .btnedit{
    height: 30px;
    flex:1;
    background: #409eff;
    color:white;
    border: 0px;
    border-radius: 3px;
  }
  .btndel{
    margin-left: 5px;
    flex:1;
    background: red;
    color:white;
    border: 0px;
    border-radius: 3px;
  }
  .scan {
    position: fixed;
    bottom:calc(10vh - 25px);
    left:calc(50vw - 25px);
    height: 50px; /* 根据需要调整高度 */
    background-color: #f0f0f0; /* 按钮背景色 */
    z-index: 10000;
    text-align: center;
    line-height: 50px; /* 垂直居中 */
  }
</style>
