<template>
  <div class="test">
    TEST!
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "test",
  data() {
    return {
      foo: 1
    };
  }
});
</script>

<style lang="css" scoped>
.test {
  color: pink;
}
</style>
