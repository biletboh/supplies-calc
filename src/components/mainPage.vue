<template>
  <section class="section">
    <div class="container">
      <div class="beta">Beta-версія</div>
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
            <p class="social">Покажіть калькулятор друзям:
            <span class="social-buttons">
              <a href="https://www.facebook.com/share.php?u=https://suppliescalc.net/" class="link">
                <span class="icon">
                  <font-awesome-icon :icon="['fab', 'facebook-square']" size="2x" />
                </span>
              </a>
              <a href="https://twitter.com/share?text=Простий калькулятор допоможе порахувати запаси їжі на карантин&url=https://suppliescalc.net/" class="link">
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
          <div class="card">
            <header class="card-header card-header-product-list">
              <h2 id="productList" class="card-header-title">Список продуктів</h2>
            </header>
            <div class="card-content">
              <div class="content">
                <ol type="1" class="product-list">
                  <li v-for="(supply, index) in supplyList" :key="index">{{ supply.name }} {{ supply.proportion }} {{ supply.container }}</li>
                </ol>
                <button v-if="listToCopy" class="button" type="button"
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
import productTemplates from '../data/productTemplates.json'
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
      productTemplates: productTemplates,
      productTemplatesNames: [
        'basic',
        'bichPacket',
        'vegan',
        'vegetarian',
        'meatEater',
        'pescetarian'
      ]
    }
  },

  methods: {

    setTemplate(name) {
      this.supplies.foodTypes = this.productTemplates[name]['foodTypes']
    },

    getSupplyList(value) {

      this.supplyList = []

      for (let foodType of value.foodTypes) {
        for (let product of foodType.products) {

          if (value.persons && value.days) {
            if (foodType.type == 'longTerm' && product.type != 'custom' && product.quantity && product.consumptionRate) {
              const consumption = value.days / product.consumptionRate
              let proportion = product.quantity * value.persons * consumption
              proportion = Math.round((proportion + Number.EPSILON) * 100) / 100
              product["proportion"] = proportion

            } else if (product.type == 'base' && foodType.meals && product.portions) {

              const productsCount = this.defineProductListSize(foodType.products)
              let proportion = (foodType.meals / product.portions / productsCount) * value.persons * value.days
              proportion = Math.round((proportion + Number.EPSILON) * 100) / 100
              product["proportion"] = proportion

            } else if (product.type == 'custom' && product.quantity || product.type == 'template' && product.quantity) {

              product["proportion"] = product.quantity
            }
          }

          if (product.name) {
            this.supplyList.push(product)
          }
        }
      }

      this.makeListToCopy(this.supplyList)

      return this.supplyList
    },

    defineProductListSize(products) {
      let size = 0

      for (let product of products) {
        if (product.portions && product.type != 'custom') {
          size += 1
        }
      }

      return size
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
  box-shadow: 0 0 0 0.125em rgb(87, 184, 135, 0.25);
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

.card-header-product-list {
  background-color: #57B887;
}

.product-list {
  margin-top: 0;
}

.beta {
  position: absolute;
  right: 0;
  font-size: 18px;
}

@media (max-width: 768px) {
  .button-scroll {
    right: 24px;
    bottom: 24px;
  }

  .description {
    margin-bottom: 24px;
  }
}
</style>
