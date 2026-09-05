import { TaskItem } from '@/types/api-todo';

export function formatApiTodoToTask(todo: {
  id: number;
  todo: string;
  completed: boolean;
  userId?: number;
}): TaskItem {
  return {
    id: todo.id,
    title: todo.todo,
    completed: todo.completed,
    description: todo.userId ? `Todo dari user ${todo.userId}` : 'Todo dari API',
  };
}

export async function getTasks(): Promise<TaskItem[]> {
  const response = await fetch('https://dummyjson.com/todos?limit=10');

  if (!response.ok) {
    throw new Error('Gagal mengambil data todos');
  }

  const data = await response.json();
  return data.todos.map((todo: { id: number; todo: string; completed: boolean; userId?: number }) =>
    formatApiTodoToTask(todo),
  );
}

export async function getTaskById(id: number): Promise<TaskItem | null> {
  const response = await fetch(`https://dummyjson.com/todos/${id}`);

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return formatApiTodoToTask(data);
}

export async function getTaskStats(tasks: TaskItem[]) {
  return {
    total: tasks.length,
    completed: tasks.filter((task) => task.completed).length,
    pending: tasks.filter((task) => !task.completed).length,
  };
}
