'use client';

import React, { useEffect } from 'react';
import TodoForm from '@/app/components/TodoForm';
import TodoList from '@/app/components/TodoList';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Todo } from '@/types/todo';

type TodoCachedAppProps = {
  initialTodos: Todo[];
};

function normalizeTodoIds(items: Todo[]) {
  const usedIds = new Set<number>();
  let nextId = Math.max(0, ...items.map((todo) => todo.id)) + 1;

  return items.map((todo) => {
    if (!usedIds.has(todo.id)) {
      usedIds.add(todo.id);
      return todo;
    }

    const replacement = { ...todo, id: nextId };
    usedIds.add(nextId);
    nextId += 1;
    return replacement;
  });
}

export default function TodoCachedApp({ initialTodos }: TodoCachedAppProps) {
  const [todos, setTodos] = useLocalStorage<Todo[]>('TODO_LIST_CACHE', initialTodos);
  const normalizedTodos = normalizeTodoIds(todos);

  useEffect(() => {
    const hasChangedIds = todos.some(
      (todo, index) => todo.id !== normalizedTodos[index]?.id,
    );

    if (hasChangedIds) {
      setTodos(normalizedTodos);
    }
  }, [normalizedTodos, setTodos, todos]);

  const handleAddTodo = (title: string) => {
    setTodos((prev) => {
      const nextId = Math.max(0, ...prev.map((todo) => todo.id)) + 1;
      const newTodo: Todo = {
        id: nextId,
        title,
        description: 'Tugas baru yang disimpan ke localStorage.',
        completed: false,
        createdAt: new Date().toISOString().split('T')[0],
      };

      return [newTodo, ...prev];
    });
  };

  const handleToggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleResetToDefault = () => {
    setTodos(initialTodos);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1 text-[10px] text-gray-500">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Cache aktif (localStorage: TODO_LIST_CACHE)
        </span>
        <button
          type="button"
          onClick={handleResetToDefault}
          className="text-[10px] text-gray-500 underline hover:text-primary-90"
        >
          Reset ke default
        </button>
      </div>

      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList todos={normalizedTodos} onToggleTodo={handleToggleTodo} onDeleteTodo={handleDeleteTodo} />
    </div>
  );
}
