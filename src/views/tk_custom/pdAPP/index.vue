<template>
    <div class="app-container">
      <el-button  style="width: 70vw;color:white;background: cornflowerblue"  @click="scan">扫描</el-button >
    </div>
    <el-dialog  v-model="open"  @open="dialogOpen" @close="dialogClose" style="height:100vh;width:100vw" >
        <el-form ref="pdRef" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="库存数量" prop="number">
                <el-input v-model="form.number" placeholder="请输入库存数量" v-bind:readonly="isEdit"/>
            </el-form-item>
            <el-form-item label="盘点数量" prop="pdNumber">
                <el-input ref="pdNumberRef" v-model="form.pdNumber" @keyup.enter="submitForm"  placeholder="请输入盘点数量" />
            </el-form-item>
            <el-form-item label="盘点工序" prop="process" >
                <el-select v-model="form.process" placeholder="请选择盘点工序" v-bind:disabled="isEdit">
                    <el-option
                            v-for="dict in tk_pd"
                            :key="dict.value"
                            :label="dict.label"
                            :value="dict.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="流程单号" prop="flowNo">
                <el-input v-model="form.flowNo" placeholder="请输入流程单号" v-bind:readonly="isEdit"/>
            </el-form-item>
            <el-form-item label="产品编码" prop="productId">
                <el-input v-model="form.productId" placeholder="请输入产品编码" v-bind:readonly="isEdit"/>
            </el-form-item>
            <el-form-item label="产品名称" prop="productName">
                <el-input v-model="form.productName" placeholder="请输入产品名称" v-bind:readonly="isEdit"/>
            </el-form-item>
            <el-form-item label="规格型号" prop="specification">
                <el-input v-model="form.specification" placeholder="请输入规格型号" v-bind:readonly="isEdit"/>
            </el-form-item>
            <el-form-item label="批号" prop="lot">
                <el-input v-model="form.lot" placeholder="请输入批号" v-bind:readonly="isEdit"/>
            </el-form-item>


            <el-form-item label="备注" prop="remark">
                <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup name="pdAPP">
    import { listPd, getPd, delPd, addPd, updatePd } from "@/api/tk_custom/pd";

    const { proxy } = getCurrentInstance();
    const { tk_pd } = proxy.useDict('tk_pd');
    const pdList = ref([]);
    const open = ref(false);
    const loading = ref(true);
    const showSearch = ref(false);
    const ids = ref([]);
    const single = ref(true);
    const multiple = ref(true);
    const total = ref(0);
    const title = ref("");
    const t_process = ref("测试分选");
    const t_flowNo = ref("");
    const isEdit=ref(false);
    const data = reactive({
        form: {},
        queryParams: {
            pageNum: 1,
            pageSize: 10,
            pdDate: null,
            process: null,
            flowNo: null,
            productId: null,
            productName: null,
            specification: null,
            lot: null,
        },
        rules: {
            pdNumber: [
                { required: true, message: "盘点数量不能为空", trigger: "blur" }
            ],
        }
    });

    const { queryParams, form, rules } = toRefs(data);
    function dialogOpen() {
        proxy.$nextTick(function () {
            this.$refs.pdNumberRef.focus();
            this.$refs.pdNumberRef.select();
        })
    }
    function dialogClose() {
        proxy.$nextTick(function () {
            this.$refs.mainpageFlowNo.focus();
            this.$refs.mainpageFlowNo.select();
        })
    }
    //根据流程单号查询
    function queryByFlowNo(){
        if(!t_flowNo.value||t_flowNo.value.length<8)
            return;
        queryParams.value.flowNo=t_flowNo;
        isEdit.value=true;
        loading.value = true;
        listPd(queryParams.value).then(response => {
            pdList.value = response.rows;
            total.value = response.total;
            loading.value = false;
            if(response.rows.length==0)
                return;
            if(response.rows.length==1){
                open.value=true;
                form.value=response.rows[0];
                form.value.pdNumber=form.value.number;
                form.value.process=t_process;
                title.value = "修改盘点信息";
            }
            else{
                proxy.$modal.msgWarning("该流程单号对应多条数据，请手动选择！")
            }

        });
    }
    /** 查询盘点列表 */
    function getList() {
        loading.value = true;
        listPd(queryParams.value).then(response => {
            pdList.value = response.rows;
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
            pdDate: null,
            process: null,
            flowNo: null,
            productId: null,
            productName: null,
            specification: null,
            lot: null,
            number: null,
            pdNumber: null,
            remark: null
        };
        proxy.resetForm("pdRef");
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
        isEdit.value=false;
        open.value = true;
        title.value = "添加盘点信息";
    }

    /** 修改按钮操作 */
    function handleUpdate(row) {
        reset();
        isEdit.value=true;
        const _id = row.id || ids.value
        getPd(_id).then(response => {
            form.value = response.data;
            open.value = true;
            title.value = "修改盘点信息";
        });
    }

    /** 提交按钮 */
    function submitForm() {
        proxy.$refs["pdRef"].validate(valid => {
            if (valid) {
                if (form.value.id != null) {
                    updatePd(form.value).then(response => {
                        proxy.$modal.msgSuccess("修改成功");
                        open.value = false;
                        getList();
                    });
                } else {
                    addPd(form.value).then(response => {
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
        proxy.$modal.confirm('是否确认删除盘点编号为"' + _ids + '"的数据项？').then(function() {
            return delPd(_ids);
        }).then(() => {
            getList();
            proxy.$modal.msgSuccess("删除成功");
        }).catch(() => {});
    }

    /** 导出按钮操作 */
    function handleExport() {
        proxy.download('tk_custom/pd/export', {
            ...queryParams.value
        }, `pd_${new Date().getTime()}.xlsx`)
    }

    getList();

    function getScanResult(barcode){
        alert(barcode);
    }
function scan() {
    queryByFlowNo();
    try{
        AndroidJs.andoridScan();
    }catch (e){
        alert("请安装APP！");
    }
}
</script>

<style>
.app-container{
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 80px);
}
</style>