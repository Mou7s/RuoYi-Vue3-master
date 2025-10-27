<template>
    <div class="app-container">
        <template v-for="item in mainList">
            <div class="listmain">
                <div>
                    <span class="label_own">物料编码:</span> <span
                        class="content_own">{{item["FMaterialId.FNumber"]}}</span>
                </div>
                <div>
                    <span class="label_own">物料名称:</span> <span class="content_own">{{item["FMaterialId.FName"]}}</span>
                </div>
                <div style="display: flex;">
                    <div style="flex: 1">
                        <span class="label_own">封装:</span> <span class="content_own">{{item["FMaterialId.FSpecification"]}}</span>
                    </div>
                </div>
                <div style="display: flex;">
                    <div style="flex: 1">
                        <span class="label_own">库存数量:</span> <span class="content_own">{{item.FBaseQty}}</span>
                    </div>
                    <div class="btnscls">
                        <button class="btnedit" @click="changeKW(item)">调整库位</button>
                    </div>
                </div>
                <div style="display: flex;">
                    <div style="flex: 1">
                        <span class="label_own">仓库:</span> <span class="content_own">{{item["FStockId.FName"]}}·{{item["FStockLocId.FName"]}}</span>
                    </div>
                </div>
                <div>
                </div>
            </div>

            <el-dialog :title="title" v-model="dialogOpen" width="300px" append-to-body>
                <el-form ref="kwref" :model="dialogForm" :rules="rules" label-width="40px">
                    <el-form-item>
                        <div>

                            <div>编码：{{dialogForm['FMaterialId.FNumber']}}</div>

                            <div>名称：{{dialogForm['FMaterialId.FName']}}</div>

                            <div>封装：{{dialogForm['FMaterialId.FSpecification']}}</div>

                            <div>数量：{{dialogForm['FBaseQty']}}</div>

                            <div>仓位：{{dialogForm['FStockId.FName']}}·{{dialogForm['FStockLocId.FName']}}</div>
                        </div>
                    </el-form-item>
                    <el-form-item label="数量" >
                        <el-input v-model="dialogForm.number"></el-input>
                    </el-form-item>
                    <el-form-item label="仓库" >
                        <el-select style="width: 60vw" filterable v-model="dialogForm.newCangku" placeholder="请选择仓库" @change="getStockLocList" >
                            <el-option
                                    v-for="dict in cangkuList"
                                    :key="dict.fnumber"
                                    :label="dict.name"
                                    :value="dict.fnumber"

                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="仓位" >
                        <el-select  style="width: 60vw" filterable v-model="dialogForm.newCangwei" placeholder="请选择仓位" >
                            <el-option
                                    v-for="dict in cangweiList"
                                    :key="dict.fnumber"
                                    :label="dict.name"
                                    :value="dict.fnumber"
                            />
                        </el-select>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button type="primary" v-if="!loading" @click="submitForm">保 存</el-button>
                        <el-button type="warning" v-if="loading" >正在保存...</el-button>
                        <el-button @click="cancel">取 消</el-button>
                    </div>
                </template>
            </el-dialog>
        </template>

        <img class="scan" v-show="!open" @click="scan" src="../../../assets/icons/scan.png"/>
    </div>
</template>
<script setup name="kuwei">
    import {list,save, queryStock, queryStockLoc} from "@/api/tk_custom/kuwei";
    const {proxy} = getCurrentInstance();
    //销售出库列表
    const mainList = ref([]);
    const open = ref(false);
    const dialogOpen = ref(false);
    const loading = ref(false);
    const cangkuList = ref([]);
    const cangweiList = ref([]);
    const currentSearchId = ref("");
    const total = ref(0);
    const title = ref("调整库位");
    const isItem = ref(false);
    const data = reactive({
        dialogForm: {
            newCangku:"",
            newCangwei:"",
            number:""
        },
        rules: {
            newCangku: [{ required: true, message: "仓库", trigger: "blur" }],
            newCangwei: [{ required: true, message: "仓位", trigger: "blur" }]
        }
    });
    const {dialogForm, rules} = toRefs(data);

    function getList(id) {
        list(id).then(response => {
            if (response.length > 0) {
                var result = response[0];
                    total.value = response.length;
                    mainList.value = response;
                    open.value = true;

            } else {
                proxy.$modal.msgError("未查询到相关数据!");
                open.value = false;
            }

        });
    }
    function scan() {
        try {
            AndroidJs.scan();
        } catch {
            proxy.$modal.msgError("请安装指定APP!");
        }

    }

    function changeKW(obj) {
        dialogOpen.value = true;
        data.dialogForm = obj;
        queryStock().then(response=>{
            cangkuList.value=response;
        });
    }
    function getStockLocList(fnumber) {
        //todo
        if(!fnumber)
            return;
        queryStockLoc(fnumber).then(response=>{
            cangweiList.value=response;
        })
    }
    function submitForm() {
        loading.value = true;
        save(dialogForm.value).then(response => {
            if(response.success==1){
                proxy.$modal.msgSuccess("调整库位成功");
                getList(dialogForm.value["FMaterialId.FNumber"]);
                cancel();
            }else{
                proxy.$modal.msgError(response.errMsg);
            }

        }).finally(response=>{
            loading.value = false;
        });;
    }
    // 取消按钮
    function cancel() {
        dialogOpen.value = false;
        reset();
    }

    // 表单重置
    function reset() {
        dialogForm.value = {
            newCangku:"",
            newCangwei:""
        };
        proxy.resetForm("kuwei");
    }
    window.getBarCodeResult = function (item) {
        if (item.indexOf("{") != -1) {
            var obj = JSON.parse(item);
            currentSearchId.value=obj["编码"];
            getList(currentSearchId.value);
        }
    };
</script>
<style>
    .app-container {
        padding: 5px;
    }

    .listmain {
        position: relative;
        padding: 5px;
        background: #edf2fa;
        color: black;
        border-radius: 10px;
        margin-top: 3px
    }

    .label_own {
        font-weight: bold;
        font-size: 16px;
        font-family: Arial;
    }

    .content_own {
        font-size: 16px;
        font-family: Arial;
    }

    .btnscls {
        position: absolute;
        top: 5px;
        right: 5px;
        display: flex;
        flex-direction: row;
        width: 70px;
    }

    .btnaudit2 {
        margin: 5px;
        font-size: 18px;
        width: 97vw;
        height: 50px;
        line-height: 50px;
        background: gray;
        color: white;
        border: 0px;
        border-radius: 3px;
    }

    .btnaudit1 {
        margin: 5px;
        font-size: 18px;
        width: 97vw;
        height: 50px;
        line-height: 50px;
        background: mediumseagreen;
        color: white;
        border: 0px;
        border-radius: 3px;
    }

    .btnaudit {
        margin: 5px;
        font-size: 18px;
        width: 97vw;
        height: 50px;
        line-height: 50px;
        background: #409eff;
        color: white;
        border: 0px;
        border-radius: 3px;
    }

    .btnedit {
        height: 30px;
        flex: 1;
        background: lightseagreen;
        color: white;
        border: 0px;
        border-radius: 3px;
    }

    .btnedit1 {
        height: 30px;
        flex: 1;
        background: darkgrey;
        color: white;
        border: 0px;
        border-radius: 3px;
    }

    .btndel {
        margin-left: 5px;
        flex: 1;
        background: red;
        color: white;
        border: 0px;
        border-radius: 3px;
    }

    .top {
        margin: 8px;
        font-weight: bold;
        color: rebeccapurple;
    }

    .scan {
        position: fixed;
        bottom: calc(40vh - 60px);
        left: calc(50vw - 60px);
        height: 120px;
        background-color: #f0f0f0;
        /*z-index: 10000;*/
        text-align: center;
        line-height: 50px;
    }

    .tip {
        text-align: center;
        margin-top: 50px;
        font-size: 16px;
    }
</style>
