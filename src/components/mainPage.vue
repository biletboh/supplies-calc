<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <div class="hello">
            <h1 class="title">{{ msg }}</h1>
            <p>Скористайтеся простим калькулятором для розрахунку запасів їжі на карантин.</p>
            <p>{{ supplies }}</p>
            <p>{{ foodType }}</p>
            <div class="calculator">
              <div class="field">
                <label class="label">Кількість днів</label>
                <div class="control">
                  <input v-model="supplies.days" class="input" type="text" placeholder="Кількість днів">
                </div>
              </div>
              <div class="field">
                <label class="label">Вид продуктів</label>
                <div class="control">
                  <input v-model="foodType.name" class="input" type="text" placeholder="Вид продуктів">
                </div>
              </div>
              <div class="field">
                <label class="label">Кількість прийомів їжі на день</label>
                <div class="control">
                  <input v-model="foodType.mealCount" class="input" type="text" placeholder="Кількість прийомів їжі на день">
                </div>
              </div>
              <button v-on:click="addFoodType" class="button">Додати</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'mainPage',
  props: {
    msg: String
  },
  data: function () {
    return {
      supplies: {
        days: 0,
        foodTypes: []
      },
      foodType: {
        name: '',
        mealCount: ''
      }
    }
  },
  methods: {
    addFoodType: function () {
      const type = Object.assign({}, this.foodType);
      this.supplies.foodTypes.push(type)
      this.foodType.name = ''
      this.foodType.mealCount = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 48px 0 0;
}

.calculator {
  margin: 48px auto;
  max-width: 480px;
}
</style>
