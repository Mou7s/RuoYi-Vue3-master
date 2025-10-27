<template>
  <div style="display: flex;align-items: center;justify-content: center;    background: #409eff;color: white;border-radius: 5px;">
    <h3>来访登记-快速</h3>
  </div>
  <div v-if="submitStatus" style="display: flex;align-items: center;justify-content: center;height: 80vh;">信息提交成功！</div>
  <div class="app-container" v-else >
    <el-form :model="form" :rules="rules" ref="visitRef" label-width="95px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="联系电话"  prop="vTelephone" >
            <el-input v-model.trim="form.vTelephone" clearable placeholder="请输入电话号码" maxlength="20" />
          </el-form-item>
        </el-col>
      </el-row >
      <div v-if="open">
        <el-row>
          <el-col :span="24">
            <el-form-item label="入厂日期" prop="vDate" >
              <el-date-picker
                      v-model="form.vDate"
                      type="datetime"
                      value-format="YYYY-MM-DD HH:mm"
                      placeholder="选择日期"
                      style="width:calc(100vw - 135px)">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="访客姓名" prop="vName">
              <el-input v-model="form.vName" clearable placeholder="请输入访客姓名" maxlength="100" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
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
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="来访公司" prop="company">
              <el-input v-model="form.company" clearable placeholder="请输入来访公司" maxlength="100" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="车牌号" prop="carNumber">
              <el-input v-model.trim="form.carNumber" clearable placeholder="请输入车牌号" onkeyup="this.value=this.value.toUpperCase()" maxlength="10" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="来访人数" prop="peoplecount">
              <el-input type="number" v-model="form.peoplecount" clearable placeholder="请输入来访人数" maxlength="100" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="需要布鞋套" prop="needshoes">
              <el-select v-model="form.needshoes" placeholder="请选择">
                <el-option
                        v-for="dict in is_or_not"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="来访事由" prop="vReason">
              <el-input v-model="form.vReason" clearable placeholder="请输入来访事由" maxlength="200" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="被访人" prop="receiver">
              <el-input v-model.trim="form.receiver" clearable placeholder="请输入被访人" maxlength="20" />
            </el-form-item>
          </el-col>
        </el-row>
      </div>

    </el-form>
    <el-form-item style="width:100%;" v-if="!open">
      <el-button
              size="large"
              type="primary"
              style="width:200px;"
              @click.prevent="sure">
        <span >查询</span>
      </el-button>
    </el-form-item>
    <el-form-item style="width:100%;" v-else>
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

<script setup name="visit">
    import {isIDCard,checkCarNumber } from "@/utils/validate";
    import { simpleAddVisit,getVisitByTelephone} from "@/api/tk_custom/visit";
    import { parseTime } from '@/utils/ruoyi'
    const { proxy } = getCurrentInstance();
    const { is_or_not } = proxy.useDict("is_or_not");
    const { tk_visit_room } = proxy.useDict("tk_visit_room");
    const submitStatus=ref(false);
    const open = ref(false);
    const data = reactive({
        form: {
            vDate:parseTime(new Date(), '{y}-{m}-{d} {h}:{i}'),
            needshoes:'0',
            room:'0',
            successStatus:0
        },
        rules: {
            vDate: [{ required: true, message: "入厂日期不能为空", trigger: "blur" }],
            vName: [{ required: true, message: "访客名称不能为空", trigger: "blur" }, { min: 2, max: 20, message: "访客名称长度必须介于 2 和 20 之间", trigger: "blur" }],
            company: [{ required: true, message: "来访公司不能为空", trigger: "blur" }, { min: 2, max:100, message: "来访公司长度必须介于 2 和 100 之间", trigger: "blur" }],
            peoplecount: [{ required: true, message: "来访人数不能为空", trigger: "blur" }, { min: 1, max:100, message: "来访人数长度必须介于 2 和 100 之间", trigger: "blur" }],
            vReason: [{ required: true, message: "来访事由不能为空", trigger: "blur" }, { min: 2, max:200, message: "来访事由长度必须介于 2 和 200 之间", trigger: "blur" }],
            receiver: [{ required: true, message: "被访人不能为空", trigger: "blur" }, { min: 2, max:20, message: "被访人长度必须介于 2 和 20 之间", trigger: "blur" }],
            vTelephone: [{required: true, pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur" }],
            carNumber: [{required: true, validator: checkCarNumber, message: "请输入正确的车牌号码,例：粤B12345", trigger: "blur" }],
            vCardid: [{required: true, validator: isIDCard, message: "请输入正确的身份证号码", trigger: "blur" }, { min: 18, max:18, message: "请输入18位身份证号码", trigger: "blur" }]
        }
    });

    const { form, rules } = toRefs(data);
    // 取消按钮
    function cancel() {
        open.value = false;
    }
    // 确定按钮
    function sure() {
        proxy.$refs["visitRef"].validate(valid => {
            if (valid) {
                getVisitByTelephone(form.value.vTelephone).then(response=>{
                    if(response.data){
                        var obj=response.data;
                        form.value={
                            vDate:parseTime(new Date(), '{y}-{m}-{d} {h}:{i}'),
                            vName:obj.vName,
                            company:obj.company,
                            vTelephone:obj.vTelephone,
                            vCardid:obj.vCardid,
                            room:obj.room||'0',
                            carNumber:obj.carNumber,
                            peoplecount:obj.peoplecount,
                            needshoes:obj.needshoes,
                            receiver:obj.receiver
                        }
                        open.value = true;
                    }else{
                        proxy.$modal.alertError("没有查询到相关信息，请填写以下内容");
                        proxy.$router.push({path:'/scanAdd'});
                    }
                });
            }
        });


    }
    /** 提交按钮 */
    function submitForm() {
        proxy.$refs["visitRef"].validate(valid => {
            if (valid) {
                simpleAddVisit(form.value).then(response => {
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
</style>