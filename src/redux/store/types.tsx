export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  editMode: boolean;
}

export type TodoList = Todo[];
