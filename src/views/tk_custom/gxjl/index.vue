<template>
    <div class="mainDiv">
        <el-form :model="form" :rules="rules" ref="visitRef" label-width="95px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="流程单号" prop="vDate" >
                        <el-input v-model="form.FBillNo" clearable placeholder="请扫描或输入完整的流程单号" maxlength="100"   @keyup="query_gxjh"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="生产订单号" prop="FMONumber">
                        <el-input v-model="form.FMONumber" clearable  maxlength="100" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="产品名称" prop="FProductName">
                        <el-input v-model="form.FProductName" clearable  maxlength="100" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="规格型号" prop="FProSpecification">
                        <el-input v-model="form.FProSpecification" clearable  maxlength="100" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="工艺" prop="FRouteId">
                        <el-input v-model="form.FRouteId" clearable  maxlength="100" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="合格数量" prop="FQualifiedQty">
                        <el-input v-model="form.FQualifiedQty" clearable placeholder="请输入合格数量" maxlength="100" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="不良数量" prop="company">
                        <el-input v-model="form.company" clearable placeholder="请输入不良数量" maxlength="100" />
                    </el-form-item>
                </el-col>
            </el-row>

        </el-form>
        <div style="display: flex;align-items: center;justify-content: center" >
            <el-button
                size="large"
                type="primary"
                style="width:300px;"
                @click.prevent="sumbitData">
            <span >提交</span>
        </el-button>
        </div>
    </div>


</template>

<script setup name="gxjl">
    import { getObj_gxjh,queryByBillNo,save} from "@/api/tk_custom/gxjl";
    import { parseTime } from '@/utils/ruoyi'
    const { proxy } = getCurrentInstance();
    const submitStatus=ref(false);
    const open = ref(false);
    const data = reactive({
        form: {
            "FBillNo": "",
            "FMONumber": "",
            "FRouteId": "",
            "FOperQty": "",
            "FQualifiedQty": "",
            "FProductId": "",
            "FProductName": "",
            "FProSpecification": ""
        },
        rules: {

        }
    });
    const { form, rules } = toRefs(data);
    function query_gxjh() {
         queryByBillNo().then(response => {
             form.value.FBillNo=response.FBillNo;
             form.value.FMONumber=response.FMONumber;
             form.value.FRouteId=response.FRouteId;
             form.value.FOperQty=response.FOperQty;
             form.value.FQualifiedQty=response.FQualifiedQty;
             form.value.FProductId=response.FProductId;
             form.value.FProductName=response.FProductName;
             form.value.FProSpecification=response.FProSpecification;
        });
    }
    function sumbitData() {
        var obj={};
        obj.data=form.value;
        save(obj).then(response=>{

        })
    }
</script>
<style>
    .mainDiv{
        align-items:start;
        background: #edf2fa;
        padding-top: 100px;
        height: 100vh;
    }
</style>