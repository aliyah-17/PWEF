import { ApiTodo, TodosApiResponse } from '@/types/api-todo';

const TODOS_URL = 'https://dummyjson.com/todos?limit=10&skip=0';

export async function GET() {
  try {
    const response = await fetch(TODOS_URL, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`DummyJSON returned ${response.status}`);
    }

    const result = (await response.json()) as TodosApiResponse;
    const data = result.todos.map((todo: ApiTodo) => ({
      id: todo.id,
      title: todo.todo,
      completed: todo.completed,
      userId: todo.userId,
      source: 'dummyjson-api',
    }));

    return Response.json({
      success: true,
      message: 'Koneksi ke DummyJSON API berhasil! Data berhasil diambil.',
      count: data.length,
      total: result.total,
      data,
    });
  } catch (error) {
    console.error('Failed to fetch todos:', error);

    return Response.json(
      {
        success: false,
        message: 'Gagal mengambil data todos dari DummyJSON API.',
        count: 0,
        total: 0,
        data: [],
      },
      { status: 502 },
    );
  }
}