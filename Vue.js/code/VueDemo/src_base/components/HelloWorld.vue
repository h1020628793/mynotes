<template>
  <div>
    <h2 class="title">{{msg}}</h2>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        msg: '第一个Vue组件'
      }
    }
  }
</script>

<style scoped>
  .title {
    color: red;
    background: yellow;
  }
</style>