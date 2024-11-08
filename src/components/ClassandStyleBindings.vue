<template>
  <div>
    <div class="static" :class="{ active: isActive, 'text-danger': hasError }"></div>
    <div :class="[activeClass, errorClass]"></div>
    <div
      :style="{
        backgroundColor: activeColor,
        fontSize: fontSize + 'px',
        width: width + 'px',
        height: height + 'px'
      }"
    ></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isActive = ref(true)
const hasError = ref(false)

const activeClass = ref('A')
const errorClass = ref('ER')

const activeColor = ref('red')
const fontSize = ref(16)
const width = ref(100)
const height = ref(100)
</script>

<style scoped>
.static {
  width: 100px;
  height: 100px;
  background-color: #333;
}
.active {
  background-color: #666;
}

.A {
  width: 100px;
  height: 100px;
  background-color: #9c2424;
}

.ER {
  width: 100px;
  height: 100px;
  background-color: #249c24;
}
</style>
