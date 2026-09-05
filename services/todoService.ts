import { ApiError, apiClient } from './api';
import { ApiTodo, TaskItem, TodosApiResponse } from '@/types/api-todo';

const BASE_URL = 'https://dummyjson.com/todos';

export async function fetchTodos(): Promise<TaskItem[]> {
  const data = await apiClient<TodosApiResponse>(`${BASE_URL}?limit=10&skip=0`);
  return data.todos.map((todo) => ({
    id: todo.id,
    title: todo.todo,
    completed: todo.completed,
    description: `Todo dari user ${todo.userId}`,
  }));
}

export async function fetchTodoById(id: number): Promise<TaskItem> {
  const data = await apiClient<ApiTodo>(`${BASE_URL}/${id}`);
  return {
    id: data.id,
    title: data.todo,
    completed: data.completed,
    description: `Todo dari user ${data.userId}`,
  };
}

export async function createTodo(title: string): Promise<TaskItem> {
  const data = await apiClient<ApiTodo>(BASE_URL, {
    method: 'POST',
    body: JSON.stringify({ todo: title, completed: false, userId: 1 }),
  });

  return {
    id: data.id,
    title: data.todo,
    completed: data.completed,
    description: `Todo baru dibuat untuk user ${data.userId}`,
  };
}

export async function updateTodoStatus(id: number, completed: boolean): Promise<TaskItem> {
  const data = await apiClient<ApiTodo>(`${BASE_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ completed }),
  });

  return {
    id: data.id,
    title: data.todo,
    completed: data.completed,
    description: `Todo ${data.id} diperbarui`,
  };
}

export async function deleteTodo(id: number): Promise<void> {
  await apiClient<{ deleted: boolean; id: number }>(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
}
