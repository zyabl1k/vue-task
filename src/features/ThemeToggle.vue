<script setup>
import { ref, onMounted } from 'vue'

const isDarkTheme = ref(localStorage.getItem('theme') === 'dark')

function toggleTheme() {
  isDarkTheme.value = !isDarkTheme.value
  const theme = isDarkTheme.value ? 'dark' : 'light'
  document.body.className = theme
  localStorage.setItem('theme', theme)
}

onMounted(() => {
  document.body.className = isDarkTheme.value ? 'dark' : 'light'
})
</script>

<template>
  <div>
    <button @click="toggleTheme">
      {{ isDarkTheme ? 'Светлая' : 'Темная' }}
    </button>
  </div>
</template>
