<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
            <el-form-item label="流程单号" prop="flowno">
                <el-input
                        v-model="queryParams.flowno"
                        placeholder="请输入流程单号"
                        clearable
                        @keyup.enter="handleQuery"
                />
            </el-form-item>
            <el-form-item label="物料编码" prop="materialno">
                <el-input
                        v-model="queryParams.materialno"
                        placeholder="请输入物料编码"
                        clearable
                        @keyup.enter="handleQuery"
                />
            </el-form-item>
            <el-form-item label="物料名称" prop="materialname">
                <el-input
                        v-model="queryParams.materialname"
                        placeholder="请输入物料名称"
                        clearable
                        @keyup.enter="handleQuery"
                />
            </el-form-item>
            <el-form-item label="规格型号" prop="specification">
                <el-input
                        v-model="queryParams.specification"
                        placeholder="请输入规格型号"
                        clearable
                        @keyup.enter="handleQuery"
                />
            </el-form-item>
            <el-form-item label="机台号" prop="mechineName">
                <el-input
                        v-model="queryParams.mechineName"
                        placeholder="请输入机台号"
                        clearable
                        @keyup.enter="handleQuery"
                />
            </el-form-item>
            <el-form-item label="创建时间" prop="createdate">
                <el-date-picker clearable
                                v-model="queryParams.createdate"
                                type="date"
                                value-format="YYYY-MM-DD"
                                placeholder="请选择创建时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="最后修改时间" prop="modifydate">
                <el-date-picker clearable
                                v-model="queryParams.modifydate"
                                type="date"
                                value-format="YYYY-MM-DD"
                                placeholder="请选择最后修改时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="客户代码" prop="khdm">
                <el-input
                        v-model="queryParams.khdm"
                        placeholder="请输入客户代码"
                        clearable
                        @keyup.enter="handleQuery"
                />
            </el-form-item>
            <el-form-item label="操作/技术员" prop="handler">
                <el-input
                        v-model="queryParams.handler"
                        placeholder="请输入操作/技术员"
                        clearable
                        @keyup.enter="handleQuery"
                />
            </el-form-item>
            <el-form-item label="创建人" prop="creator">
                <el-input
                        v-model="queryParams.creator"
                        placeholder="请输入创建人"
                        clearable
                        @keyup.enter="handleQuery"
                />
            </el-form-item>
            <el-form-item label="最后修改人" prop="updater">
                <el-input
                        v-model="queryParams.updater"
                        placeholder="请输入最后修改人"
                        clearable
                        @keyup.enter="handleQuery"
                />
            </el-form-item>
            <el-form-item label="判定结果" prop="result">
                <el-input
                        v-model="queryParams.result"
                        placeholder="请输入判定结果"
                        clearable
                        @keyup.enter="handleQuery"
                />
            </el-form-item>
            <el-form-item label="试验时机" prop="testCharge">
                <el-input
                        v-model="queryParams.testCharge"
                        placeholder="请输入试验时机"
                        clearable
                        @keyup.enter="handleQuery"
                />
            </el-form-item>
            <el-form-item label="线材" prop="xiancai">
                <el-input
                        v-model="queryParams.xiancai"
                        placeholder="请输入线材"
                        clearable
                        @keyup.enter="handleQuery"
                />
            </el-form-item>
            <el-form-item label="线径" prop="xianjing">
                <el-input
                        v-model="queryParams.xianjing"
                        placeholder="请输入线径"
                        clearable
                        @keyup.enter="handleQuery"
                />
            </el-form-item>
            <el-form-item label="弧高测试(um)" prop="hgcs">
                <el-input
                        v-model="queryParams.hgcs"
                        placeholder="请输入弧高测试(um)"
                        clearable
                        @keyup.enter="handleQuery"
                />
            </el-form-item>
            <el-form-item label="最低弧高" prop="zdhg">
                <el-input
                        v-model="queryParams.zdhg"
                        placeholder="请输入最低弧高"
                        clearable
                        @keyup.enter="handleQuery"
                />
            </el-form-item>
            <el-form-item label="球厚度(um)" prop="qhd">
                <el-input
                        v-model="queryParams.qhd"
                        placeholder="请输入球厚度(um)"
                        clearable
                        @keyup.enter="handleQuery"
                />
            </el-form-item>
            <el-form-item label="球直径" prop="qzj">
                <el-input
                        v-model="queryParams.qzj"
                        placeholder="请输入球直径"
                        clearable
                        @keyup.enter="handleQuery"
                />
            </el-form-item>
            <el-form-item label="线拉力(g)" prop="xll">
                <el-input
                        v-model="queryParams.xll"
                        placeholder="请输入线拉力(g)"
                        clearable
                        @keyup.enter="handleQuery"
                />
            </el-form-item>
            <el-form-item label="线推力" prop="xtl">
                <el-input
                        v-model="queryParams.xtl"
                        placeholder="请输入线推力"
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
                        v-hasPermi="['tk_custom:gxjc:add']"
                >新增
                </el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                        type="success"
                        plain
                        icon="Edit"
                        :disabled="single"
                        @click="handleUpdate"
                        v-hasPermi="['tk_custom:gxjc:edit']"
                >修改
                </el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                        type="danger"
                        plain
                        icon="Delete"
                        :disabled="multiple"
                        @click="handleDelete"
                        v-hasPermi="['tk_custom:gxjc:remove']"
                >删除
                </el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                        type="warning"
                        plain
                        icon="Download"
                        @click="handleExport"
                        v-hasPermi="['tk_custom:gxjc:export']"
                >导出
                </el-button>
            </el-col>
            <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>

        <el-table id="mytable" ref="mytable" v-loading="loading" :data="gxjcList" @selection-change="handleSelectionChange" @row-click="clickRow">
            <el-table-column type="selection" width="26" align="center"/>
            <el-table-column label="创建时间" align="center" prop="createdate" width="135">
                <template #default="scope">
                    <span>{{ parseTime(scope.row.createdate, '{y}-{m}-{d} {h}:{i}') }}</span>
                </template>
            </el-table-column>
            <el-table-column label="流程单号" width="95" align="center" prop="flowno"/>
            <el-table-column label="成品型号" width="150" align="center" prop="materialname"/>
            <el-table-column label="封装" width="100" align="center" prop="specification"/>
            <el-table-column label="机台号" width="100" align="center" prop="mechineName"/>
            <el-table-column label="试验时机" align="center" width="100" prop="testCharge">
                <template #default="scope">
                    <dict-tag :options="SJResult" :value="scope.row.testCharge"/>
                </template>
            </el-table-column>
            <el-table-column label="判定结果" align="center" prop="result">
                <template #default="scope">
                    <dict-tag :options="testResult" :value="scope.row.result"/>
                </template>
            </el-table-column>
            <el-table-column label="客户代码" width="100" align="center" prop="khdm"/>
            <el-table-column label="键合型号" width="200" align="center" prop="xiancai">
                <template #default="scope">
                    <pre style="white-space: pre-wrap;"><b>{{scope.row.xiancai}}</b></pre>
                </template>
            </el-table-column>
            <el-table-column label="弧高测试(um)" width="150" align="center" prop="hgcs">
                <template #default="scope">
                    <span>{{convertListValue(scope.row.hgcs)}}</span>
                </template>
            </el-table-column>
            <el-table-column label="最低弧高(um)" width="150" align="center" prop="zdhg">
                <template #default="scope">
                    <span>{{convertListValue(scope.row.zdhg)}}</span>
                </template>
            </el-table-column>
            <el-table-column label="球厚度(um)" width="150" align="center" prop="qhd">
                <template #default="scope">
                    <span>{{convertListValue(scope.row.qhd)}}</span>
                </template>
            </el-table-column>
            <el-table-column label="球直径(um)" width="150" align="center" prop="qzj">
                <template #default="scope">
                    <span>{{convertListValue(scope.row.qzj)}}</span>
                </template>
            </el-table-column>
            <el-table-column label="线拉力(g)" width="150" align="center" prop="xll">
                <template #default="scope">
                    <pre><b>{{convertListValue(scope.row.xll)}}</b></pre>
                </template>
            </el-table-column>
            <el-table-column label="线推力(g)" width="150" align="center" prop="xtl">
                <template #default="scope">
                    <pre><b>{{convertListValue(scope.row.xtl)}}</b></pre>
                </template>
            </el-table-column>
            <el-table-column label="备注" align="center" prop="remark"/>
            <el-table-column label="操作/技术员" width="100" align="center" prop="handler"/>
            <el-table-column label="创建人" align="center" prop="creator"/>
            <el-table-column label="修改人" align="center" prop="updater"/>
            <el-table-column label="修改时间" align="center" prop="modifydate" width="135">
                <template #default="scope">
                    <span>{{ parseTime(scope.row.modifydate, '{y}-{m}-{d} {h}:{i}') }}</span>
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

        <!-- 添加或修改弹坑图片对话框 -->
        <el-dialog :title="title" v-model="open" @open="dialogOpen" :close-on-click-modal="false"
                   :close-on-press-escape="false" width="900px"
                   style="min-height:350px;max-height: 90vh;overflow: scroll" class="sss">
            <el-form ref="gxjcRef" :model="form" :rules="rules" label-width="100px">
                <el-form-item>
                    <el-form-item label="流程单号" prop="flowno">
                        <el-input ref="dialog_flowno_input" v-model="form.flowno" @keyup="getFlowInfo"
                                  placeholder="请扫码/输入流程单号"/>
                    </el-form-item>
                    <el-form-item label="机台号" prop="mechineName">
                        <el-autocomplete
                                class="inline-input"
                                v-model="form.mechineName"
                                :fetch-suggestions="handlerSearch1"
                                placeholder="请输入内容"
                        ></el-autocomplete>
                    </el-form-item>
                </el-form-item>
                <el-form-item>
                    <el-form-item label="操作/技术员" prop="handler">
                        <el-autocomplete
                                class="inline-input"
                                v-model="form.handler"
                                :fetch-suggestions="handlerSearch"
                                placeholder="请输入内容"
                        ></el-autocomplete>
                    </el-form-item>
                    <el-form-item label="判定结果" prop="result">
                        <el-select v-model="form.result" placeholder="请选择" style="width: 100px">
                            <el-option
                                    v-for="dict in testResult"
                                    :key="dict.value"
                                    :label="dict.label"
                                    :value="dict.value"
                            />
                        </el-select>
                    </el-form-item>
                </el-form-item>
                <el-form-item>
                    <el-form-item label="试验时机" prop="testCharge">
                        <el-select v-model="form.testCharge" placeholder="请选择" style="width: 150px">
                            <el-option
                                    v-for="dict in SJResult"
                                    :key="dict.label"
                                    :label="dict.label"
                                    :value="dict.value"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                        <el-input v-model="form.remark" placeholder="" type="textarea"/>
                    </el-form-item>
                </el-form-item>
                <el-divider content-position="left"><b>弧高测试</b></el-divider>
                <el-form-item>
                    <el-form-item prop="hgcs">
                        <div class="myitemdiv" style="display: flex;">
                            <el-input v-model="hgcsObj.no1" placeholder="参数1" type="number"/>
                            <el-input v-model="hgcsObj.no2" placeholder="参数2" type="number"/>
                            <el-input v-model="hgcsObj.no3" placeholder="参数3" type="number"/>
                            <el-input v-model="hgcsObj.no4" placeholder="参数4" type="number"/>
                        </div>
                    </el-form-item>
                </el-form-item>
                <el-divider content-position="left"><b>最低弧高</b></el-divider>
                <el-form-item>
                    <el-form-item label="" prop="zdhg">
                        <div class="myitemdiv" style="display: flex;">
                            <el-input v-model="zdhgObj.no1" placeholder="参数1" type="number"/>
                            <el-input v-model="zdhgObj.no2" placeholder="参数2" type="number"/>
                            <el-input v-model="zdhgObj.no3" placeholder="参数3" type="number"/>
                            <el-input v-model="zdhgObj.no4" placeholder="参数4" type="number"/>
                        </div>
                    </el-form-item>
                </el-form-item>
                <el-divider content-position="left"><b>球厚度(um)</b></el-divider>
                <el-form-item>
                    <el-form-item label="" prop="qhd">
                        <div class="myitemdiv" style="display: flex;">
                            <el-input v-model="qhdObj.no1" placeholder="参数1" type="number"/>
                            <el-input v-model="qhdObj.no2" placeholder="参数2" type="number"/>
                            <el-input v-model="qhdObj.no3" placeholder="参数3" type="number"/>
                            <el-input v-model="qhdObj.no4" placeholder="参数4" type="number"/>
                        </div>
                    </el-form-item>
                </el-form-item>
                <el-divider content-position="left"><b>球直径(um)</b></el-divider>
                <el-form-item>
                    <el-form-item label="" prop="qzj">
                        <div class="myitemdiv" style="display: flex;">
                            <el-input v-model="qzjObj.no1" placeholder="参数1" type="number"/>
                            <el-input v-model="qzjObj.no2" placeholder="参数2" type="number"/>
                            <el-input v-model="qzjObj.no3" placeholder="参数3" type="number"/>
                            <el-input v-model="qzjObj.no4" placeholder="参数4" type="number"/>
                        </div>
                    </el-form-item>
                </el-form-item>
                <el-divider content-position="left"><b>线拉力(g)</b></el-divider>
                <el-form-item>
                    <el-form-item label="" prop="xll">
                        <div class="myitemdiv" style="display: flex;">
                            <el-input v-model="xllObj.no1" placeholder="参数1" type="number"/>
                            <el-input v-model="xllObj.no2" placeholder="参数2" type="number"/>
                            <el-input v-model="xllObj.no3" placeholder="参数3" type="number"/>
                            <el-input v-model="xllObj.no4" placeholder="参数4" type="number"/>
                        </div>
                        <div class="myitemdiv" style="display: flex;">
                            <el-input v-model="xllObj.no5" placeholder="参数5" type="number"/>
                            <el-input v-model="xllObj.no6" placeholder="参数6" type="number"/>
                            <el-input v-model="xllObj.no7" placeholder="参数7" type="number"/>
                            <el-input v-model="xllObj.no8" placeholder="参数8" type="number"/>
                        </div>
                    </el-form-item>
                </el-form-item>
                <el-divider content-position="left"><b>线推力(g)</b></el-divider>
                <el-form-item>
                    <el-form-item label="" prop="xtl">
                        <div class="myitemdiv" style="display: flex;">
                            <el-input v-model="xtlObj.no1" placeholder="参数1" type="number"/>
                            <el-input v-model="xtlObj.no2" placeholder="参数2" type="number"/>
                            <el-input v-model="xtlObj.no3" placeholder="参数3" type="number"/>
                            <el-input v-model="xtlObj.no4" placeholder="参数4" type="number"/>
                        </div>
                        <div class="myitemdiv" style="display: flex;">
                            <el-input v-model="xtlObj.no5" placeholder="参数5" type="number"/>
                            <el-input v-model="xtlObj.no6" placeholder="参数6" type="number"/>
                            <el-input v-model="xtlObj.no7" placeholder="参数7" type="number"/>
                            <el-input v-model="xtlObj.no8" placeholder="参数8" type="number"/>
                        </div>
                    </el-form-item>
                </el-form-item>

                <el-form-item label="客户代码" prop="khdm">
                    <el-input v-model="form.khdm" placeholder="自动赋值" :disabled="true" readonly/>
                </el-form-item>
                <el-form-item>
                    <el-form-item label="成品型号" prop="materialname">
                        <el-input v-model="form.materialname" placeholder="自动赋值" :disabled="true" readonly/>
                    </el-form-item>
                    <el-form-item label="封装" prop="specification">
                        <el-input v-model="form.specification" placeholder="自动赋值" :disabled="true" readonly/>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="键合型号" prop="xiancai">
                    <el-input v-model="form.xiancai" placeholder="自动赋值" :disabled="true" readonly/>
                </el-form-item>
                <el-form-item>
                    <div class="dialog-footer">
                        <div v-show="isUploading" style="    font-size: 20px;font-weight: bold;color: yellowgreen;">
                            正在上传图片，请稍后。。。
                        </div>
                        <div v-show="!isUploading">
                            <el-button type="primary" @click="submitForm">保 存</el-button>
                            <el-button @click="cancel">取 消</el-button>
                        </div>

                    </div>
                </el-form-item>
            </el-form>
            <el-dialog v-model="dialogVisible" append-to-body>
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </el-dialog>
    </div>
</template>

<script setup name="Gxjc">
    import {
        listGxjc,
        getGxjc,
        delGxjc,
        addGxjc,
        updateGxjc,
        getFlowBillInfo,
        getHandlerList,
        getMechineList
    } from "@/api/tk_custom/gxjc";
    import Cookies from "js-cookie";

    const {proxy} = getCurrentInstance();
    const {pinzhi_sj} = proxy.useDict('pinzhi_sj');
    const gxjcList = ref([]);
    const open = ref(false);
    const loading = ref(true);
    const showSearch = ref(false);
    const ids = ref([]);
    const single = ref(true);
    const multiple = ref(true);
    const total = ref(0);
    const title = ref("");
    const restaurants = ref([]);
    const restaurants1 = ref([]);
    const hgcsObj = ref({"no1": "", "no2": "", "no3": "", "no4": ""});
    const zdhgObj = ref({"no1": "", "no2": "", "no3": "", "no4": ""});
    const qhdObj = ref({"no1": "", "no2": "", "no3": "", "no4": ""});
    const qzjObj = ref({"no1": "", "no2": "", "no3": "", "no4": ""});
    const xllObj = ref({"no1": "", "no2": "", "no3": "", "no4": "", "no5": "", "no6": "", "no7": "", "no8": ""});
    const xtlObj = ref({"no1": "", "no2": "", "no3": "", "no4": "", "no5": "", "no6": "", "no7": "", "no8": ""});
    const data = reactive({
        form: {},
        queryParams: {
            pageNum: 1,
            pageSize: 10,
            flowno: null,
            materialno: null,
            materialname: null,
            specification: null,
            mechineName: null,
            createdate: null,
            modifydate: null,
            khdm: null,
            handler: null,
            creator: null,
            updater: null,
            result: null,
            testCharge: null,
            xiancai: null,
            xianjing: null,
            hgcs: null,
            zdhg: null,
            qhd: null,
            qzj: null,
            xll: null,
            xtl: null
        },
        rules: {
            flowno: [
                {required: true, message: "流程单号不能为空", trigger: "blur"}
            ],
            mechineName: [
                { required: true, message: "机台号不能为空", trigger: "blur" }
            ],
            materialno: [
                { required: true, message: "物料编码不能为空", trigger: "blur" }
            ],
            result: [
                { required: true, message: "判定结果不能为空", trigger: "blur" }
            ],
            handler: [
                { required: true, message: "操作/技术员不能为空", trigger: "blur" }
            ],
            testNumber: [
                { required: true, message: "试验数量不能为空", trigger: "blur" }
            ],
            testCharge: [
                { required: true, message: "试验时机不能为空", trigger: "blur" }
            ],
        }
    });
    const testResult = ref([{label: "AC", value: "AC"}, {label: "RE", value: "RE"}]);
    const SJResult = ref([{label: "A.更换劈刀", value: "A.更换劈刀"}, {label: "B.修机", value: "B.修机"}, {
        label: "C.待料或停机8H以上新开机",
        value: "C.待料或停机8H以上新开机"
    },
        {label: "D.死机重启(4H以上重新开机）", value: "D.死机重启(4H以上重新开机）"}, {label: "E.保养", value: "E.保养"}, {
            label: "F.首件",
            value: "F.首件"
        }, {label: "G.巡检", value: "G.巡检"}]);
    const {queryParams, form, rules} = toRefs(data);
    function convertListValue(value) {
        var list = [];
        var val = JSON.parse(value)
        var bool = true;//都是空串
        for (var key in val) {
            if (val[key]) {
                bool = false;
                list.push(val[key]);
            } else
                list.push(" ");
        }
        var str = "";
        if (bool)
            return str;
        for (var i = 0; i < list.length; i++) {
            if (i == 4)
                str += "\r\n";
            if (i > 0)
                str += ",";
            str += list[i];
        }
        return str;
    }

    function getFlowInfo() {
        let flowno = form.value.flowno;
        if (!flowno || flowno.length < 8)
            return;
        getFlowBillInfo(flowno).then(response => {
            var obj = response
            form.value.materialno = obj.productId;
            form.value.materialname = obj.productName;
            form.value.specification = obj.specification.split("/")[0];
            form.value.xpdm = obj.xpxh
            form.value.xpph = obj.xpph
            form.value.khdm = obj.khdm
            form.value.xiancai = obj.xiancai;
        })
    }

    function handlerSearch(queryString, cb) {
        var arr = restaurants.value;
        var newArr = [];
        if (queryString && queryString.toLowerCase() != "null") {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].value.toLowerCase().indexOf(queryString.toLowerCase()) != -1) {
                    newArr.push({value: arr[i].value});
                }
            }
        } else {
            newArr = arr;
        }

        // 调用 callback 返回建议列表的数据
        cb(newArr);
    }

    function getHandlerList_pic() {
        getHandlerList().then(response => {
            restaurants.value = [];
            for (var i = 0; i < response.length; i++) {
                restaurants.value.push({value: response[i]});
            }
        })
    }

    function handlerSearch1(queryString, cb) {
        var arr = restaurants1.value;
        var newArr = [];
        if (queryString && queryString.toLowerCase() != "null") {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].value.toLowerCase().indexOf(queryString.toLowerCase()) != -1) {
                    newArr.push({value: arr[i].value});
                }
            }
        } else {
            newArr = arr;
        }

        // 调用 callback 返回建议列表的数据
        cb(newArr);
    }

    function getMechineList_pic() {
        getMechineList().then(response => {
            restaurants1.value = [];
            for (var i = 0; i < response.length; i++) {
                restaurants1.value.push({value: response[i]});
            }
        })
    }

    /** 查询焊线工序检测记录列表 */
    function getList() {
        loading.value = true;
        listGxjc(queryParams.value).then(response => {
            gxjcList.value = response.rows;
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
            flowno: null,
            materialno: null,
            materialname: null,
            specification: null,
            remark: null,
            mechineName: null,
            createdate: null,
            modifydate: null,
            khdm: null,
            handler: null,
            creator: null,
            updater: null,
            result: null,
            testCharge: null,
            xiancai: null,
            xianjing: null,
            hgcs: null,
            zdhg: null,
            qhd: null,
            qzj: null,
            xll: null,
            xtl: null
        };
        hgcsObj.value = {"no1": "", "no2": "", "no3": "", "no4": ""};
        zdhgObj.value = {"no1": "", "no2": "", "no3": "", "no4": ""};
        qhdObj.value = {"no1": "", "no2": "", "no3": "", "no4": ""};
        qzjObj.value = {"no1": "", "no2": "", "no3": "", "no4": ""};
        xllObj.value = {"no1": "", "no2": "", "no3": "", "no4": "", "no5": "", "no6": "", "no7": "", "no8": ""};
        xtlObj.value = {"no1": "", "no2": "", "no3": "", "no4": "", "no5": "", "no6": "", "no7": "", "no8": ""};
        proxy.resetForm("gxjcRef");
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
        title.value = "添加焊线工序检测记录";
    }

    function dialogOpen() {
        getHandlerList_pic();
        getMechineList_pic();
        // form.value.mechineName= Cookies.get("pic_mechineName")
        if (title.value == "添加焊线工序检测记录") {
            form.value.handler = Cookies.get("pic_handler")
        }

        proxy.$nextTick(function () {
            this.$refs.dialog_flowno_input.focus();
            this.$refs.dialog_flowno_input.select();
        })
    }
    function clickRow(row) {
        proxy.$refs.mytable.clearSelection();
        proxy.$refs.mytable.toggleRowSelection(row);
    }
    /** 修改按钮操作 */
    function handleUpdate(row) {
        reset();
        const _id = row.id || ids.value
        getGxjc(_id).then(response => {
            form.value = response.data;
            if (form.value.hgcs)
                hgcsObj.value = JSON.parse(form.value.hgcs);
            if (form.value.zdhg)
                zdhgObj.value = JSON.parse(form.value.zdhg);
            if (form.value.qhd)
                qhdObj.value = JSON.parse(form.value.qhd);
            if (form.value.qzj)
                qzjObj.value = JSON.parse(form.value.qzj);
            if (form.value.xll)
                xllObj.value = JSON.parse(form.value.xll);
            if (form.value.xtl)
                xtlObj.value = JSON.parse(form.value.xtl);
            open.value = true;
            title.value = "修改焊线工序检测记录";
        });
    }

    /** 提交按钮 */
    function submitForm() {
        proxy.$refs["gxjcRef"].validate(valid => {
            if (valid) {
                form.value.hgcs = JSON.stringify(hgcsObj.value);
                form.value.zdhg = JSON.stringify(zdhgObj.value);
                form.value.qhd = JSON.stringify(qhdObj.value);
                form.value.qzj = JSON.stringify(qzjObj.value);
                form.value.xll = JSON.stringify(xllObj.value);
                form.value.xtl = JSON.stringify(xtlObj.value);
                if (form.value.id != null) {
                    updateGxjc(form.value).then(response => {
                        proxy.$modal.msgSuccess("修改成功");
                        open.value = false;
                        getList();
                    });
                } else {
                    addGxjc(form.value).then(response => {
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
        proxy.$modal.confirm('是否确认删除焊线工序检测记录编号为"' + _ids + '"的数据项？').then(function () {
            return delGxjc(_ids);
        }).then(() => {
            getList();
            proxy.$modal.msgSuccess("删除成功");
        }).catch(() => {
        });
    }

    /** 导出按钮操作 */
    function handleExport() {
        proxy.download('tk_custom/gxjc/export', {
            ...queryParams.value
        }, `gxjc_${new Date().getTime()}.xlsx`)
    }

    getList();
</script>
<style>
    #mytable{
        height:calc(100vh - 230px)
    }
    .myitemdiv .el-input {
        margin-left: 20px;
        width: 80px;
        height: 40px;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
    }

    input[type="number"] {
        -moz-appearance: textfield;
    }

    .sss .el-form-item__content {
        align-items: center;
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        font-size: var(--font-size);
        line-height: 32px;
        min-width: 0;
        position: relative;
        margin-left: 0px !important;
    }

    .sss b {
        color: darkred;
    }
</style>
