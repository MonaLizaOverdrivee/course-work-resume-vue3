<template>
  <div class="card card-w70">
    <h1 v-text="summaryBlocks.title"></h1>
    <div class="avatar">
      <img :src="summaryBlocks.avatar" />
    </div>
    <AppSummaryInfo v-for="itm in summaryBlocks.blockInfo" :key="itm">
      <template v-slot:[itm.type]>
        {{ itm.text }}
      </template>
    </AppSummaryInfo>
    <h3 v-show="!summaryBlocks.hasOwnProperty('blockInfo')">
      Добавьте первый блок, чтобы увидеть результат
    </h3>
  </div>
</template>

<script>
import AppSummaryInfo from "./SummaryInfo";

export default {
  props: {
    summaryBlocks: Array
  },
  components: {
    AppSummaryInfo
  }
};
</script>

<style></style>
