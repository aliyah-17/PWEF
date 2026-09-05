import ApiTodoList from './components/ApiTodoList';

export default function ApiTodosPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
        <header className="mb-8 border-b border-slate-200 pb-4">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet-600">DummyJSON</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-800">Todo dari API eksternal</h1>
        </header>

        <ApiTodoList />
      </div>
    </main>
  );
}
