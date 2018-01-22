<template>
  <ul class="humans">
    <li v-for="human in list">
      {{ human.name }}, {{ human.age }}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "humans",
  computed: {
    list() {
      return this.$store.state.humans;
    }
  }
});
</script>

<style lang="css" scoped>
.humans {
  color: tomato;
}
</style>
