<template lang="html">
  <div class="sourceWords">
    <input
      tabindex="1"
      ref="words"
      class="words"
      type="text"
      v-model="words"
      placeholder="Space-separated list of words"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "sourceWords",
  computed: {
    words: {
      get() {
        return this.$store.state.words.join(" ");
      },
      set(value) {
        return this.$store.commit("setWords", value.split(" "));
      }
    }
  },
  mounted: function() {
    this.$refs.words.focus();
  }
});
</script>

<style lang="css" scoped>
@import "../styles-config/variables.css";
.sourceWords {
  margin: var(--s-leading) 0;
}
.words {
  color: var(--c-wildwatermelon);
  background: var(--c-snow);
  border-radius: var(--s-global-br);
  padding: var(--s-leading-half);
  width: 100%;
  font-family: var(--font-monospace);
}
.words:focus {
  color: var(--c-snow);
  background: var(--c-wildwatermelon);
  outline: none;
}
</style>
