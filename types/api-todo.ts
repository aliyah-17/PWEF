export type ApiTodo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};

export type TodosApiResponse = {
  todos: ApiTodo[];
  total: number;
  skip: number;
  limit: number;
};

export type TaskItem = {
  id: number;
  title: string;
  completed: boolean;
  description?: string;
};

export type ApiResponse<T> = {
  data: T;
  message?: string;
};
