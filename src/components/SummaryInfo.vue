<template>
  <!-- <h2 v-if="$slots.title"><slot name="title" /></h2> -->
  <h2 v-if="$slots.subtitle"><slot name="subtitle" /></h2>
  <p v-if="$slots.text"><slot name="text" /></p>
</template>

<script>
export default {};
</script>

<style></style>
