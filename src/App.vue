<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app'
  };
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  body, html {
    width: 100%;
    height: 100%;
    /*background-color: #ededed;*/
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
  }
</style>
