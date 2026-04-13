import { useState, useEffect } from "react";
import { Trash } from "lucide-react";
import { useTodoStore } from "./store";

function App() {
  const [newTodo, setNewTodo] = useState("")
  const { todos, loading, error, fetchTodos, toggleTodo, addTodo, removeTodo } = useTodoStore()

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Todo App</h1>

      <div className="flex flex-col gap-3 mb-5">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="border-2 border-gray-300 outline-none rounded-md p-2"
        />
        <button
          onClick={() => {
            if (newTodo.trim()) {
              addTodo(newTodo.trim())
              setNewTodo("")
            }
          }}
          className={`rounded-md p-2 transition-colors ${
            newTodo.trim()
              ? 'bg-black text-white hover:bg-gray-800 cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Add Task
        </button>
      </div>

      <div className="space-y-4">
        {todos.map((todo) => (
          <div key={todo.id} className="bg-gray-100 flex items-center justify-between gap-4 rounded-lg p-3">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="cursor-pointer"
              />
              <span className={`text-left ${todo.completed && 'line-through text-gray-500'}`}>
                {todo.todo}
              </span>
            </div>
            <button onClick={() => removeTodo(todo.id)} className="cursor-pointer text-red-500">
              <Trash className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
