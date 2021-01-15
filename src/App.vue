<template>
  <div class="container column">
    <AppForm @submitForm="addInfo" :disabled="disableButton">
      <AppSelect v-model="blockType" />
      <AppTextAria v-model="blockValue" />
    </AppForm>
    <AppSummary :summaryBlocks="summaryBlocks" />
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
import AppSummary from "./components/AppSummary";
import AppSelect from "./components/AppSelect";
import AppForm from "./components/AppForm";
import AppTextAria from "./components/AppTextAria";

export default {
  data: () => ({
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
  mounted() {
    this.loadSummaryInfo();
  },
  methods: {
    async loadComments() {
      this.loading = true;
      const response = await fetch(process.env.VUE_APP_API_URL, {
        methods: "GET"
      });
      this.comments = await response.json();
      this.loading = false;
    },
    async loadSummaryInfo() {
      const response = await fetch(process.env.VUE_APP_API_URL, {
        method: "GET"
      });
      const firebaseData = await response.json();
      if (firebaseData) {
        this.summaryBlocks = Object.keys(firebaseData).map(key => {
          return {
            id: key,
            ...firebaseData[key]
          };
        });
      } else {
        this.summaryBlocks = [];
      }
    },
    async addInfo() {
      const response = await fetch(process.env.VUE_APP_API_URL, {
        method: "POST",
        "Content-Type": "aplication/json",
        body: JSON.stringify({
          type: this.blockType,
          value: this.blockValue
        })
      });
      const fireBaseResponse = await response.json();
      this.summaryBlocks.push({
        id: fireBaseResponse.name,
        type: this.blockType,
        value: this.blockValue
      });
      this.blockValue = "";
      this.blockType = "title";
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
