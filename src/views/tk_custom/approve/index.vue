<template>
<div style="display: flex;align-items: center;justify-content: center;height: 100vh;flex-direction:column">
    <el-form :model="form" :rules="rules" ref="visitRef" label-width="95px">
        <el-row>
            <el-col :span="24">
                <el-form-item label="入厂日期" prop="vDate" >
<span>123</span>
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
                <el-form-item label="联系电话" prop="vTelephone">
                    <el-input v-model.trim="form.vTelephone" clearable placeholder="请输入电话号码" maxlength="20" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-form-item label="身份证号码" prop="vCardid">
                    <el-input v-model.trim="form.vCardid" clearable placeholder="请输入身份证号码" maxlength="18" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-form-item label="车牌号" prop="carNumber">
                    <el-input v-model.trim="form.carNumber" clearable placeholder="请输入车牌号" onblur="this.value=this.value.toUpperCase()" maxlength="10" />
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
    </el-form>
</div>

</template>

<script setup name="approve">
    import {leaveFactory, lookScreenList} from "@/api/tk_custom/visit";
    import {parseTime} from '@/utils/ruoyi'


</script>

<style>

</style>

