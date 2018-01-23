import Vue from "vue";
import Vuex from "vuex";

import app from "./app.vue";
import { store } from "./store/index";

const myApp = new Vue({
  el: "#app",
  store,
  components: {
    app
  },
  render: h => h("app")
});
