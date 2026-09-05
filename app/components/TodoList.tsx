'use client';

import TodoItem from './TodoItem';
import { Todo } from '@/types/todo';

type TodoListProps = {
  todos: Todo[];
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
};

export default function TodoList({ todos, onToggleTodo, onDeleteTodo }: TodoListProps) {
  if (todos.length === 0) {
    // (opsional) tampilkan empty state di sini
  }

  return (
    <div className="mt-5">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-800">Daftar Tugas</h2>
        <span className="rounded-full bg-gray-70 px-2 py-0.5 text-[10px] font-medium text-gray-600">
          {todos.length} item
        </span>
      </div>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggleTodo}
            onDelete={onDeleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}