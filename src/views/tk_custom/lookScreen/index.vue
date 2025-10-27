<template>
    <div class="common-layout">
        <el-container>
            <el-header width="calc(100vw - 50px)">
                <el-row>
                    <el-col :span="12">
                        <div style="display: flex;align-items: center;justify-content: center;height: 60px;font-size: 30px;font-weight: bold">
                            需要确认
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div style="display: flex;align-items: center;justify-content: center;height: 60px;color:darkseagreen;font-size: 30px;font-weight: bold">
                            可直接放行
                        </div>
                        <span style=" position: absolute;top: 1px;right: 10px;height: 60px;font-size:18px;">当前时间：{{ parseTime(currentTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
                        <el-switch
                                style=" position: absolute;bottom: 1px;right: 10px;height: 30px;"
                                v-model="isRefresh"
                                active-value="1"
                                inactive-value="0"
                                active-text="自动刷新"
                                @change="handleStatusChange()"
                        ></el-switch>

                    </el-col>
                </el-row>
            </el-header>
            <el-container>
                <el-main width="calc(50vw - 100px)" style="height: calc(100vh - 10px);background: #f0f3f4">
                    <div id="content1" style="border: 5px solid cornflowerblue;border-radius: 10px;"></div>
                </el-main>
                <el-main width="calc(50vw - 100px)"
                         style="height: calc(100vh - 10px);background: #f0f3f4;color:darkseagreen">
                    <div id="content2" style="border: 5px solid cornflowerblue;border-radius: 10px;">
                    </div>
                </el-main>
            </el-container>
        </el-container>

    </div>

</template>

<script setup name="LookScreen">
    import {leaveFactory, lookScreenList} from "@/api/tk_custom/visit";
    import {parseTime} from '@/utils/ruoyi'

    const isRefresh = ref("0");
    const currentTime = ref(new Date());
    const {proxy} = getCurrentInstance();

    function start() {
        getList();
    }

    function handleStatusChange() {
        xunhuan();
    }

    var Ds = null;

    function xunhuan() {
        if (isRefresh.value == 1){
            if(Ds==null)
                Ds = setInterval(function () {
                    if (isRefresh.value==0)
                        return;
                    getList();
                }, 3000);
        }
    }

    window.leaveFactoryO = function (id) {
        leaveFactory({id: id}).then(resopnse => {
            getList();
        });
    }

    /** 查询来访登记列表 */
    function getList() {
        currentTime.value = new Date();
        lookScreenList({"vDate": null}).then(response => {
            var data = response.rows;
            var html1 = "", html2 = "";
            if (data && data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var obj = data[i];
                    var shoe = "否";
                    if (obj.needShoes == 1)
                        shoe = "是";
                    var str = "<div class=\"ibox\">\n" +
                        "                    <div class=\"ibox-title\">\n" +
                        "                        <h3 style=\"color: dodgerblue\">访客信息</h3>\n" +
                        "                    </div>\n" +
                        "                    <div class=\"ibox-content\">\n" +
                        "                        <div><span>入厂时间：</span>" + parseTime(obj.vDate, '{y}-{m}-{d} {h}:{i}') + "\n" +
                        "<button style='position: absolute;right: 5px;width: 40px;background: cornflowerblue;color: white;border: 0px; font-size: 24px;padding:5px;border-radius: 5px;cursor: pointer;' " +
                        "onclick='leaveFactoryO(\"" + obj.id + "\")' > 确\n认\n出\n厂</button></div>\n" +
                        "                        <div><span>访客姓名：</span>" + obj.vName + "</div>\n" +
                        "                        <div><span>手机号码：</span>" + obj.vTelephone + "</div>\n" +
                        "                        <div><span>车牌号码：</span>" + obj.carNumber + "</div>\n" +
                        "                        <div><span>来访公司：</span>" + obj.company + "</div>\n" +
                        "                        <div><span>来访事由：</span>" + obj.vReason + "</div>\n" +
                        "                        <div><span>来访人数：</span>" + obj.peoplecount + "</div>\n" +
                        "                        <div><span>需要鞋套(布)：</span>" + shoe + "</div>\n" +
                        "                        <div><span> 被 访 人 ：</span>" + obj.receiver + "</div>\n" +
                        "                    </div>\n" +
                        "                </div>";
                    if (obj.approve == "Y")
                        html2 += str;
                    else
                        html1 += str;
                }
                document.getElementById("content1").innerHTML = html1
                document.getElementById("content2").innerHTML = html2
                //TODO
            } else {
                document.getElementById("content1").innerHTML = ""
                document.getElementById("content2").innerHTML = ""
            }
        });
    }

    start();
</script>

<style>
    .volume-wrapper {
        display: flex; /* flex布局 */

        justify-content: flex-start; /* 左对齐 */

        flex-wrap: wrap; /* 换行 */

    }

    .ibox {
        margin-bottom: 10px;
        padding: 15px;
        background-color: #fff;
        border: 1px solid #dee5e7;
        border-radius: 4px;
        -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
        box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
    }

    .passDiv {
        background: mediumseagreen;
        width: 76px;
        border-radius: 5px;
        text-align: center;
        height: 30px;
        font-size: 15px;
        line-height: 30px;
        color: white;
    }

    .flexCenter {
        display: flex;
        align-items: center;
        justify-content: right;
    }

    .ibox-content {
        font-size: 24px;
        clear: both;
        position: relative;
    }

    .ibox-content div span {
        font-weight: bold;
    }

    .middleDiv {
        border: 10px solid deepskyblue;
        width: 10px;
        margin: 50px;
    }

    #div2 {
        /*background: darkseagreen;*/
        color: darkseagreen;
        /*color: #ff8f80;*/
    }

    #div2, #div1 {
        border: 5px solid darkseagreen;
        margin: 5px;
        /*background: #ff8f80;*/
        border-radius: 10px;
        height: 90vh;
        overflow: auto;
        padding: 5px;
    }

    h4 {
        text-align: center;
        font-size: 24px;
    }

    #refresh, .mybtn {
        height: 40px;
        border: 1px solid;
        font-size: 20px;
        color: white;
        background: cornflowerblue;
        border-radius: 5px;
        text-align: center;
        margin-right: 10px;
        margin-top: 10px;
    }

    ::backdrop {
        z-index: 0;
        background-color: #f0f3f4 !important;
    }

    html, *:fullscreen, *:-webkit-full-screen, *:-moz-full-screen {
        background-color: white !important;
        z-index: 1;
    }
</style>

