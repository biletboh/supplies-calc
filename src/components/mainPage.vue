<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <div class="hello">
            <h1 class="title">{{ msg }}</h1>
            <p class="description">Простий калькулятор допоможе порахувати запаси їжі на карантин. Варто запастися продуктами та іншими необхідними речима на  <a href="https://www.nytimes.com/interactive/2020/world/coronavirus-maps.html" class="link">30 днів</a>. Зробивши підрахунки, ви впевнетеся, що всього достатньо і не будете стимулювати дефіцит.</p>
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
              <p>Для розрахунку списку розбийте продукти на групи. Наприклад, крупи, овочі, консерви тощо. До круп можна записати гречку, рис, булгур. Кількість продуктів можна рахувати упаковками, штуками, кілограмами, банками, консервами або пляшками. Досить легко прикинути скільки порцій у банці з маринованими огірками та скільки разів на день ми їмо овочі. Логіка нескладна.</p>
              <div class="content">
                <ol type="1">
                  <li v-for="(supply, index) in supplyList" :key="index">{{ supply.name }} {{ supply.proportion }} {{ supply.container }}</li>
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

  mounted: function () {
    this.getSupplyList(this.supplies)
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
                container: 'кг',
                portions: 8
              }
            ]
          }
        ]
      }
    }
  },

  methods: {

    getSupplyList(value) {

      this.supplyList = []
      console.log(value)

      for (let foodTypes of value.foodTypes) {
        for (let product of foodTypes.products) {
          const productsCount = foodTypes.products.length;

          if (foodTypes.meals && product.portions && value.persons) {
            let proportion = (foodTypes.meals/ product.portions / productsCount) * value.persons * value.days
            proportion = Math.round((proportion + Number.EPSILON) * 100) / 100
            product["proportion"] = proportion
          }

          if (product.name) {
            this.supplyList.push(product)
          }
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
  max-width: 635px;
  margin-left: auto;
  margin-right: auto;
}

.description {
  margin-bottom: 48px;
}

.link {
  color: #1B5F87;
}

.link:hover {
  color: #80AECA;
}
</style>
