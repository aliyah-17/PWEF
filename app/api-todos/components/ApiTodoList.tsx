'use client';

import { useEffect, useState } from 'react';
import { fetchTodos, updateTodoStatus } from '@/services/todoService';
import { TaskItem } from '@/types/api-todo';

export default function ApiTodoList() {
  const [todos, setTodos] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await fetchTodos();
        setTodos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  const handleToggleTask = async (id: number) => {
    const targetTodo = todos.find((todo) => todo.id === id);
    if (!targetTodo) return;

    const optimisticTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    setTodos(optimisticTodos);

    try {
      const updated = await updateTodoStatus(id, !targetTodo.completed);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === updated.id ? updated : todo)),
      );
    } catch (error) {
      console.error(error);
      setTodos(todos);
    }
  };

  if (loading) {
    return <div className="text-center text-slate-500">Memuat data dari API...</div>;
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTask(todo.id)}
              className="h-5 w-5 accent-blue-600"
            />
            <div>
              <div className={`font-medium ${todo.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                {todo.title}
              </div>
              <div className="text-xs text-slate-500">{todo.description}</div>
            </div>
          </div>
          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${
              todo.completed ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
            }`}
          >
            {todo.completed ? 'Selesai' : 'Aktif'}
          </span>
        </div>
      ))}
    </div>
  );
}
