<template>
  <div id="app">
    <mainPage msg="Рахуємо запаси"/>
  </div>
</template>

<script>
import mainPage from './components/mainPage.vue'

export default {
  name: 'App',
  components: {
    mainPage
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
