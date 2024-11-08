<template>
  <div>
    <p>Есть опубликованные книги:</p>
    <span>{{ publishedBooksMessage }}</span>
    <p>{{ calculateBooksMessage() }}</p>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
const author = reactive({
  name: 'John Doe',
  books: ['Book1', 'Book2', 'Book3']
})

const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Да' : 'Нет'
})

// или
function calculateBooksMessage() {
  return author.books.length > 0 ? 'Да' : 'Нет'
}
// Разница в том, что первый вариант кэшируется и
// заново просчитывается только при изменении данных
</script>

<style scoped></style>
