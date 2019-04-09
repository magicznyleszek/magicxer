<template lang="html">
  <div class="mixes">
    <ul class="list">
      <li v-for="mix in orderedMixes">{{ mix }}</li>
    </ul>

    <p v-if="orderedMixes.length < 1">
      Provide words that share some letters or contain vowels :-)
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import orderBy from "lodash/orderby";
import uniq from "lodash/uniq";
export default Vue.extend({
  name: "mixes",
  computed: {
    orderedMixes: {
      get() {
        return orderBy(uniq(this.$store.state.mixes));
      }
    }
  }
});
</script>

<style lang="css" scoped>
@import "../styles-config/variables.css";
.mixes {
  color: var(--c-honeyflower);
  border: var(--s-global-border) solid var(--c-honeyflower);
  border-radius: var(--s-global-br);
  padding: var(--s-leading-half);
  font-family: var(--font-monospace);
  width: 100%;
  margin: var(--s-leading) 0;
}
</style>
