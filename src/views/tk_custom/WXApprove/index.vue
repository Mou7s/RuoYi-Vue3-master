<template>
    <div class="app-container">
        <div>
            <div class="title">
                待放行列表(物品)
            </div>
            <div class="content">
                <el-row>
                    <el-col :span="24" v-for="(o, index) in WXApproveListForOut" :key="o">
                        <el-card :body-style="{ padding: '0px' }">
                            <div style="display: flex;">
                                <div style="display: flex;flex-direction: column;max-height: 300px;">
                                    <el-image
                                            style="width:350px;"
                                            fit="contain"
                                            :initial-index="0"
                                            :src="o.filepaths"
                                            :preview-src-list="o.imgList"
                                            hide-on-click-modal="true"
                                    >
                                    </el-image>
                                    <div style="height: 50px;flex: 0;text-align: center;font-weight: bold;color: blueviolet;font-size: 20px;">
                                        共 {{o.imgList.length}} 张图片
                                    </div>
                                </div>
                                <div class="listmain">
                                    <el-descriptions :column="1" border>
                                        <el-descriptions-item label="放行时间:">{{o["放行时间"]}}</el-descriptions-item>
                                        <el-descriptions-item label="所属部门:">{{o["所属部门"]}}</el-descriptions-item>
                                        <el-descriptions-item label="携带物品:">{{o["携带物品"]}}</el-descriptions-item>
                                        <el-descriptions-item label="携带人:">{{o["携带人"]}}</el-descriptions-item>
                                        <el-descriptions-item label="审核人:">{{o["autiduser"]}}</el-descriptions-item>
                                        <el-descriptions-item label="补充说明:">{{o["补充说明"]}}</el-descriptions-item>
                                    </el-descriptions>
                                    <div class="btnscls">
                                        <button @click="fangxing(o.spno)">放行</button>
                                    </div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>

        </div>
        <div>
            <div class="title" style="    background: burlywood;">
                待确认返厂列表(物品)
            </div>
            <div class="content">
                <el-row>
                    <el-col :span="24" v-for="(o, index) in WXApproveListForBack" :key="o">
                        <el-card :body-style="{ padding: '0px' }">
                            <div style="display: flex;">
                                <div style="display: flex;flex-direction: column;max-height: 300px;">
                                    <el-image
                                            style="width:350px;"
                                            fit="contain"
                                            :initial-index="0"
                                            :src="o.filepaths"
                                            :preview-src-list="o.imgList"
                                            hide-on-click-modal="true">
                                    </el-image>
                                    <div style="height: 50px;flex: 0;text-align: center;font-weight: bold;color: blueviolet;font-size: 20px;">
                                        共 {{o.imgList.length}} 张图片
                                    </div>
                                </div>

                                <div class="listmain">
                                    <el-descriptions :column="1" border>
                                        <el-descriptions-item label="放行时间:">{{o["放行时间"]}}</el-descriptions-item>
                                        <el-descriptions-item label="所属部门:">{{o["所属部门"]}}</el-descriptions-item>
                                        <el-descriptions-item label="携带物品:">{{o["携带物品"]}}</el-descriptions-item>
                                        <el-descriptions-item label="携带人:">{{o["携带人"]}}</el-descriptions-item>
                                        <el-descriptions-item label="审核人:">{{o["autiduser"]}}</el-descriptions-item>
                                        <el-descriptions-item label="补充说明:">{{o["补充说明"]}}</el-descriptions-item>
                                    </el-descriptions>
                                    <div class="btnscls">
                                        <button @click="backFactory(o.spno)">已返厂</button>
                                    </div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </div>
        <el-dialog v-model="dialogVisible" width="30%" title="选择对应信息，并确认出厂" @open="dialogOpen" @close="dialogClose">
            <div class="dialogDiv">
                <el-select v-model="form.baoan" clearable placeholder="请选择放行人">
                    <el-option
                            v-for="item in baoans"
                            :key="item"
                            :label="item"
                            :value="item">
                    </el-option>
                </el-select>
                <el-select style="margin-top: 10px;" v-model="form.carNumber" clearable placeholder="请选择车牌号">
                    <el-option
                            v-for="item in carNumbers"
                            :key="item"
                            :label="item"
                            :value="item"
                    style="height: 40px">
                    </el-option>
                </el-select>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="outFactory">确 定</el-button>
                    <el-button @click="dialogClose">取 消</el-button>
                </div>
            </template>
        </el-dialog>
    </div>

</template>

<script setup name="WXApprove">
    import {
        getCardNumber,
        queryBA,
        listWXApprove,
        listWXApproveForOut,
        listWXApproveForBack,
        updateOutTime1,
        updateBackTime,
        getWXApprove,
        delWXApprove,
        addWXApprove,
        updateWXApprove
    } from "@/api/tk_custom/WXApprove";

    const {proxy} = getCurrentInstance();
    const dialogVisible = ref(false);
    const baoans = ref([]);
    const carNumbers = ref([]);
    const autoRefresh = ref(true);
    const WXApproveListForOut = ref([]);
    const WXApproveListForOutImg = ref([]);
    const WXApproveListForBack = ref([]);
    const WXApproveListForBackImg = ref([]);
    const data = reactive({
        form: {
            carNumber: "",
            baoan: "",
            spno: ""
        },
        queryParams: {
            pageNum: 1,
            pageSize: 100,
            spName: null,
            spStatus: null,
            templateId: null,
            applyTime: null,
            applyerUserid: null,
            applyerPartyid: null,
            applyDataContents: null,
            filePath: null,
            fileType: null
        },
        rules: {}
    });

    const {queryParams, form, rules} = toRefs(data);

    function fangxing(spno) {
        form.value.spno = spno;
        dialogVisible.value = true;
    }

    function getSelectDatas() {
        getCardNumber().then(response => {
            carNumbers.value = response.rows;
        })
        queryBA().then(response => {
            baoans.value = response.rows;
        })
    }

    function dialogOpen() {
        autoRefresh.value = false;
        getSelectDatas();
    }

    function dialogClose() {
        form.value = {
            carNumber: "",
            baoan: "",
            spno: ""
        };
        dialogVisible.value = false;
        autoRefresh.value = true;
    }

    /** 查询微信审批列表 */
    function getList() {
        if (!autoRefresh.value)
            return;
        listWXApproveForBack(queryParams.value).then(response => {
            WXApproveListForBack.value = [];
            WXApproveListForBackImg.value = [];
            var list = response.rows;
            var returnArr = [];
            for (var i = 0; i < list.length; i++) {
                var json = JSON.parse(list[i].applyDataContents);
                json.spno = list[i].spNo;
                json.autiduser = list[i].auditerid;
                var listImg = [];
                if (json.filepaths.length > 0) {
                    var arr = json.filepaths.split(",");
                    for (var j = 0; j < arr.length; j++) {
                        listImg.push("/prod-api/profile/wx_pic/" + arr[j] + ".png");
                    }
                    json.filepaths = listImg[0].replace("/wx_pic/", "/pic_zip/");
                }
                json.imgList = listImg;
                // WXApproveListForBackImg.value.push(json.filepaths)
                returnArr.push(json)
            }
            WXApproveListForBack.value = returnArr;
        });
        listWXApproveForOut(queryParams.value).then(response => {
            WXApproveListForOut.value = [];
            WXApproveListForOutImg.value = [];
            var list = response.rows;
            var returnArr = [];
            for (var i = 0; i < list.length; i++) {
                var json = JSON.parse(list[i].applyDataContents);
                json.spno = list[i].spNo;
                json.autiduser = list[i].auditerid;
                var listImg = [];
                if (json.filepaths.length > 0) {
                    var arr = json.filepaths.split(",");
                    for (var j = 0; j < arr.length; j++) {
                        listImg.push("/prod-api/profile/wx_pic/" + arr[j] + ".png");
                    }
                    json.filepaths = listImg[0].replace("/wx_pic/", "/pic_zip/");
                }
                json.imgList = listImg;
                returnArr.push(json)
            }
            WXApproveListForOut.value = returnArr;
        });
    }

    function backFactory(spno) {
        autoRefresh.value = false;
        proxy.$modal.confirm("是否确认返厂？", "警告", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            showclose: true,//是否显示右上角关闭按钮
            type: "warning"//提示类型
        }).then(function () {
            updateBackTime(spno).then(response => {
                autoRefresh.value = true;
                if (response.code != 200) {
                    proxy.$modal.msgError("更新失败！");
                } else {
                    proxy.$modal.msgSuccess("更新成功");
                    getList();
                }
            })
        }).catch(function (e) {
            autoRefresh.value = true;
        });

    }

    function outFactory() {
        autoRefresh.value = false;
        updateOutTime1(form.value).then(response => {
            autoRefresh.value = true;
            if (response.code != 200) {
                proxy.$modal.msgError("更新失败！");
            } else {
                proxy.$modal.msgSuccess("更新成功");
                dialogVisible.value = false;
                getList();
            }
        })
    }

    getList();
    var h = setInterval(function () {
        getList();
    }, 1000 * 60);
</script>
<style>
    .el-dialog__title{
        font-size: 30px !important;
    }
    .el-select__placeholder.is-transparent{
        color: orangered;
        font-size: 18px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .el-select__placeholder {
        color: grey;
        font-size: 18px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
    }
    .el-descriptions__body .el-descriptions__table .el-descriptions__cell {
        box-sizing: border-box;
        font-size: 20px;
        font-weight: bold;
        line-height: 23px;
        text-align: left;

    }

    .el-descriptions__label.el-descriptions__cell.is-bordered-label {
        background: var(--el-descriptions-item-bordered-label-background);
        color: var(--el-text-color-regular);
        font-weight: bold;
        width: 120px;
    }

    .content {
        border: 5px solid darkseagreen;
        margin: 5px;
        /* background: #ff8f80; */
        border-radius: 10px;
        height: 90vh;
        overflow: auto;
        padding: 5px;
    }

    .title {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 30px;
        background: cornflowerblue;
        color: white;
        height: 60px;
    }

    .app-container {
        display: flex;
        overflow: hidden;
        height: 100%;
    }

    .app-container div {
        flex: 1;
        margin-top: 3px;
    }

    .listmain {
        position: relative;
        padding: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 24px;
        font-weight: bold;
        height: auto;
        width: 50%;
    }

    .listmain div {
        margin-top: 3px;
    }

    .btnscls {
        position: absolute;
        top: -20px;
        right: -20px;
        display: flex;
        flex-direction: row;
        width: 80px;
        font-size: 16px;
        font-weight: bold;
    }

    .btnscls button {
        background: cornflowerblue;
        color: white;
        border: 0px;
        border-radius: 5px;
        height: 40px;
        font-size: large;
        width: 80px;
        cursor: pointer;
    }

    .image {
        width: 100%;
        display: block;
    }

</style>