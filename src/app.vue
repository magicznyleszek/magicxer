<template>
  <div class="app">
    <h1>magicxer</h1>

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
