<template>
  <div class="calculator">
    <div class="card">
      <div class="card-content card-content-products">
        <div class="products">
          <div class="delete-container">
            <div class="columns">
              <div class="column">
                <h3 class="subtitle subtitle-products">Порахувати</h3>
              </div>
            </div>
            <div class="delete-on-side">
              <a @click="resetSupplies()" class="delete delete-products"></a>
            </div>
          </div>
        </div>
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
                    <input v-model="supplies.persons" @input="$emit('calculate', supplies)" class="input" type="number" placeholder="Кількість">
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
                        <option value="vegan">Веган</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card" v-for="(foodType, index) in supplies.foodTypes" :key="index">
      <div class="card-content card-content-products">
        <div class="products">
          <div class="delete-container">
            <div class="columns">
              <div class="column">
                <h3 class="subtitle subtitle-products">Продукти</h3>
              </div>
            </div>
            <div class="delete-on-side">
              <a @click="removeFoodType(index)" class="delete delete-products"></a>
            </div>
          </div>
        </div>
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
              <div class="column is-two-fifth">
                <div class="field">
                  <label class="label">Порції / день</label>
                  <div class="control">
                    <input v-model="foodType.meals" @input="$emit('calculate', supplies)" class="input" type="number" placeholder="Кількість">
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
                <div class="column is-two-fifth">
                  <label class="label">Порції</label>
                  <div class="field has-addons">
                    <div class="control">
                      <input v-model="product.portions" @input="$emit('calculate', supplies)" class="input" type="number" placeholder="">
                    </div>
                    <div class="control">
                      <div class="select">
                        <select v-model="product.container" @input="$emit('calculate', supplies)">
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
              </div>
              <div class="delete-on-side">
                <a @click="removeProduct(index, productIndex)" class="delete delete-product"></a>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <button @click="addProduct(index)" class="button button-products">Додати продукт</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button @click="addFoodType" class="button add-products">Додати вид продуктів</button>
  </div>
</template>

<script>
export default {
  name: 'calculator',
  props: ['supplies', 'initialTemplate', 'productTemplates'],
  data: function () {
    return {
      selectedTemplate: this.initialTemplate
    }
  },
  methods: {
    addFoodType: function () {
      this.supplies.foodTypes.push(
        {
          name: '',
          meals: null,
          products: [
            {
              name: '',
              container: 'упаковки',
              portions: null
            }
          ]
        }
      )
    },

    removeFoodType(index) {
      this.supplies.foodTypes.splice(index, 1)
      this.$emit('calculate', this.supplies)
    },

    addProduct: function (index) {
      this.supplies.foodTypes[index].products.push(
        {
          name: '',
          container: 'упаковки',
          portions: null
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
      this.$emit('calculate', this.supplies)
    }
  }
}
</script>

<style scoped>
.card {
  margin-bottom: 36px;
}

.card-content-products {
  padding-top: 0;
}

.products {
  background-color: #80AECA;
  margin: 24px -24px;
  padding-left: 24px;
  padding-right: 24px;
}

.subtitle-products {
  color: #FFFFFF;
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
