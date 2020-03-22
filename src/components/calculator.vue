<template>
  <div class="calculator">
    <div class="card">
      <div class="card-content">
        <p>{{ calculateSupplies }}</p>
        <div class="field">
          <label class="label">Кількість днів</label>
          <div class="control">
            <input v-model="supplies.days" class="input" type="number" placeholder="Кількість днів">
          </div>
        </div>
        <div class="field">
          <label class="label">Кількість людей</label>
          <div class="control">
            <input v-model="supplies.persons" class="input" type="number" placeholder="Кількість днів">
          </div>
        </div>
        <button @click="addFoodType" class="button">Додати</button>
      </div>
    </div>
    <div class="card" v-for="(foodType, index) in supplies.foodTypes" :key="index">
      <div class="card-content">
        <div class="supplies-form">
          <div class="field">
            <label class="label">Вид продуктів</label>
            <div class="control">
              <input v-model="foodType.name" class="input" type="text" placeholder="Вид продуктів">
            </div>
          </div>
          <div class="field">
            <label class="label">Кількість прийомів їжі на день</label>
            <div class="control">
              <input v-model="foodType.meals" class="input" type="number" placeholder="Кількість прийомів їжі на день">
            </div>
          </div>
          <div>--------------------------------</div>
          <div v-for="(product, productIndex) in foodType.products" :key="productIndex">
            <div class="supplies-form">
              <div class="field">
                <label class="label">Назва продукту</label>
                <div class="control">
                  <input v-model="product.name" class="input" type="text" placeholder="Назва продукту">
                </div>
              </div>
              <div class="field">
                <label class="label">Порцій у упаковці</label>
                <div class="control">
                  <input v-model="product.portions" class="input" type="number" placeholder="Порцій у упаковці">
                </div>
              </div>
            </div>
            <button @click="addProduct(index)" class="button">Додати продукт</button>
            <div>--------------------------------</div>
          </div>
          <button @click="removeFoodType(index)" class="button">Видалити</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'calculator',
  data: function () {
    return {
      supplies: {
        days: 1,
        persons: 1,
        foodTypes: [
          {
            name: '',
            meals: 1,
            products: [
              {
                name: '',
                baseQuantity: 1,
                portions: ''
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    addFoodType: function () {
      this.supplies.foodTypes.push(
        {
          name: '',
          meals: 0,
          products: [
            {
              name: '',
              baseQuantity: 1,
              portions: ''
            }
          ]
        }
      )
    },
    removeFoodType(index) {
      this.supplies.foodTypes.splice(index, 1)
    },
    addProduct: function (index) {
      this.supplies.foodTypes[index].products.push(
        {
          name: '',
          baseQuantity: 1,
          portions: ''
        }
      )
    },
    removeProduct(index, productIndex) {
      this.supplies.foodTypes[index].products.splice(productIndex, 1)
    },
  },
  computed: {
    calculateSupplies: function () {
      for (let foodTypes of this.supplies.foodTypes) {
        for (let product of foodTypes.products) {
          const productsCount = foodTypes.products.length;
          console.log(foodTypes.meals)
          if (foodTypes.meals && product.portions) {
            product["proportion"] = (foodTypes.meals/ product.portions / productsCount) * this.supplies.days;
          }
        }
      }
      this.$emit('calculated', this.supplies)
      return this.supplies
    }
  }
}
</script>

<style>
.card {
  margin-bottom: 32px;
}
</style>
