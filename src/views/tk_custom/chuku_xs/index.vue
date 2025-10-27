<template>
    <div class="app-container">
        <div class="tip"  v-show="!open">
            请扫描【销售出库单】的二维码，点击下方按钮即可扫描。
        </div>
        <div class="top" v-show="open">
            当前【销售出库单】单号为：{{billno}},共{{total}}条数据
        </div>
        <template v-for="item in chukuList">
            <div class="listmain">
                <div>
                    <span class="label_own">物料编码:</span> <span class="content_own">{{item.fnumber}}</span>
                </div>
                <div>
                    <span class="label_own">物料名称:</span> <span class="content_own">{{item.fmaterialname}}</span>
                </div>
                <div style="display: flex;">
                    <div style="flex: 1">
                        <span class="label_own">封装:</span> <span class="content_own">{{item.fmateriamodel}}</span>
                    </div>
                </div>
                <!--<div style="display: flex;">-->
                    <!--<div style="flex: 1">-->
                        <!--<span class="label_own">批号:</span> <span class="flot">{{item.flot}}</span>-->
                    <!--</div>-->
                <!--</div>-->
                <div style="display: flex;">
                    <div style="flex: 1">
                        <span class="label_own">应发数量:</span> <span class="content_own">{{item.fmustqty}}</span>
                    </div>
                    <div style="flex: 1">
                        <span class="label_own">实发数量:</span> <span class="content_own">{{item.frealqty}}</span>
                    </div>
                    <div class="btnscls">
                        <button class="btnedit" v-show="item.isselect">已拣货</button>
                        <button class="btnedit1" v-show="!item.isselect">未拣货</button>
                    </div>
                </div>
                <div style="display: flex;">
                    <div style="flex: 1">
                        <span class="label_own">仓库:</span> <span class="content_own">{{item.stockname}}·{{item.stocklocname}}</span>
                    </div>
                </div>
                <div style="display: flex;">
                    <div style="flex: 1">
                        <span class="label_own">备注:</span> <span class="content_own">{{item.fentrynote}}</span>
                    </div>
                </div>

                <div>
                </div>

            </div>
        </template>
        <div style="width: 100vw;display: flex" v-show="open">
            <button class="btnaudit" @click="scan">拣 货</button><button class="btnaudit2" @click="out">退 出</button><button class="btnaudit1" @click="submit()">审 核 出 库</button>
        </div>
        <img class="scan" v-show="!open" @click="scan" src="../../../assets/icons/scan.png"/>
    </div>
</template>
<script setup name="Pd_ck">
    import {list, audit} from "@/api/tk_custom/chuku_xs";

    const {proxy} = getCurrentInstance();
    //销售出库列表
    const chukuList = ref([]);
    const open = ref(false);
    const loading = ref(true);
    const billno=ref("");
    const total=ref(0);
    const isItem=ref(false);
    /** 查询 */
    function getList(id) {
        loading.value = true;
        list(id).then(response => {
            if(response.length>0){
                var result=response[0];
                if(result.auditstatus=='C'){
                    proxy.$modal.msgError("此单已经审核出库!");
                    open.value=false;
                }else{
                    billno.value=result.billno;
                    total.value=response.length;
                    chukuList.value = response;
                    open.value=true;
                }
            }else{
                proxy.$modal.msgError("未查询到相关数据!");
                open.value=false;
            }
            loading.value = false;
        });
    }
    function scan() {
        try {
            AndroidJs.scan();
        } catch {
            proxy.$modal.msgError("请安装指定APP!");
        }

    }
    function out() {
        proxy.$modal.confirm("是否退出当前订单？","警告",{
            confirmButtonText:"确认",
            cancelButtonText:"取消",
            showclose:true,//是否显示右上角关闭按钮
            type:"warning"//提示类型
        }).then(function () {
            reset();
        });

    }
    window.getBarCodeResult = function (item) {
        if(item.indexOf("{")!=-1){
            var obj=JSON.parse(item);
            var list=chukuList.value;
            var needthis=false;
            var isSelect=false;
            for(var i=0;i<list.length;i++){
                if(!list[i]["isselect"]&&list[i]["fnumber"]==obj["编码"]){
                    list[i].isselect=true;
                    isSelect=true;
                    proxy.$modal.msgSuccess("拣货成功!");
                    break;
                }
            }
            for(var i=0;i<list.length;i++){
                if(!list[i]["isselect"]&&list[i]["fnumber"]==obj["编码"]) {
                    needthis=true;
                    break;
                }
                }
            if(!needthis&&!isSelect){
                proxy.$modal.msgError("当前订单不需要此类货物!");
            }
        }else{
            getList(item)
        }
    };

    // 列表重置
    function reset() {
        chukuList.value = [];
        open.value = false;
    }

    /** 提交按钮 */
    function submit() {
        var needTip=false;
        var list=chukuList.value;
        for(var i=0;i<list.length;i++){
            if(!list[i]["isselect"]) {
                needTip=true;
                break;
            }
        }
        if(needTip){
            proxy.$modal.confirm("当前货物未挑拣完毕，是否继续审核单据？","警告",{
                confirmButtonText:"确认",
                cancelButtonText:"取消",
                showclose:true,//是否显示右上角关闭按钮
                type:"warning"//提示类型
            }).then(function () {
                audit_ck();
            });
        }else{
            audit_ck();
        }
    }
    function test() {
        proxy.$modal.confirm("【审核失败】!","错误",{
            confirmButtonText:"确认",
            cancelButtonText:'关闭',
            showclose:false,//是否显示右上角关闭按钮
            type:"error"//提示类型
        }).then(function () {

        });
    }
    function audit_ck() {
        audit(billno.value).then(response => {
            if(response.success==0){
                proxy.$modal.confirm("【审核失败】!"+response.Message,"错误",{
                    confirmButtonText:"确认",
                    cancelButtonText:"取消",
                    showclose:true,//是否显示右上角关闭按钮
                    type:"erroring"//提示类型
                }).then(function () {

                });
            }else{
                proxy.$modal.msgSuccess("出库审核成功!");
                reset();
            }
            // reset();
            loading.value = false;
        });
    }
    //"TK202504030002"
    // getList("TK202504030002");
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
        width: 60px;
    }
    .btnaudit2{
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
    .btnaudit1{
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
.btnaudit{
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
    .tip{
        text-align: center;
        margin-top: 50px;
        font-size: 16px;
    }
</style>
