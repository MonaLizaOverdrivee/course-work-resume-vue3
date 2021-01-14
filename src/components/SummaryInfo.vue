<template>
  <div style="position: relative">
    <h2 v-if="$slots.subtitle"><slot name="subtitle" /></h2>
    <p v-if="$slots.text"><slot name="text" /></p>
    <font-awesome-icon
      icon="trash-alt"
      class="icon-remove"
      @click="$emit('removeBlock', id)"
    />
  </div>
</template>

<script>
export default {
  emits: ["removeBlock"],
  props: ["id"]
};
</script>

<style scoped>
.icon-remove {
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  color: gray;
  transition: all 0.3s ease;
}
.icon-remove:hover {
  color: red;
}
</style>
