<template>
  <div class="main">
    <h1>Hai! {{title}}</h1>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default class App extends Vue {
  title: string = "Bai";
}
</script>

<style lang="css">
.main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
h1,
h2 {
  font-weight: normal;
}
</style>
