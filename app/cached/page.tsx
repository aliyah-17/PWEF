import TodoCachedApp from './components/TodoCachedApp';
import { getTodos } from '@/lib/todos';

export default async function CachedTodoPage() {
  const initialTodos = await getTodos();

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:py-16">
      <div className="mx-auto max-w-xl rounded-lg border border-gray-300 bg-white p-4 shadow-md sm:p-5">
        <header className="mb-3 border-b border-gray-300 pb-3 text-center">
          <h1 className="text-xl font-bold text-gray-800">Daftar Tugas (Todo List)</h1>
        </header>

        <TodoCachedApp initialTodos={initialTodos} />
      </div>
    </main>
  );
}
