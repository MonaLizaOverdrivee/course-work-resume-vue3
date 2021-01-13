<template>
  <div class="container column">
    <AppForm @submitForm="addInfo" :disabled="disableButton">
      <AppSelect v-model="blockType" />
      <AppTextAria v-model="blockValue" />
    </AppForm>
    <AppSummary
      :avatar="avatar"
      :summaryBlocks="summaryBlocks"
      :titleSummary="titleSummary"
    />
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
    summaryBlocks: {}
  }),
  computed: {
    disableButton() {
      return this.blockValue.length < 4;
    },
    requestOptions() {
      const options = {};
      if (this.blockType === "avatar" || this.blockType === "title") {
        options.method = "PATCH";
        options.key = "summary";
        options.body = {
          [this.blockType]: this.blockValue
        };
      } else {
        options.method = "POST";
        options.key = "summary/blockInfo";
        options.body = {
          type: this.blockType,
          text: this.blockValue
        };
      }
      return options;
    }
  },
  mounted() {
    this.loadSummaryInfo();
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
    async loadSummaryInfo() {
      const response = await fetch(
        "https://vue-summary-default-rtdb.europe-west1.firebasedatabase.app/summary.json",
        {
          method: "GET"
        }
      );
      this.summaryBlocks = await response.json();
    },
    async addInfo() {
      await fetch(
        `https://vue-summary-default-rtdb.europe-west1.firebasedatabase.app/${this.requestOptions.key}.json`,
        {
          method: this.requestOptions.method,
          "Content-Type": "aplication/json",
          body: JSON.stringify({
            ...this.requestOptions.body
          })
        }
      );
      // const firebase = await response.json();
      // if (this.blockType === "avatar") {
      //   this.summaryBlocks.avatar = this.blockValue;
      // } else if (this.blockType === "title") {
      //   this.summaryBlocks.title = this.blockValue;
      // } else {
      //   this.summaryBlocks.blockInfo = {
      //     [firebase.name]: {
      //     type: this.blockType,
      //     text: this.blockValue
      //     }
      //   };
      //   console.log(this.summaryBlocks)
      // }
      console.log(this.requestOptions.body);
      this.loadSummaryInfo();
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
