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
          <calculator v-bind:supplies="supplies" @calculate="getSupplyList"/>
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

  created: function () {
    this.getSupplyList()
  },

  data: function () {
    return {
      supplyList: [],
      supplies: {
        days: 1,
        persons: 1,
        foodTypes: [
          {
            name: 'Крупи',
            meals: 1,
            products: [
              {
                name: 'Греча',
                baseQuantity: 1,
                portions: 8
              }
            ]
          }
        ]
      }
    }
  },

  methods: {

    getSupplyList() {

      this.supplyList = []

      for (let foodTypes of this.supplies.foodTypes) {
        for (let product of foodTypes.products) {
          const productsCount = foodTypes.products.length;

          if (foodTypes.meals && product.portions && this.supplies.persons) {
            console.log(foodTypes.meals, product.portions, productsCount, this.supplies.persons, this.supplies.days)
            product["proportion"] = (foodTypes.meals/ product.portions / productsCount) * this.supplies.persons * this.supplies.days;
          }

          this.supplyList.push(product)
        }
      }

      return this.supplyList
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
