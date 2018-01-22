import Vue from "vue";
import App from "./app.vue";

const app = new Vue({
  render: h => h("app"),
  el: "app",
  components: {
    app: App
  }
});
