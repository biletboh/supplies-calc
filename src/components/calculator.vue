<template>
  <div class="calculator">
    <div class="card">
      <div class="card-content">
        <div class="field">
          <label class="label">Кількість днів</label>
          <div class="control">
            <input v-model="supplies.days" @input="$emit('calculate')" class="input" type="number" placeholder="Кількість днів">
          </div>
        </div>
        <div class="field">
          <label class="label">Кількість людей</label>
          <div class="control">
            <input v-model="supplies.persons" @input="$emit('calculate')" class="input" type="number" placeholder="Кількість днів">
          </div>
        </div>
      </div>
    </div>
    <div class="card" v-for="(foodType, index) in supplies.foodTypes" :key="index">
      <div class="card-content">
        <div class="supplies-form">
          <a class="delete"></a>
          <div class="field">
            <label class="label">Вид продуктів</label>
            <div class="control">
              <input v-model="foodType.name" class="input" type="text" placeholder="Вид продуктів">
            </div>
          </div>
          <div class="field">
            <label class="label">Кількість прийомів їжі на день</label>
            <div class="control">
              <input v-model="foodType.meals" @input="$emit('calculate')" class="input" type="number" placeholder="Кількість прийомів їжі на день">
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
                  <input v-model="product.portions" @input="$emit('calculate')" class="input" type="number" placeholder="Порцій у упаковці">
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
    <button @click="addFoodType" class="button">Додати вид продуктів</button>
  </div>
</template>

<script>
export default {
  name: 'calculator',
  props: ['supplies'],
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
    }
  }
}
</script>

<style>
.card {
  margin-bottom: 32px;
}
</style>
