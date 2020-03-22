<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <div class="hello">
            <h1 class="title">{{ msg }}</h1>
            <p>Скористайтеся простим калькулятором для розрахунку запасів їжі на карантин.</p>
            <calculator />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import calculator from './calculator.vue'

export default {
  name: 'mainPage',
  props: {
    msg: String
  },
  components: {
    calculator
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 48px 0 0;
}

.calculator {
  margin: 48px auto;
  max-width: 480px;
}
</style>
