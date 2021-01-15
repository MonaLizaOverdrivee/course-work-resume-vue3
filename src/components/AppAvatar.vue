<template>
  <div class="avatar">
    <img :src="data" />
  </div>
</template>

<script>
export default {
  props: {
    data: String
  }
};
</script>
