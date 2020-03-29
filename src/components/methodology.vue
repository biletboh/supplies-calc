<template>
  <section class="section">
    <div class="container">
      <div class="info">
        <h3 class="title">Як працює калькулятор?</h3>
        <p class="formula"><strong>Формула 1:</strong> (порції на день <font-awesome-icon :icon="['fas', 'divide']" /> порції в упаковці <font-awesome-icon :icon="['fas', 'divide']" /> усього продуктів) <font-awesome-icon :icon="['fas', 'times']" /> кількість людей <font-awesome-icon :icon="['fas', 'times']" /> дні</p>
        <p class="formula"><strong>Формула 2:</strong> кількість продукту <font-awesome-icon :icon="['fas', 'times']" /> кількість людей <font-awesome-icon :icon="['fas', 'times']" /> дні  <font-awesome-icon :icon="['fas', 'divide']" /> період споживання продукту</p>
        <p class="disclaimer"><strong>Disclaimer:</strong> сторінка знаходиться у стадії розробки. Пропозиції дієт, набору ліків, засобів гігієни та алкоголю можуть не відповідати вашим індивідуальним потребам.<p>
        <p>Якщо хтось може допомогти скласти більш грамотне меню або має ідеї, як зробити сторінку краще, пишіть на <a class="link" href="mailto:suppliescalcnet@gmail.com">suppliescalcnet@gmail.com</a></p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'methodology'
}
</script>

<style scoped>
.formula, .disclaimer {
  margin-bottom: 24px;
}
</style>
