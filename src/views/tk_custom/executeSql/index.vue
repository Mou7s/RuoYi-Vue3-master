<template>
  <div class="app-container" v-loading="loading">
   <div class="btnitem ">
     <el-date-picker ref="lingliao"
                     v-model="updatelingliaotime"
             type="date"
             value-format="YYYY-MM"
             placeholder="选择日期"
            ></el-date-picker>
     <el-button @click="updateLingliao">更新未领料信息</el-button>
   </div>
      <div class="btnitem " >
          <el-date-picker
                          v-model="deletePZtime"
                          type="date"
                          value-format="YYYY-M"
                          placeholder="选择日期"
          ></el-date-picker>
          <el-button  @click="deletePZFun">反审并删除期末在产品成本调整</el-button>
      </div>
      <div class="btnitem " >
          <el-button  @click="handleCBDataFun">优化成本数据</el-button>
      </div>
      <div class="btnitem " >
          <el-button  @click="buildIndexOfKingdeeFun">重建索引</el-button>
      </div>
      <div class="btnitem " >
          <el-button  @click="writeToMOFun">更新工序计划单号 → 生产订单</el-button>
      </div>
  </div>
</template>

<script setup name="executeSql">
import { writeToMO,updateTimeOfGXLL,deletePZ,handleCBData,buildIndexOfKingdee} from "@/api/tk_custom/executeSql";
const { proxy } = getCurrentInstance();
const updatelingliaotime=ref("");
const deletePZtime=ref("");
const loading=ref(false);
function updateLingliao() {
    proxy.$nextTick(function () {
        proxy.$modal.confirm("是否更新未领料信息？","警告",{
            confirmButtonText:"确认",
            cancelButtonText:"取消",
            showclose:true,//是否显示右上角关闭按钮
            type:"warning"//提示类型
        }).then(function () {
            loading.value=true;
            updateTimeOfGXLL({dateStr:updatelingliaotime.value}).then(response=>{
                loading.value=false;
                if(response==1)
                    proxy.$modal.msgSuccess("执行未领料信息成功");
                else
                    proxy.$modal.msgError("执行未领料信息失败！！！");
            });
        });

    })

}
function deletePZFun() {
    proxy.$nextTick(function () {
        proxy.$modal.confirm("是否反审并删除期末在产品成本调整？","警告",{
            confirmButtonText:"确认",
            cancelButtonText:"取消",
            showclose:true,//是否显示右上角关闭按钮
            type:"warning"//提示类型
        }).then(function () {
            loading.value=true;
            deletePZ({dateStr:deletePZtime.value}).then(response=>{
                loading.value=false;
                if(response==1)
                    proxy.$modal.msgSuccess("删除成功");
                else
                    proxy.$modal.msgError("删除失败！！！");

            })
        });

    })
}
function writeToMOFun() {
    proxy.$nextTick(function () {
        proxy.$modal.confirm("是否执行反写工序计划单号到生产订单？","警告",{
            confirmButtonText:"确认",
            cancelButtonText:"取消",
            showclose:true,//是否显示右上角关闭按钮
            type:"warning"//提示类型
        }).then(function () {
            loading.value=true;
            writeToMO().then(response=>{
                loading.value=false;
                if(response==1)
                    proxy.$modal.msgSuccess("执行成功");
                else
                    proxy.$modal.msgError("执行失败！！！");

            })
        });

    })
}
function handleCBDataFun() {
    proxy.$nextTick(function () {
        proxy.$modal.confirm("是否执行优化成本数据，该操作耗时较高？执行最终结果请查看企微消息","警告",{
            confirmButtonText:"确认",
            cancelButtonText:"取消",
            showclose:true,//是否显示右上角关闭按钮
            type:"warning"//提示类型
        }).then(function () {
            loading.value=true;
            handleCBData().then(response=>{
                loading.value=false;
                if(response==1)
                    proxy.$modal.msgSuccess("执行成功");
                else
                    proxy.$modal.msgError("执行失败！！！");

            })
        });

    })
}
function buildIndexOfKingdeeFun() {
    proxy.$nextTick(function () {
        proxy.$modal.confirm("是否执行数据库索引重建，该操作耗时很高？执行最终结果请查看企微消息？","警告",{
            confirmButtonText:"确认",
            cancelButtonText:"取消",
            showclose:true,//是否显示右上角关闭按钮
            type:"warning"//提示类型
        }).then(function () {
            loading.value=true;
            buildIndexOfKingdee().then(response=>{
                loading.value=false;
                if(response==1)
                    proxy.$modal.msgSuccess("执行成功");
                else
                    proxy.$modal.msgError("执行失败！！！");

            })
        });

    })
}
</script>
<style>
  .btnitem{
    margin-top: 10px;
    background: gainsboro;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction:column;
  }
  .btnitem button{
   background: cornflowerblue;
    color: white;
    margin-top: 10px;
  }
</style>