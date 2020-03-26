<template>
  <div id="app">
    <mainPage msg="Рахуємо запаси"/>
    <message />
    <methodology />
    <appFooter />
  </div>
</template>

<script>
import mainPage from './components/mainPage.vue'
import appFooter from './components/footer.vue'
import methodology from './components/methodology.vue'
import message from './components/message.vue'

export default {
  name: 'App',
  components: {
    mainPage,
    methodology,
    message,
    appFooter
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
