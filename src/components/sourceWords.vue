<template>
  <form class="sourceWords">
    <p>Write space-separated lists of words: </p>
    <input type="text" v-model="beginnings" placeholder="beginnings">
    <input type="text" v-model="endings" placeholder="endings">
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
.sourceWords {
  color: tomato;
}
.sourceWords input {
  border: 2px solid currentColor;
  color: currentColor;
  padding: 5px;
}
</style>
