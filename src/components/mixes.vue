<template>
  <div class="mixes">
    <p>mixes:</p>

    <ul>
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
.mixes {
  color: skyblue;
}
</style>
