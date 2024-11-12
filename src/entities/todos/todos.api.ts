import { $api } from '@/shared/api/api.build'
import type { TodoResponse } from './todos.types'

export const getTasks = async (
  completed?: boolean,
): Promise<TodoResponse[]> => {
  const params = completed !== undefined ? { completed } : {}
  return await $api.get('todos', { params }).then((response) => {
    return response.data
  })
}
