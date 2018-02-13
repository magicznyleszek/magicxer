import Vue from "vue";
import Vuex from "vuex";
import { state } from "./state";
import { mutations } from "./mutations";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state,
  mutations,
  // we want strict only during development (performance heavy-ish)
  strict: window.location.hostname === "localhost"
});
