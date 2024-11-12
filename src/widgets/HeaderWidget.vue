<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ThemeToggle from '@/features/ThemeToggle.vue'

export default defineComponent({
  name: 'Header',
  components: { ThemeToggle },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const currentFilter = ref(route.query.filter || 'all')
    const setFilter = (filter: string) => {
      if (currentFilter.value !== filter) {
        currentFilter.value = filter
        router.push({ query: { ...route.query, filter } })
      }
    }
    watch(
      () => route.query.filter,
      (newFilter) => {
        currentFilter.value = newFilter || 'all'
      },
      { immediate: true },
    )
    return { currentFilter, setFilter }
  },
})
</script>

<template>
  <header
    class="fixed top-0 z-50 flex h-[var(--header-height)] w-full items-center justify-between border-b bg-background px-6"
  >
    <nav class="flex h-full items-center justify-start gap-x-4">
      <button
        class="rounded bg-muted px-4 py-1 transition-opacity hover:opacity-70"
        :class="{ active: currentFilter === 'all' }"
        @click="setFilter('all')"
      >
        Все
      </button>
      <button
        class="rounded bg-muted px-4 py-1 transition-opacity hover:opacity-70"
        :class="{ active: currentFilter === 'completed' }"
        @click="setFilter('completed')"
      >
        Выполненные
      </button>
      <button
        class="rounded bg-muted px-4 py-1 transition-opacity hover:opacity-70"
        :class="{ active: currentFilter === 'incomplete' }"
        @click="setFilter('incomplete')"
      >
        Не выполненные
      </button>
    </nav>
    <ThemeToggle />
  </header>
</template>
