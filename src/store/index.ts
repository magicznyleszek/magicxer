import Vue from "vue";
import * as Vuex from "vuex";
import { state } from "./state";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state
});
