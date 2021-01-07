<template>
  <div>
    <img src="./assets/logo.png" alt="logo" class="logo">
    <HelloWorld/>
  </div>
</template>

<script>
  import HelloWorld from './components/HelloWorld.vue'

  export default {
    components: {
      HelloWorld
    }
  }
</script>

<style>
  .logo {
    width: 100px;
    height: 100px;
  }
</style>
