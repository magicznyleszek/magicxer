<template>
  <div class="main">
    <h1>Hai! {{title}}</h1>
    <humans></humans>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Humans from "./components/humans.vue";

export default Vue.extend({
  data() {
    return {
      title: "Bai"
    };
  },
  name: "app",
  components: {
    Humans
  }
});
</script>

<style lang="css" scoped>
.app {
  padding: 10px;
}
</style>
