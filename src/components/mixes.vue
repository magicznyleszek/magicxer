<template>
  <div class="mixes">
    <p>mixes:</p>

    <ul>
      <li v-for="mix in mixes">{{ mix }}</li>
    </ul>

    <p v-if="mixes.length < 1">Provide words that share some letters or contain vovels :-)</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "mixes",
  computed: {
    mixes {
      get() {
        return this.$store.state.mixes;
      }
    }
  }
});
</script>

<style lang="css" scoped>
.mixes {
  color: skyblue;
}
</style>
