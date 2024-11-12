<template>
  <div class="file-list">
    <div class="test">
      <div class="text">
        <h3>
          Для запуска примера в настройках Адаптера Рутокен Плагин надо поставить флажок "Разрешить
          открывать локальные файлы по ссылкам".
        </h3>
        <h3>
          Для работы этой странички требуется ключевая пара и сертификат.
          <a href="http://ra.rutoken.ru" target="_blank">Создайте их на ra.rutoken.ru</a>
        </h3>
      </div>
      <div id="pluginStatus">
        <pre>Загрузка Плагина...</pre>
      </div>
      <div class="elements">
        <div v-for="file in files" :key="file.fileName" class="file-item">
          <span class="file-name">{{ file.fileName }}</span>
          <button @click="signX(file)">Подписать</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { sign } from './rutoken'

var files = ref([])
var hash = ref('')
onMounted(() => getFiles())

const getFiles = async () => {
  const response = await fetch('https://localhost:4445/files/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      Connection: 'keep-alive',
      Host: 'localhost:4445',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.3'
    }
  })
  const data = await response.json()
  files.value = data

  console.log(response)
}

const signFile = async (file) => {
  const response = await fetch(`https://localhost:4445/files/sigh/${file.fileName}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      Connection: 'keep-alive',
      Host: 'localhost:4445',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.3'
    }
  })
  const data = await response.json()
  hash.value = data
  console.log(hash.value)
}

const signX = async (file) => {
  await signFile(file)
  sign(hash.value)
}
</script>

<style scoped>
/* Общие стили */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  color: #333;
}
.elements {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
/* Стили для текста */
.test {
  max-width: 100%;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.text h3 {
  margin-bottom: 15px;
  font-size: 16px;
  color: #555;
}

.text a {
  color: #007bff;
  text-decoration: none;
}

.text a:hover {
  text-decoration: underline;
}

/* Стили для списка файлов */
.file-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  width: 100%;
  height: 100vh;
  max-width: 1200px;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 500px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #ffffff;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.file-item:hover {
  background-color: #e6f7ff;
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.1);
}

.file-name {
  font-weight: bold;
  font-size: 16px;
  color: #333;
}

button {
  padding: 8px 16px;
  font-size: 14px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

button:active {
  background-color: #004085;
  transform: translateY(0);
}

/* Статус загрузки плагина */
#pluginStatus {
  font-size: 14px;
  font-style: italic;
  color: #666;
  margin-top: 20px;
}
</style>
