<template>
  <form class="sourceWords">
    <p>Write space-separated lists of words: </p>
    <input class="beginnings" type="text" v-model="beginnings" placeholder="beginnings">
    <input class="endings" type="text" v-model="endings" placeholder="endings">
  </form>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "sourceWords",
  computed: {
    beginnings {
      get() {
        return this.$store.state.beginnings.join(" ");
      },
      set(value) {
        return this.$store.commit("setBeginnings", value.split(" "));
      }
    },
    endings {
      get() {
        return this.$store.state.endings.join(" ");
      },
      set(value) {
        return this.$store.commit("setEndings", value.split(" "));
      }
    }
  }
});
</script>

<style lang="css" scoped>
@import "../variables.css";
.beginnings {
  color: var(--c-crimson);
}
.endings {
  color: var(--c-deep-sky-blue);
}
.beginnings, .endings {
  border: var(--s-global-border) solid currentColor;
  border-radius: var(--s-global-br);
  padding: var(--s-leading-half);
  margin: var(--s-leading-half);
}
</style>
