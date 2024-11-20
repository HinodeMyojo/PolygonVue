<template>
  <div class="main">
    <div class="cont">
      <div class="inner-block">
        <div class="sertificat">
          <label for="sertifications">Список сертификатов</label>
          <select v-model="selectedSert" id="sertifications">
            <option v-for="item in sertificats" :key="item.id" :value="item.value">
              {{ item.label }}
            </option>
          </select>
        </div>
        <div class="sigh">
          <label for="file">Выбрать файл</label>
          <input @change="onChangeFile" type="file" />
          <hr />
          <label for="sigh">Подписать хэш</label>
          <textarea readonly :value="base64" name="" id="sigh"></textarea>
          <button @click="sighHash" class="sigh-button">Подписать</button>
        </div>
        <div class="result-sigh">
          <label for="result">Подпись в формате base64</label>
          <textarea v-model="signature" readonly name="" id="result"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useBase64 } from '@vueuse/core'
import cadesplugin from 'crypto-pro-cadesplugin'

// Блок импорта файла и его конвертация в base64
const file = ref()
const onChangeFile = (e) => {
  file.value = e.target.files[0]
}
const { base64 } = useBase64(file)

// Блок вывода сертификатов
const sertificats = ref([])
const selectedSert = ref(null)

onMounted(async () => {
  getSertList().then((res) => {
    sertificats.value = res
  })
})

async function getSertList() {
  const certsApi = await cadesplugin()
  const certsList = await certsApi.getCertsList()
  const list = certsList.map(({ subjectInfo, thumbprint }) => ({
    value: thumbprint,
    label: subjectInfo
  }))
  console.log(list)
  return list
}
// Блок подписи хэша
const signature = ref('')

const sighHash = async () => {
  console.log(base64)
  const certsApi = await cadesplugin()
  const sign = await certsApi.signBase64(selectedSert.value, base64)
  signature.value = sign
  console.log(signature.value)
}
</script>

<style scoped>
.main {
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
}
.cont {
  width: 800px;
  height: 500px;
  border: 1px solid black;
  align-content: center;
}
.sertificat {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.inner-block {
  display: flex;
  width: 90%;
  height: 90%;
  flex-direction: column;
  align-items: center;
  justify-self: center;
  gap: 20px;
}
.sigh {
  display: flex;
  gap: 5px;
  flex-direction: column;
  width: 100%;
}
.result-sigh {
  width: 100%;
  display: flex;
  flex-direction: column;
}
hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #000000;
  margin: 1em 0;
  padding: 0;
}
.sigh-button {
  width: 20%;
}
</style>