<template>
  <div class="app-container">
    <TalentTable></TalentTable>
  </div>
</template>
<script setup lang="ts" name="talentPool">
import TalentTable from "./TalentTable.vue";

</script>
<style lang="scss" scoped>
.app-container {
  padding: 20px;
  height: calc(100vh - 84px);
  overflow: auto;
}

</style>
