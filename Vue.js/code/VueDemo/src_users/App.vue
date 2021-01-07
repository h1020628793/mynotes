<template>
  <div class="container">
    <Search></Search>
    <UsersMain></UsersMain>
    <!--<users-main></users-main>-->
  </div>
</template>

<script>
  import Search from './components/Search.vue'
  import Main from './components/Main.vue'

  export default {
    components: {
      Search,
      UsersMain: Main
    }
  }
</script>

<style>

</style>