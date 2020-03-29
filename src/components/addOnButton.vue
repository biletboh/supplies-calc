<template>
  <button @click="isActive = !isActive; addOnProducts();" v-bind:class="{active: isActive}" class="button">
    <span class="icon is-small">
      <font-awesome-icon :icon="['fas', 'plus']" />
    </span>
    <span>
      {{ typeToHuman }}
    </span>
  </button>
</template>

<script>
import products from '../data/addOnProducts.json'

export default {
  name: 'addOnButton',

  props: ['supplies', 'type'],

  data: function () {
    return {
      products: products,
      isActive: this.active
    }
  },

  methods: {

    addOnProducts: function() {

      const foodTypes = this.supplies.foodTypes
      const type = this.products[this.type]
      const deepCopyType= JSON.parse(JSON.stringify(type))

      if (this.isActive) {
        foodTypes.push(deepCopyType)

      } else {

        for (let index in this.supplies.foodTypes) {

          if (foodTypes[index].name == deepCopyType.name) {
            foodTypes.splice(index, 1)
          }
        }

      }

      this.$emit('calculate', this.supplies)
    },
  },

  computed: {
    typeToHuman: function () {
      return this.products[this.type].name
    }
  }
}
</script>

<style scoped>

.button.active,
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
</style>

