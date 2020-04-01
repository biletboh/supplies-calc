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


const metaDescription = 'Простий калькулятор допоможе порахувати запаси їжі на карантин. Робіть покупки виважено. Згладьмо криву!'
const metaName = 'Калькулятор запасів'
const pageUrl = 'https://suppliescalc.net/'


export default {
  name: 'App',
  components: {
    mainPage,
    methodology,
    message,
    appFooter
  },
  metaInfo: {
    title: 'Калькулятор запасів',
    htmlAttrs: {
      lang: 'uk',
    },
    meta: [
      { name: 'description', content: metaDescription },
      { property: 'og:url', content: pageUrl },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: metaName },
      { property: 'og:site_name', content: metaName },
      { property: 'og:description', content: metaDescription },
      { property: 'og:image', content: require('./assets/img/fb-supplies-calc-ukr.png') },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:url', content: pageUrl },
      { name: 'twitter:title', content: metaName },
      { name: 'twitter:description', content: metaDescription },
      { name: 'twitter:image', content: require('./assets/img/tw-supplies-calc-ukr.png') }
    ],
    link: [
      { rel: 'canonical', href: pageUrl }
    ]
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
