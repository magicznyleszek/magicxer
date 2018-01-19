import Vue from "vue";
import HelloComponent from "./components/hello.vue";

const app = new Vue({
  el: "#app",
  data: { name: "World" },
  components: {
    HelloComponent
  }
});
