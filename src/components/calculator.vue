<template>
  <div class="calculator">
    <div class="card">
      <header class="card-header">
        <h3 class="card-header-title">Порахувати</h3>
        <div class="card-header-icon">
          <a @click="resetSupplies()" class="delete delete-products"></a>
        </div>
      </header>
      <div class="card-content">
        <div class="supplies-form">
          <div class="delete-container">
            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Дні</label>
                  <div class="control">
                    <input v-model="supplies.days" @input="$emit('calculate', supplies)" class="input" type="number" placeholder="Кількість">
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <label class="label">Люди</label>
                  <div class="control">
                    <input v-model.number="supplies.persons" @input="$emit('calculate', supplies)" class="input" type="number" placeholder="Кількість">
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <label class="label">Дієти</label>
                  <div class="control">
                    <div class="select">
                      <select v-model="selectedTemplate" @change="setTemplate">
                        <option value="">Без шаблону</option>
                        <option value="basic">Базова</option>
                        <option value="bichPacket">Біч-пакет</option>
                        <option value="vegan">Веган</option>
                        <option value="vegaterian">Вегeтаріанська</option>
                        <option value="meatEater">М'ясоїдська</option>
                        <option value="pescetarian">Пескетаріанська</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <div class="field  is-grouped">
                  <p class="control">
                  <addOnButton
                    v-bind:supplies="supplies"
                    v-bind:type="'personalCare'"
                    @calculate="$emit('calculate', supplies)"
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card" v-for="(foodType, index) in supplies.foodTypes" :key="index">
      <header class="card-header">
        <h3 class="card-header-title">Продукти: {{ foodType.name }}</h3>
        <div class="card-header-icon">
          <a @click="removeFoodType(index)" class="delete delete-products"></a>
        </div>
      </header>
      <div class="card-content">
        <div class="supplies-form">
          <div class="delete-container">
            <div class="columns">
              <div class="column is-three-fifth">
                <div class="field">
                  <label class="label">Вид продуктів</label>
                  <div class="control">
                    <input v-model="foodType.name" class="input" type="text" placeholder="Вид продуктів">
                  </div>
                </div>
              </div>
              <div v-if="foodType.type != 'longTerm'" class="column is-two-fifth">
                <div class="field">
                  <label class="label">Порції / день</label>
                  <div class="control">
                    <input v-model.number="foodType.meals" @input="$emit('calculate', supplies)" class="input" type="number" placeholder="Кількість">
                  </div>
                </div>
              </div>
              <div class="delete-on-side">
              </div>
            </div>
          </div>
          <div v-for="(product, productIndex) in foodType.products" :key="productIndex" class="supplies-form">
            <hr>
            <div class="delete-container">
              <div class="columns">
                <div class="column is-three-fifth">
                  <div class="field">
                    <label class="label">Назва продукту</label>
                    <div class="control">
                      <input v-model="product.name" @input="$emit('calculate', supplies)" class="input" type="text" placeholder="Назва продукту">
                    </div>
                  </div>
                </div>
                <div v-if="foodType.type == 'longTerm' && product.type !== 'custom'" class="column is-two-fifth">
                  <label class="label">Кількість / Період</label>
                  <div class="field has-addons">
                    <div class="control">
                      <input v-model.number="product.quantity" @input="$emit('calculate', supplies)" class="input" type="number" placeholder="">
                    </div>
                    <div class="control">
                      <div class="select">
                        <select v-model.number="product.consumptionRate" @change="$emit('calculate', supplies)">
                          <option value="1">день</option>
                          <option value="7">тиждень</option>
                          <option value="30">місяць</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else-if="product.type == 'base'" class="column is-two-fifth">
                  <label class="label">Порції</label>
                  <div class="field has-addons">
                    <div class="control">
                      <input v-model="product.portions" @input="$emit('calculate', supplies)" class="input" type="number" placeholder="">
                    </div>
                    <div class="control">
                      <div class="select">
                        <select v-model="product.container" @change="$emit('calculate', supplies)">
                          <option value="упаковки">на 1 упаковку</option>
                          <option value="штуки">на 1 штуку</option>
                          <option value="кг">на 1 кг</option>
                          <option value="банки">на 1 банку</option>
                          <option value="консерви">на 1 консерву</option>
                          <option value="пляшки">на 1 пляшку</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else-if="product.type == 'custom'" class="column is-two-fifth">
                  <label class="label">Кількість</label>
                  <div class="field has-addons">
                    <div class="control">
                      <input v-model.number="product.quantity" @input="$emit('calculate', supplies)" class="input" type="number" placeholder="">
                    </div>
                    <div class="control">
                      <div class="select">
                        <select v-model="product.container" @change="$emit('calculate', supplies)">
                          <option value="упаковки">упаковки</option>
                          <option value="штуки">штуки</option>
                          <option value="кг">кг</option>
                          <option value="банки">банки</option>
                          <option value="консерви">консерви</option>
                          <option value="пляшки">пляшки</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="delete-on-side">
                <a @click="removeProduct(index, productIndex)" class="delete delete-product"></a>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <div class="field is-grouped button-products">
                <p class="control">
                <button @click="addProduct(index)" class="button">Додати продукт</button>
                </p>
                <p class="control">
                <button @click="addCustomProducts(index)" class="button">Додати продукт вручну</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-grouped">
      <p class="control">
      <button @click="addFoodType('base')" class="button add-products">Додати продукти</button>
      </p>
      <p class="control">
      <button @click="addFoodType('longTerm')" class="button add-products">Додати довгострокові продукти</button>
      </p>
    </div>
  </div>
</template>

<script>
import addOnButton from './addOnButton.vue'

export default {
  name: 'calculator',

  props: ['supplies', 'initialTemplate', 'productTemplates'],

  components: {
    addOnButton
  },

  data: function () {
    return {
      selectedTemplate: this.initialTemplate
    }
  },

  methods: {
    addFoodType: function(type) {

      this.supplies.foodTypes.push(
        {
          name: '',
          meals: null,
          type: type,
          products: [
            {
              name: '',
              container: 'упаковки',
              portions: null,
              type: 'base',
              consumptionRate: 7,
              quantity: null
            }
          ]
        }
      )
    },

    removeFoodType(index) {
      this.supplies.foodTypes.splice(index, 1)
      this.$emit('calculate', this.supplies)
    },

    addProduct: function(index) {
      this.supplies.foodTypes[index].products.push(
        {
          name: '',
          container: 'упаковки',
          portions: null,
          type: 'base',
          quantity: null
        }
      )
    },

    addCustomProducts: function(index) {
      this.supplies.foodTypes[index].products.push(
        {
          name: '',
          container: 'упаковки',
          portions: null,
          type: 'custom',
          quantity: null
        }
      )
    },

    removeProduct(index, productIndex) {
      this.supplies.foodTypes[index].products.splice(productIndex, 1)
      this.$emit('calculate', this.supplies)
    },

    setTemplate() {
      const name = this.selectedTemplate
      if (name) {
        this.supplies.foodTypes = this.productTemplates[name]['foodTypes']
      } else {
        this.supplies.foodTypes = []
      }
      this.$emit('calculate', this.supplies)
    },

    resetSupplies() {
      this.supplies.days = 1
      this.supplies.persons = 1
      this.supplies.foodTypes = []
      this.selectedTemplate = ''
      this.$emit('calculate', this.supplies)
    }
  }
}
</script>

<style scoped>
.card {
  margin-bottom: 36px;
}

.button-products {
  margin-top: 24px;
}

.delete-container {
  padding-right: 36px;
  position: relative;
}

.delete-on-side {
  position: absolute;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  right: 0;
  top: 0;
}

.delete-products {
  background-color: rgba(255, 255, 255, 0.2);
}

.delete-product {
  margin-left: 24px;
}

.empty-space {
  margin-left: 42px;
}

.delimiter {
  padding: 0 12px;
  font-size: 24px;
}

.add-products {
  margin-bottom: 24px;
}

@media (max-width: 768px) {
  .delete-container {
    padding-right: 28px;
  }
}
</style>
