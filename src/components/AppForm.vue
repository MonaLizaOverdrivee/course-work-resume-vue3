<template>
  <form class="card card-w30" @submit.prevent="$emit('submitForm')">
    <slot />
    <button class="btn primary" type="submit" :disabled="disabled">
      Добавить
    </button>
  </form>
</template>

<script>
export default {
  emits: ["submitForm"],
  props: {
    disabled: Boolean
  }
};
</script>

<style></style>
