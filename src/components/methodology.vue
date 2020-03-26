<template>
  <section class="section">
    <div class="content has-text-centered">
      <p class="formula"><strong>Формула:</strong> (порції на день <font-awesome-icon :icon="['fas', 'divide']" /> порції в упаковці <font-awesome-icon :icon="['fas', 'divide']" /> усього продуктів) <font-awesome-icon :icon="['fas', 'times']" /> кількість людей <font-awesome-icon :icon="['fas', 'times']" /> дні</p>
      <p class="formula"><strong>Disclamer:</strong> пропозиції дієт мають довільних характер.</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'methodology'
}
</script>

<style scoped>
.formula {
  font-size: 18px;
}
</style>
