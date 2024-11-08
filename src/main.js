import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

const app = createApp(App)

// Обработка ошибок
app.config.errorHandler = (err) => {
  console.error(err)
}

// Так же можно зарегистрировать компонент:
// Это сделает компонент TodoDeleteButton доступным для использования в любом месте приложения.
// app.component('TodoDeleteButton', TodoDeleteButton)

app.use(createPinia())

app.mount('#app')
