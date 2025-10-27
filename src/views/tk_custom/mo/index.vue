<template>

    <div class="app-container">
        <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px" style="height: 60px">
            <el-form-item label="物料名称" prop="FNAME" style="width: 200px">
                <el-input
                        v-model="queryParams.FNAME"
                        placeholder="请输入物料名称"
                        clearable
                />
            </el-form-item>
            <el-form-item label="流程单号" prop="FBillNo" style="width: 200px">
                <el-input
                        v-model="queryParams.FBillNo"
                        placeholder="请输入流程单号"
                        clearable
                />
            </el-form-item>
            <el-form-item label="生产订单号" label-width="100" prop="FMONumber" style="width: 300px">
                <div style="display: flex;">
                    <el-input style="flex: 2"
                              v-model="queryParams.FMONumber"
                              placeholder="请输入生产订单号"
                              clearable
                    />
                    <el-input style="flex: 1"
                              v-model="queryParams.FMOEntrySeq"
                              placeholder="行号"
                              clearable
                    />
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
                <el-button icon="Refresh" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>


        <!--:data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"-->
        <el-table v-loading="loading" :data="moList" style=" height:calc(100vh - 293px)">
            <el-table-column fixed label="生产订单信息" align="center" width="500px">
                <template #default="scope">
                    <div style="    display: flex;text-align: left;">
                        <div style="width: 60%">
                            <div>
                                <span style="font-weight: bold">物料编码: </span>{{scope.row.FNUMBER}}
                            </div>
                            <div>
                                <span style="font-weight: bold">物料名称: </span>{{scope.row.FNAME}}
                            </div>
                            <div>
                                <span style="font-weight: bold">封装: </span>{{scope.row.FSPECIFICATION}}
                            </div>
                            <div>
                                <span style="font-weight: bold">最新汇报时间: </span>{{scope.row.reportDate}}
                            </div>
                        </div>
                        <div style="width: 40%">
                            <div>
                                <span style="font-weight: bold">流程单号: </span>{{scope.row.FBillNo}}
                            </div>
                            <div>
                                <span style="font-weight: bold">生产订单号: </span>{{scope.row.FMONumber}}_{{scope.row.FMOEntrySeq}}
                            </div>
                            <div>
                                <span style="font-weight: bold">工单数量: </span>{{scope.row.FOperQty}}
                            </div>
                            <div>
                                <span style="font-weight: bold">工艺路线: </span>{{scope.row.gongyiluxian}}
                            </div>
                        </div>


                    </div>
                </template>
            </el-table-column>
            <el-table-column label="当前生产进度" align="center">
                <template #default="scope">
                    <div style="display: flex;flex-direction:row">
                        <div v-for="item in scope.row.details "
                             :class="{'gongxuItem':item.FQualifiedQty>0,'gongxuItem_1':item.FQualifiedQty==0}">
                            <div>{{item.zuoye}}</div>
                            <div>
                                <div>合格:{{item.FQualifiedQty}}</div>
                                <div>不良:{{item.FUnqualifiedQty}}</div>
                            </div>
                        </div>

                    </div>
                </template>
            </el-table-column>
        </el-table>
        <table class="mytable">
            <th>合计</th>
            <th v-for="item in moSumList ">{{item.zuoye}}</th>
            <tr>
                <td>合格</td>
                <td v-for="item in moSumList ">{{item.FQualifiedQty}}</td>
            </tr>
            <tr>
                <td>不良</td>
                <td v-for="item in moSumList ">{{item.FUnqualifiedQty}}</td>
            </tr>

        </table>
    </div>

</template>

<script setup name="mo">
    import {getData} from "@/api/tk_custom/mo";

    const {proxy} = getCurrentInstance();
    const showSearch = ref(true);
    const loading = ref(false);
    const moList = ref([]);
    const moSumList = ref([]);
    const data = reactive({
        queryParams: {
            FMONumber: "",
            FMOEntrySeq: "",
            FBillNo: "",
            FNAME: ""
        }
    });
    const {queryParams} = toRefs(data);

    function handleQuery() {
        getList()
    }

    function resetQuery() {
        queryParams.value = {
            FMONumber: "",
            FBillNo: "",
            FNAME: ""
        }
    }

    function getSumList() {
        const list = moList.value;
        const arr = [];
        for (var key1 in list) {
            var details = list[key1].details;
            for (var key2 in details) {
                var detailObj = details[key2];//工序Obj
                var exist = false;
                for (var i = 0; i < arr.length; i++) {
                    if (detailObj.zuoye == arr[i].zuoye) {
                        var sss = arr[i].FQualifiedQty;
                        arr[i].FQualifiedQty = (arr[i].FQualifiedQty * 1000 + detailObj.FQualifiedQty * 1000) / 1000;
                        arr[i].FUnqualifiedQty = (arr[i].FUnqualifiedQty * 1000 + detailObj.FUnqualifiedQty * 1000) / 1000;
                        if (arr[i].FQualifiedQty > 0 && (arr[i].FQualifiedQty + "").split(".")[1] && (arr[i].FQualifiedQty + "").split(".")[1].length > 3) {
                            var p = 9;
                        }
                        exist = true;
                    }
                }
                if (!exist) {
                    var obj1 = {};
                    obj1.zuoye = detailObj.zuoye;
                    obj1.FQualifiedQty = detailObj.FQualifiedQty;
                    obj1.FUnqualifiedQty = detailObj.FUnqualifiedQty;
                    obj1.FOperNumber = detailObj.FOperNumber;
                    arr.push(obj1);
                }
            }
        }
        for (var i = 0; i < arr.length; i++) {
            for (var j = 1; j < arr.length - 1; j++) {
                var a = arr[i].FOperNumber;
                var b = arr[j].FOperNumber;
                if (a > b) {
                    arr[i].FOperNumber = b;
                    arr[j].FOperNumber = a;
                }
            }
        }
        for (var i = 0; i < arr.length; i++) {
            arr[i].FQualifiedQty = (arr[i].FQualifiedQty).toFixed(3);
            arr[i].FUnqualifiedQty = (arr[i].FUnqualifiedQty).toFixed(3);
        }
        moSumList.value = arr;
    }

    function getList() {
        loading.value = true;
        getData(queryParams.value).then(response => {
            moList.value = response;
        }).finally(response => {
            loading.value = false;
            getSumList();
        })
    }

    function getRowData(row) {
        console.log(row);
    }

    getList();
</script>
<style>
    .mytable {
        width: 100%;
    }

    .mytable {
        border-collapse: collapse;
        margin: 0 auto;
        text-align: center;
    }

    .mytable td, table th {
        border: 1px solid #cad9ea;
        color: #666;
        height: 30px;
    }

    .mytable thead th {
        background-color: #CCE8EB;
        width: 100px;
    }

    .mytable tr:nth-child(odd) {
        background: #fff;
    }

    .mytable tr:nth-child(even) {
        background: #F5FAFA;
    }

    .gongxuItem {
        margin: 3px;
        border: 3px solid green;
        background: green;
        color: white;
        width: 100px;
        border-radius: 5px;
    }

    .gongxuItem_1 {
        margin: 3px;
        border: 3px solid gray;
        background: gray;
        color: white;
        width: 100px;
        border-radius: 5px;
    }
</style>