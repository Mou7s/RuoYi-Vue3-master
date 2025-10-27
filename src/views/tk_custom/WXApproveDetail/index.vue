<template>
    <div style="font-size: 30px;
    background: cornflowerblue;
    display: flex
;
    align-items: center;
    justify-content: center;
    color: white;">审批详情
    </div>
    <div class="app-container">
        <div class="listmain">
            <el-descriptions :column="1" border labelClassName="label1">
                <el-descriptions-item label="申请人:">{{approveDetail["applyerUserid"]}}</el-descriptions-item>
                <el-descriptions-item label="携带人:">{{approveDetail["携带人"]}}</el-descriptions-item>
                <el-descriptions-item label="审核人:">{{approveDetail["auditerid"]}}</el-descriptions-item>
                <el-descriptions-item label="放行保安:">{{approveDetail["baoan"]}}</el-descriptions-item>
                <el-descriptions-item label="申请时间:">{{approveDetail["放行时间"]}}</el-descriptions-item>
                <el-descriptions-item label="外出时间:">{{approveDetail["outtime"]}}</el-descriptions-item>
                <el-descriptions-item label="返厂时间:">{{approveDetail["backtime"]}}</el-descriptions-item>
                <el-descriptions-item label="所属部门:">{{approveDetail["所属部门"]}}</el-descriptions-item>
                <el-descriptions-item label="补充说明:">{{approveDetail["补充说明"]}}</el-descriptions-item>
                <el-descriptions-item label="携带物品:">{{approveDetail["携带物品"]}}</el-descriptions-item>
                <el-descriptions-item label="车牌号:">{{approveDetail["carNumber"]}}</el-descriptions-item>
            </el-descriptions>
        </div>
        <div style="" v-for="item in imgList">
            <el-image
                    style="width:350px;"
                    fit="contain"
                    :src="item"
                    :preview-src-list="imgList">
            </el-image>
        </div>
    </div>
</template>

<script setup name="WXApprove">
    import {getWXApprove} from "@/api/tk_custom/WXApprove";

    const {proxy} = getCurrentInstance();

    const approveDetail = ref({});
    const imgList = ref([]);

    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return (false);
    }

    /** 查询微信审批列表 */
    function getList() {

        getWXApprove(getQueryVariable("spno")).then(response => {
            if (response.code = '200') {
                var detail = response.data;
                var content = detail.applyDataContents;
                var obj = JSON.parse(content);
                approveDetail.value = obj;
                approveDetail.value.outtime = detail.outtime;
                approveDetail.value.backtime = detail.backtime;
                approveDetail.value.applyerUserid = detail.applyerUserid;
                approveDetail.value.auditerid = detail.auditerid;
                if (obj.filepaths.length > 0) {
                    var list1 = obj.filepaths.split(",")
                    for (var i = 0; i < list1.length; i++) {
                        imgList.value.push("/prod-api/profile/wx_pic/" + list1[i] + ".png");
                    }

                }
            }
        });
    }


    getList();
</script>
<style>
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
        flex-direction: column;
        align-items: center;
        justify-content: center;
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