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
          <div class="info">
            <p class="social">Покажіть друзям:
            <span class="social-buttons">
              <a href="https://www.facebook.com/share.php?u=https://suppliescalc.net/" class="link">
                <span class="icon">
                  <font-awesome-icon :icon="['fab', 'facebook-square']" size="2x" />
                </span>
              </a>
              <a href="https://twitter.com/share?url=https://suppliescalc.net/" class="link">
                <span class="icon">
                  <font-awesome-icon :icon="['fab', 'twitter-square']" size="2x" />
                </span>
              </a>
            </span>
            </p>
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
          <div class="card product-list-card">
            <div class="card-content">
              <h2 id="productList" class="title">Список продуктів</h2>
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
    <a href="#" v-scroll-to="'#productList'" class="button button-scroll"><font-awesome-icon :icon="['fas', 'list']" /></a>
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

.product-list-card {
  margin-top: 12px;
}

.button-scroll {
  border-radius: 100%;
  padding-right: 11px;
  padding-left: 11px;
  position: fixed;
  right: 48px;
  bottom: 48px;
  border-color: #57B887;
  background-color: #57B887;
  color: #FFFFFF;
}

.button-scroll:hover,
.button-scroll:active,
.button-scroll:focus {
  border-color: #57B887;
  background-color: #57B887;
  color: #FFFFFF;
}

.button-scroll:focus:not(:active),
.button-scroll.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgb(87, 184, 135, 0.25)
}

.social {
  display: flex;
  justify-content: center;
  align-items: center
}

.social-buttons {
  margin-top: 12px;
  margin-left: 6px;
}

.social-buttons .link {
  margin: 0 8px;
}

@media (max-width: 768px) {
  .button-scroll {
    right: 24px;
    bottom: 24px;
  }
}
</style>
