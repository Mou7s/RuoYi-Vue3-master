<template>
  <div class="app-container" >
<div>
  <div class="title">
    待放行列表(人员)
  </div>
  <div class="content" v-cloak>
    <el-row v-for="(o, index) in WXApproveListForOut" >
      <el-col  :key="o" >
        <el-card :body-style="{ padding: '0px' }">
            <div  class="listmain" >
              <el-descriptions :column="1" border labelClassName="label1">
                <el-descriptions-item label="外出人:">{{o["applyuser"]}}</el-descriptions-item>
                <el-descriptions-item label="外出地点:">{{o["外出地点"]}}</el-descriptions-item>
                <el-descriptions-item label="开始时间:">{{o["外出"]["starttime"]}}</el-descriptions-item>
                <el-descriptions-item label="结束时间:">{{o["外出"]["endtime"]}}</el-descriptions-item>
                <el-descriptions-item label="外出时长:">{{o["外出"]["time"]}}</el-descriptions-item>
                <el-descriptions-item label="审核人:">{{o["autiduser"]}}</el-descriptions-item>
              </el-descriptions>
              <div class="btnscls">
                <button @click="outFactory(o.spno)">放行</button>
              </div>
            </div>
        </el-card>
      </el-col>
    </el-row>
  </div>

</div>
    <div>
      <div class="title" style="    background: burlywood;">
        待确认返厂列表(人员)
      </div>
 <div class="content">
   <el-row v-for="(o, index) in WXApproveListForBack">
     <el-col  :key="o" >
       <el-card :body-style="{ padding: '0px' }">
         <div  class="listmain" >
           <el-descriptions :column="1" border>
             <el-descriptions-item label="外出人:">{{o["applyuser"]}}</el-descriptions-item>
             <el-descriptions-item label="外出地点:">{{o["外出地点"]}}</el-descriptions-item>
             <el-descriptions-item label="开始时间:">{{o["外出"]["starttime"]}}</el-descriptions-item>
             <el-descriptions-item label="结束时间:">{{o["外出"]["endtime"]}}</el-descriptions-item>
             <el-descriptions-item label="外出时长:">{{o["外出"]["time"]}}</el-descriptions-item>
             <el-descriptions-item label="审核人:">{{o["autiduser"]}}</el-descriptions-item>
           </el-descriptions>
           <div class="btnscls">
             <button @click="backFactory(o.spno)">已返厂</button>
           </div>
         </div>
       </el-card>
     </el-col>
   </el-row>
 </div>
    </div>

  </div>
</template>

<script setup name="WXApprove">
import { listWXApprove,listWXApproveForOut1,listWXApproveForBack1,updateOutTime,updateBackTime, getWXApprove, delWXApprove, addWXApprove, updateWXApprove } from "@/api/tk_custom/WXApprove";

const { proxy } = getCurrentInstance();
const autoRefresh = ref(true);
const WXApproveList = ref([]);
const WXApproveListForOut = ref([]);
const WXApproveListForOutImg = ref([]);
const WXApproveListForBack = ref([]);
const WXApproveListForBackImg = ref([]);
const data = reactive({
  form: {},
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
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询微信审批列表 */
function getList() {
    if(!autoRefresh.value)
        return;
    listWXApproveForBack1(queryParams.value).then(response => {
        WXApproveListForBack.value=[];
        WXApproveListForBackImg.value=[];
        var list=response.rows;
        for(var i=0;i<list.length;i++){
            var json=JSON.parse(list[i].applyDataContents);
            json.spno=list[i].spNo;
            json.applyuser=list[i].applyerUserid;
            json.autiduser=list[i].auditerid;
            json["外出"]=JSON.parse(json["外出"]);
            var listImg=[];
            if(json.filepaths.length>0){
                var arr=json.filepaths.split(",");
                for(var j=0;j<arr.length;j++){
                    listImg.push("/prod-api/profile/wx_pic/"+arr[j]+".png");
                }
                json.filepaths=listImg[0].replace("/wx_pic/","/pic_zip/");
            }
            json.imgList=listImg;
          // WXApproveListForBackImg.value.push(json.filepaths)
          WXApproveListForBack.value.push(json)
      }
  });
    listWXApproveForOut1(queryParams.value).then(response => {
        WXApproveListForOut.value=[];
        WXApproveListForOutImg.value=[];
        var list=response.rows;
        for(var i=0;i<list.length;i++){
            var json=JSON.parse(list[i].applyDataContents);
            json.spno=list[i].spNo;
            json.applyuser=list[i].applyerUserid;
            json.autiduser=list[i].auditerid;
            json["外出"]=JSON.parse(json["外出"]);
            var listImg=[];
            if(json.filepaths.length>0){
                var arr=json.filepaths.split(",");
                for(var j=0;j<arr.length;j++){
                    listImg.push("/prod-api/profile/wx_pic/"+arr[j]+".png");
                }
                json.filepaths=listImg[0].replace("/wx_pic/","/pic_zip/");
            }
            json.imgList=listImg;

            // WXApproveListForOutImg.value.push(json.filepaths)
            WXApproveListForOut.value.push(json)
        }
    });
}

function backFactory(spno) {
    autoRefresh.value=false;
    proxy.$modal.confirm("是否确认返厂？","警告",{
        confirmButtonText:"确认",
        cancelButtonText:"取消",
        showclose:true,//是否显示右上角关闭按钮
        type:"warning"//提示类型
    }).then(function () {
        updateBackTime(spno).then(response=>{
            autoRefresh.value=true;
            if(response.code!=200){
                proxy.$modal.msgError("更新失败！");
            }else{
                proxy.$modal.msgSuccess("更新成功");
                getList();
            }
        })
    }).catch(function (e) {
        autoRefresh.value=true;
    });

}
function outFactory(spno) {
    autoRefresh.value=false;
    proxy.$modal.confirm("是否确认出厂？","警告",{
        confirmButtonText:"确认",
        cancelButtonText:"取消",
        showclose:true,//是否显示右上角关闭按钮
        type:"warning"//提示类型
    }).then(function () {
        updateOutTime(spno).then(response=>{
            autoRefresh.value=true;
            if(response.code!=200){
                proxy.$modal.msgError("更新失败！");
            }else{
                proxy.$modal.msgSuccess("更新成功");
                getList();
            }
        })
    }).catch(function (e) {
        autoRefresh.value=true;
    });

}
getList();
var h = setInterval(function () {
    getList();
}, 1000*3);
</script>
<style>
  [v-cloak] {
    display: none;
  }
  [v-cloak] > * {
    display: none;
  }
  .el-descriptions__label.el-descriptions__cell.is-bordered-label {
    background: var(--el-descriptions-item-bordered-label-background);
    color: var(--el-text-color-regular);
    font-weight: bold;
    width: 150px;
  }
  .el-descriptions__body .el-descriptions__table .el-descriptions__cell
  {
    box-sizing: border-box;
    font-size: 25px;
    font-weight: bold;
    line-height: 23px;
    text-align: left;
  }
  .content{
    border: 5px solid darkseagreen;
    margin: 5px;
    /* background: #ff8f80; */
    border-radius: 10px;
    height: 90vh;
    overflow: auto;
    padding: 5px;
  }
  .title{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    background: cornflowerblue;
    color: white;
    height: 60px;
  }
  .app-container{
       display: flex;
    overflow: hidden;
    height: 100%;
     }
  .app-container div{
    flex: 1;
    margin-top: 3px;
  }
  .listmain{
    position: relative;
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 24px;
    font-weight: bold;
  }
  .listmain div{
    margin-top: 3px;
  }
  .btnscls{
    position:absolute;
    top: -20px;
    right: -20px;
    display: flex;
    flex-direction: row;
    width: 80px;
    font-size: 16px;
    font-weight: bold;
  }
  .btnscls button{
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