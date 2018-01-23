<template>
  <div class="app">
    <h1>sicx</h1>

    <source-words></source-words>
    <mixes></mixes>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import sourceWords from "./components/sourceWords.vue";
import mixes from "./components/mixes.vue";

export default Vue.extend({
  name: "app",
  components: {
    sourceWords,
    mixes
  }
});
</script>

<style lang="css" scoped>
.app {
  padding: 10px;
}
</style>
