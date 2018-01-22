import Vue from "vue";
import Vuex from "vuex";

import App from "./app.vue";
import { store } from "./store/index";

const app = new Vue({
  el: "#app",
  store,
  components: {
    App
  },
  render: h => h("app")
});
