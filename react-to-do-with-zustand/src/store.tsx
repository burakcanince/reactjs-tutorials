import { create } from "zustand";

type Todo = {
  id: number
  title: string
}

type TodoStore = {
  todos: Todo[]
  addTodo: (title: string) => void
  removeTodo: (id: number) => void
}

export const useTodoStore = create<TodoStore>((set) => ({
    todos: [],
    addTodo: (title) => set((state) => ({
      todos: [...state.todos, { id: state.todos.length + 1, title }]
    })),
    removeTodo: (id) => set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
}));
