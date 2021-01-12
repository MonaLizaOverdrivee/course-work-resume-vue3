<template>
  <div class="container column">
    <AppForm @submitForm="addInfo" :disabled="disableButton">
      <AppSelect v-model="blockType" />
      <AppTextAria v-model="blockValue" />
    </AppForm>
    <AppSummary :avatar="avatar" :summaryBlocks="summaryBlocks" />
  </div>
  <div class="container">
    <p>
      <button class="btn primary" @click="loadComments">
        Загрузить комментарии
      </button>
    </p>
    <AppLoader v-if="loading" />
    <AppComents :comments="comments" v-else />
  </div>
</template>

<script>
import AppComents from "./components/AppComents.vue";
import AppLoader from "./components/AppLoader";
import AppForm from "./components/AppForm";
import AppSummary from "./components/AppSummary";
import AppSelect from "./components/AppSelect";
import AppTextAria from "./components/AppTextAria";

export default {
  data: () => ({
    avatar:
      "https://cdn.dribbble.com/users/5592443/screenshots/14279501/drbl_pop_r_m_rick_4x.png",
    blockType: "title",
    blockValue: "",
    comments: [],
    loading: false,
    summaryBlocks: []
  }),
  computed: {
    disableButton() {
      return this.blockValue.length < 4;
    }
  },
  methods: {
    async loadComments() {
      this.loading = true;
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments?_limit=42",
        {
          methods: "GET"
        }
      );
      this.comments = await response.json();
      this.loading = false;
    },
    addInfo() {
      if (this.blockType === "avatar") {
        this.avatar = this.blockValue;
        this.blockValue = "";
      } else {
        this.summaryBlocks.push({
          type: this.blockType,
          text: this.blockValue
        });
        this.blockValue = "";
      }
    }
  },
  components: {
    AppLoader,
    AppComents,
    AppForm,
    AppSummary,
    AppSelect,
    AppTextAria
  }
};
</script>

<style>
.avatar {
  display: flex;
  justify-content: center;
}

.avatar img {
  width: 150px;
  height: auto;
  border-radius: 50%;
}
</style>
