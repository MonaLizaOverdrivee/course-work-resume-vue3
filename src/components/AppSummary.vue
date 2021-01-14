<template>
  <div class="card card-w70">
    <h1 v-text="summaryBlocks.title"></h1>
    <div class="avatar">
      <img :src="summaryBlocks.avatar" />
    </div>
    <AppSummaryInfo
      v-for="(itm, key) in summaryBlocks.blockInfo"
      :key="key"
      :id="key"
      @removeBlock="remove"
    >
      <template v-slot:[itm.type]>
        {{ itm.text }}
      </template>
    </AppSummaryInfo>
    <h3 v-show="showMsg">
      Добавьте новый блок или измените заголовок с аватаром
    </h3>
  </div>
</template>

<script>
import AppSummaryInfo from "./SummaryInfo";

export default {
  emits: ["removeBlockFb"],
  props: {
    summaryBlocks: Array
  },
  computed: {
    showMsg() {
      return (
        !("blockInfo" in this.summaryBlocks) ||
        Object.keys(this.summaryBlocks.blockInfo).length === 0
      );
    }
  },
  components: {
    AppSummaryInfo
  },
  methods: {
    remove(id) {
      this.$emit("removeBlockFb", id);
    }
  }
};
</script>

<style></style>
