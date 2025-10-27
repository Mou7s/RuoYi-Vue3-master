<template>
<div style="display: flex;align-items: center;justify-content: center; background: #409eff;color: white;">
  <h3>车间登记</h3>
</div>
  <div v-if="submitStatus" style="display: flex;align-items: center;justify-content: center;height: 80vh;">信息提交成功！</div>
  <div class="app-container ss" v-else >
    <el-form :model="form" :rules="rules" ref="visitRef" label-width="95px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="姓      名" prop="name">
            <el-input v-model="form.name" clearable placeholder="请输入姓名" maxlength="100" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="原因描述" prop="reason">
            <el-input v-model="form.reason" clearable placeholder="请输入带手机进车间的原因" maxlength="200" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-form-item style="width:100%;">
      <el-button
              size="large"
              type="primary"
              style="width:100%;"
              @click.prevent="submitForm">
        <span >提交</span>
      </el-button>
    </el-form-item>

  </div>
</template>

<script setup name="workshopscan">
    //import {checkCarNumber,isIDCard } from "@/utils/validate";
    import {  scanWorkshop } from "@/api/tk_custom/workshop";
    import { parseTime } from '@/utils/ruoyi'
    const { proxy } = getCurrentInstance();
    const submitStatus=ref(false);
    const vTelephone=ref("");
    const data = reactive({
        form: {
            reason:"",
            name:""
        },
        rules: {
            name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
            reason: [{ required: true, message: "原因描述不能为空", trigger: "blur" }, { min: 2, max: 200, message: "原因描述长度必须介于 2 和 200 之间", trigger: "blur" }],
        }
    });

    const { form, rules } = toRefs(data);
    /** 提交按钮 */
    function submitForm() {
        proxy.$refs["visitRef"].validate(valid => {
            if (valid) {
                scanWorkshop(form.value).then(response => {
                    if(response.code=='200'){
                        submitStatus.value=true;
                    }else
                        submitStatus.value=false;
                });
            }else
                submitStatus.value=false;
        });

    };

</script>

<style>
  .el-dialog{
    display: flex;
    flex-direction: column;
    margin:0 !important;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    /*height:600px;*/
    max-height:calc(100% - 30px);
    max-width:calc(100% - 30px);
  }
  .el-dialog .el-dialog__body{
    flex:1;
    overflow: auto;
  }
  .el-form-item__content {
    align-items: center;
    justify-content: center;
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    font-size: var(--font-size);
    line-height: 32px;
    min-width: 0;
    position: relative;
  }
  .ss{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .el-form-item__label {
    align-items: flex-start;
    /* box-sizing: border-box; */
    color: var(--el-text-color-regular);
    display: inline-flex
  ;
    flex: 0 0 auto;
    font-size: var(--el-form-label-font-size);
    height: 32px;
    justify-content: flex-start;
    line-height: 32px;
    padding: 0 12px 0 0;
  }
</style>