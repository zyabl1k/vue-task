<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/widgets/HeaderWidget.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col pt-[var(--header-height)]">
    <Header />
    <main class="h-full min-h-screen grow p-6">
      <RouterView />
    </main>
    <footer
      class="z-10 flex w-full items-center justify-center border-t bg-background py-6"
    >
      <p>© 2024 My Website</p>
    </footer>
  </div>
</template>
