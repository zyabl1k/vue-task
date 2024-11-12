<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getTasks, type TodoResponse } from '@/entities/todos'
import CgSpinner from '@/shared/ui/icons/CgSpinner.vue'

const todos = ref<TodoResponse[]>([])
const isLoading = ref(false)
const error = ref<Error | null>(null)
const route = useRoute()

const loadTasks = async (filter: string | undefined) => {
  isLoading.value = true
  todos.value = []
  error.value = null

  let completed: boolean | undefined
  if (filter === 'completed') completed = true
  else if (filter === 'incomplete') completed = false
  try {
    todos.value = await getTasks(completed)
  } catch (err) {
    error.value = err as Error
  } finally {
    isLoading.value = false
  }
}

watch(
  () => route.query.filter,
  (newFilter) => {
    loadTasks(newFilter as string | undefined)
  },
  { immediate: true },
)

onMounted(() => {
  loadTasks(route.query.filter as string | undefined)
})
</script>

<template>
  <CgSpinner v-if="isLoading" class="mx-auto mt-4 size-10 animate-spin" />
  <transition-group
    :class="{ hidden: isLoading }"
    name="list"
    tag="ul"
    class="flex flex-col gap-y-6"
  >
    <li
      v-for="todo in todos"
      :key="todo.id"
      class="w-full cursor-pointer items-center rounded bg-muted p-3"
    >
      <h2 class="text-lg font-semibold">{{ todo.title }}</h2>
      <div
        class="mt-2 w-fit rounded px-2"
        :class="{
          active: todo.completed,
          'bg-red-500 text-white': !todo.completed,
        }"
      >
        {{ todo.completed ? 'Активная' : 'Не активная' }}
      </div>
    </li>
  </transition-group>
</template>

<style scoped>
.list-enter-active {
  animation: bounce-in 1s;
}
.list-leave-active {
  animation: bounce-in 1s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
