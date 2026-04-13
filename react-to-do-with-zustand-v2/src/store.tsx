import { create } from "zustand";

type Todo = {
  id: number
  todo: string
  completed: boolean
}

type TodoStore = {
  todos: Todo[]
  loading: boolean
  error: string | null
  fetchTodos: () => Promise<void>
  toggleTodo: (id: number) => void
  addTodo: (title: string) => void
  removeTodo: (id: number) => void
}

export const useTodoStore = create<TodoStore>((set) => ({
    todos: [],
    loading: false,
    error: null,

    fetchTodos: async () => {
      set({ loading: true, error: null });
      try {
        const response = await fetch('https://dummyjson.com/todos');
        const data = await response.json();
        set({ todos: data.todos, loading: false });
      } catch (error) {
        console.error("Error", error);
        set({ loading: false, error: 'Failed to fetch todos' });
      }
    },

    toggleTodo: (id) => set((state) => ({
      todos: state.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    })),

    addTodo: (title) => set((state) => ({
      todos: [...state.todos, {
        id: state.todos.length + 1,
        todo: title,
        completed: false
      }]
    })),

    removeTodo: (id) => set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
}));
