<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <div class="hello">
            <h1 class="title">{{ msg }}</h1>
            <p>Скористайтеся простим калькулятором для розрахунку запасів їжі на карантин.</p>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <calculator @calculated="showList"/>
        </div>
        <div class="column">
          <h2>Список продуктів</h2>
          <p v-for="(supply, index) in supplyList" :key="index">{{ supply.name }} {{ supply.proportion }}</p>
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
  },
  data: function () {
    return {
      supplyList: []
    }
  },
  methods: {
    showList(value) {
      this.supplyList = []
      for (let foodTypes of value.foodTypes) {
        for (let product of foodTypes.products) {
          this.supplyList.push(product)
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
