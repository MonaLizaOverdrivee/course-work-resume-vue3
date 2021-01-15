<template>
  <div class="card card-w70">
    <component
      v-for="itm in summaryBlocks"
      :key="itm.id"
      :is="`app-${itm.type}`"
      :data="itm.value"
    ></component>
    <h3 v-show="summaryBlocks.length === 0">
      Добавьте новый блок что бы увидеть результат
    </h3>
  </div>
</template>

<script>
import AppTitle from "./AppTitle";
import AppSubtitle from "./AppSubtitle";
import AppText from "./AppText";
import AppAvatar from "./AppAvatar";

export default {
  props: {
    summaryBlocks: {
      type: Array,
      validate(val) {
        return Array.isArray(val);
      }
    }
  },
  components: {
    AppTitle,
    AppSubtitle,
    AppText,
    AppAvatar
  }
};
</script>
