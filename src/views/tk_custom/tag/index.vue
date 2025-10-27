<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryRef" :inline="true"  v-show="showSearch" label-width="68px">
            <div style="display: flex;">
                <div style="flex: 1">
                    <el-form-item label="物料编码" prop="mertiralid">
                        <el-input
                                v-model="queryParams.mertiralid"
                                placeholder="请输入物料编码"
                                clearable
                                @keyup.enter="handleQuery"
                        />
                    </el-form-item>
                </div>
                <div style="flex: 1">
                    <el-form-item label="物料名称" prop="mertiralname">
                        <el-input
                                v-model="queryParams.mertiralname"
                                placeholder="请输入物料名称"
                                clearable
                                @keyup.enter="handleQuery"
                        />
                    </el-form-item>
                </div>
            </div>

            <div style="display: flex;">
                <div style="flex: 1">
                    <el-form-item label="封装" prop="fengzhuang">
                        <el-input
                                v-model="queryParams.fengzhuang"
                                placeholder="请输入封装"
                                clearable
                                @keyup.enter="handleQuery"
                        />
                    </el-form-item>
                </div>
                <div style="flex: 1">
                    <el-form-item label="印字" prop="yinzi">
                        <el-input
                                v-model="queryParams.yinzi"
                                placeholder="请输入印字"
                                clearable
                                @keyup.enter="handleQuery"
                        />
                    </el-form-item>
                </div>
            </div>

            <div style="display: flex;">
                <div style="flex: 1">
                    <el-form-item label="库位" prop="kuwei">
                        <el-input
                                v-model="queryParams.kuwei"
                                placeholder="请输入库位"
                                clearable
                                @keyup.enter="handleQuery"
                        />
                    </el-form-item>
                </div>
                <div style="flex: 1">
                    <el-form-item label="数量" prop="number">
                        <el-input
                                v-model="queryParams.number"
                                placeholder="请输入数量"
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
        <template v-for="item in pd_ckList">
            <div class="listmain">
                <div>
                    <span class="label_own">物料编码:</span> <span class="content_own">{{item.mertiralid}}</span>
                </div>
                <div>
                    <span class="label_own">物料名称:</span> <span class="content_own">{{item.mertiralname}}</span>
                </div>
                <div>
                    <span class="label_own">印字:</span> <span class="content_own">{{item.yinzi}}</span>
                </div>
                <div style="display: flex;">
                    <div style="flex: 1">
                        <span class="label_own">封装:</span> <span class="content_own">{{item.fengzhuang}}</span>
                    </div>
                    <div style="flex: 1">
                        <span class="label_own">日期:</span> <span class="content_own">{{item.pddate.substring(0,16)}}</span>
                    </div>
                </div>

                <div style="display: flex;">
                    <div style="flex: 1">
                        <span class="label_own">库位:</span> <span class="content_own">{{item.kuwei}}</span>
                    </div>
                    <div style="flex: 1">
                        <span class="label_own">数量:</span> <span class="content_own">{{item.number}}</span>
                    </div>
                    <div class="btnscls">
                        <button class="btnedit" @click="handleUpdate(item.id)">修改</button>
                        <button class="btndel" @click="handleDelete(item.id,item.mertiralname)">删除</button>
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
                    <el-input v-model="form.kuwei" placeholder="请输入库位" />
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

<script setup name="Pd_ck">
    import { listPd_ck, getPd_ck, delPd_ck, addPd_ck, updatePd_ck } from "@/api/tk_custom/pd_ck";
    import {getInfo} from "../../../api/login";

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
            creator: null
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
        var obj=JSON.parse(code);
        form.value = {
            id: null,
            mertiralid: obj["编码"],
            mertiralname: obj["名称"],
            fengzhuang: obj["封装"],
            yinzi: obj["印字"],
            kuwei: null,
            number: null,
            pddate: null,
            remark: null,
            creator:null
        };
        handleAdd();
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
            mertiralid: null,
            mertiralname: null,
            fengzhuang: null,
            yinzi: null,
            kuwei: null,
            number: null,
            pddate: null,
            remark: null,
            creator:null
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
        // reset();
        open.value = true;
        title.value = "添加";
    }

    /** 修改按钮操作 */
    function handleUpdate(id) {
        reset();
        getPd_ck(id).then(response => {
            form.value = response.data;
            open.value = true;
            title.value = "修改";
        });
    }

    /** 提交按钮 */
    function submitForm() {
        proxy.$refs["pd_ckRef"].validate(valid => {
            if (valid) {
                saving.value=true;
                if (form.value.id != null) {
                    updatePd_ck(form.value).then(response => {
                        saving.value=false;
                        if(response.code!='200'){
                            proxy.$modal.msgError("保存失败！");
                        }else{
                            proxy.$modal.msgSuccess("修改成功");
                            open.value = false;
                            getList();
                        }

                    });
                } else {
                    addPd_ck(form.value).then(response => {
                        saving.value=false;
                        if(response.code!='200'){
                            proxy.$modal.msgError("保存失败！");
                        }else{
                            proxy.$modal.msgSuccess("新增成功");
                            open.value = false;
                            //新增成功，调起继续扫描
                            scan();
                            getList();
                        }
                    });
                }
            }
        });
    }

    /** 删除按钮操作 */
    function handleDelete(id,name) {
        proxy.$modal.confirm('是否确认删除"' + name + '"？').then(function() {
            return delPd_ck(id);
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
