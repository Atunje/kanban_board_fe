<template>
  <div id="app">
    <board></board>
  </div>
</template>

<script>
import Board from './components/Board.vue'

export default {
  name: 'App',
  components: {
    Board
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Albert Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding:5% 10%;
  min-height: 100vh;
}
</style>
