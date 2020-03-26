<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <div class="info">
            <h1 class="title">{{ msg }}</h1>
            <p class="description">Простий калькулятор допоможе порахувати запаси їжі на карантин. Варто запастися продуктами та іншими необхідними речима на  <a href="https://www.nytimes.com/interactive/2020/world/coronavirus-maps.html" class="link">30 днів</a>. Зробивши підрахунки, ви впевнетеся, що всього достатньо і не будете стимулювати дефіцит.</p>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <calculator
            v-bind:supplies="supplies"
            v-bind:initialTemplate="initialTemplate"
            v-bind:productTemplates="productTemplates"
            @calculate="getSupplyList"
            />
        </div>
        <div class="column is-one-third-tablet is-half-widescreen">
          <div class="card">
            <div class="card-content">
              <h2 class="title">Список продуктів</h2>
              <div class="content">
                <ol type="1">
                  <li v-for="(supply, index) in supplyList" :key="index">{{ supply.name }} {{ supply.proportion }} {{ supply.container }}</li>
                </ol>
                <button class="button" type="button"
                        v-clipboard:copy="listToCopy"
                        v-clipboard:success="onCopy"
                        v-clipboard:error="onError">
                  {{ copyState }}
                </button>
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
    this.setTemplate('basic'),
    this.getSupplyList(this.supplies)
  },

  data: function () {
    return {
      supplyList: [],
      listToCopy: '',
      copyState: 'Скопіювати',
      supplies: {
        days: 7,
        persons: 1,
        foodTypes: []
      },
      initialTemplate: 'basic',
      productTemplates: {
        basic: {
          name: 'Базовий',
          foodTypes: [
            {
              name: 'Крупи',
              meals: 2,
              products: [
                {
                  name: 'Греча',
                  container: 'кг',
                  portions: 8
                },
                {
                  name: 'Рис',
                  container: 'кг',
                  portions: 8
                }
              ]
            },
            {
              name: 'Овочі',
              meals: 2,
              products: [
                {
                  name: 'Заможрожені овочі',
                  container: 'упаковки',
                  portions: 8
                }
              ]
            }
          ],
        },
        vegan: {
          name: 'Веган',
          foodTypes: [
            {
              name: 'Крупи',
              meals: 2,
              products: [
                {
                  name: 'Греча',
                  container: 'кг',
                  portions: 8
                },
                {
                  name: 'Рис',
                  container: 'кг',
                  portions: 8
                }
              ]
            },
            {
              name: 'Овочі',
              meals: 2,
              products: [
                {
                  name: 'Заможрожені овочі',
                  container: 'упаковки',
                  portions: 8
                }
              ]
            },
            {
              name: 'Білки',
              meals: 2,
              products: [
                {
                  name: 'Нут',
                  container: 'кг',
                  portions: 8
                }
              ]
            }
          ]
        }
      }
    }
  },

  methods: {

    setTemplate(name) {
      this.supplies.foodTypes = this.productTemplates[name]['foodTypes']
    },

    getSupplyList(value) {

      this.supplyList = []

      for (let foodTypes of value.foodTypes) {
        for (let product of foodTypes.products) {
          const productsCount = foodTypes.products.length;

          if (foodTypes.meals && product.portions && value.persons) {
            let proportion = (foodTypes.meals / product.portions / productsCount) * value.persons * value.days
            proportion = Math.round((proportion + Number.EPSILON) * 100) / 100
            product["proportion"] = proportion
          }

          if (product.name) {
            this.supplyList.push(product)
          }
        }
      }

      this.makeListToCopy(this.supplyList)

      return this.supplyList
    },

    makeListToCopy(supplyList) {
      let toCopy = ``
      this.copyState = 'Скопіювати'
      for (const item in supplyList) {
        const count = Number(item) + 1
        toCopy += `${count}. ${supplyList[item].name} ${supplyList[item].proportion} ${supplyList[item].container}` + '\n'
      }
      this.listToCopy = toCopy

    },

    onCopy: function() {
      this.copyState = 'Скопійовано!'
    },

    onError: function(e) {
      alert('Не вдалося скопіювати текст: ', e.text)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.description {
  margin-bottom: 48px;
}
</style>
