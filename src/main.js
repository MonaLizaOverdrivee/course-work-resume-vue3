import { createApp } from "vue";
import App from "./App.vue";
import "./theme.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faTrashAlt);

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
