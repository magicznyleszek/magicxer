import Vue from "vue";
import Vuex from "vuex";
import { state } from "./state";
import { mutations } from "./mutations";

Vue.use(Vuex);

const myStore = new Vuex.Store({
  state,
  mutations,
  // we want strict only during development (performance heavy-ish)
  strict: window.location.hostname === "localhost"
});

// save every store change to sessionStorage
myStore.subscribe((mutation, newState: IState): void => {
  window.sessionStorage.setItem("magicxer", JSON.stringify(newState));
});

export const store = myStore;
