<template>
  <div class="mixes">
    <ul class="list">
      <li v-for="mix in orderedMixes">{{ mix }}</li>
    </ul>

    <p v-if="orderedMixes.length < 1">Provide words that share some letters or contain vovels :-)</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import orderBy from "lodash/orderby";
import uniq from "lodash/uniq";
export default Vue.extend({
  name: "mixes",
  computed: {
    orderedMixes {
      get() {
        return orderBy(uniq(this.$store.state.mixes));
      }
    }
  }
});
</script>

<style lang="css" scoped>
@import "../variables.css";
.mixes {
  color: var(--c-violet);
  border: var(--s-global-border) solid currentColor;
  border-radius: var(--s-global-br);
  padding: var(--s-leading-half);
  margin: var(--s-leading-half);
}
</style>
