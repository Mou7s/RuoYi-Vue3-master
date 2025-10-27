<template>
  <div class="mainDiv">
    <div v-hasPermi="['tk_custom:pd:list']">
      <a href="workShop/pd" > 车间半成品盘点</a>

    </div>
    <div v-hasPermi="['tk_custom:pd_ck:list']">
      <a href="stockManage/tag" > 仓库盘点</a>
    </div>
    <div v-hasPermi="['tk_custom:chuku_xs:add']">
      <a href="stockManage/chuku_xs" > 销售出库</a>
    </div>
  </div>
</template>
<style>
  .mainDiv{
    display: flex;
    height: 60vh;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .mainDiv div{
    display: flex;
    align-items: center;
    width: 300px;
    justify-content: center;
    border: 1px solid lightblue;
    margin: 10px;
    border-radius: 5px;

  }
  .mainDiv a{
    font-size: 30px;
    color: cornflowerblue;
    font-weight: bold;
  }
</style>
