<template>
  <div class="main">
    <h1>Hai! {{title}}</h1>
    <test></test>
    <humans></humans>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Test from "./components/test.vue";
import Humans from "./components/humans.vue";

export default Vue.extend({
  data() {
    return {
      title: "Bai"
    };
  },
  name: "app",
  components: {
    Test,
    Humans
  }
});
</script>

<style lang="css" scoped>
.main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
h1,
h2 {
  font-weight: normal;
}
</style>
