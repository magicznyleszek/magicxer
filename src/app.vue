<template>
  <div class="main">
    <h1>sicx</h1>

    <source-words></source-words>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import sourceWords from "./components/sourceWords.vue";

export default Vue.extend({
  data() {
    return {
      title: "Bai"
    };
  },
  name: "app",
  components: {
    sourceWords
  }
});
</script>

<style lang="css" scoped>
.app {
  padding: 10px;
}
</style>
