<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <div class="hello">
            <h1 class="title">{{ msg }}</h1>
            <p>Простий калькулятор допоможе порахувати запаси їжі на карантин. </p>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <calculator v-bind:supplies="supplies" @calculate="getSupplyList"/>
        </div>
        <div class="column">
          <div class="card">
            <div class="card-content">
              <h2 class="title">Список продуктів</h2>
              <div class="content">
              <ol type="1">
                <li v-for="(supply, index) in supplyList" :key="index">{{ supply.name }} {{ supply.proportion }}</li>
              </ol>
              </div>
            </div>
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
  },

  created: function () {
    this.getSupplyList()
  },

  data: function () {
    return {
      supplyList: [],
      supplies: {
        days: 7,
        persons: 1,
        foodTypes: [
          {
            name: 'Крупи',
            meals: 2,
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
.hello {
  text-align: center;
}
</style>
