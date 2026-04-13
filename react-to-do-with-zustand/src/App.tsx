import { useState } from "react";
import { Trash } from "lucide-react";
import { useTodoStore } from "./store";

function App() {
  const [newTodo, setNewTodo] = useState("")
  const { todos, addTodo, removeTodo } = useTodoStore()

  return (
    <>
      <div className="flex flex-col items-center gap-3">
        <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} className="border-2 border-gray-300 outline-none rounded-md p-2" />
        <button
          onClick={() => {
            if (newTodo.trim()) {
              addTodo(newTodo.trim())
              setNewTodo("")
            }
          }}
          className={`rounded-md w-full p-2 ${
            newTodo.trim()
              ? 'bg-black text-white cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Add Task
        </button>
      </div>
      {todos.map((todo) => (
        <div key={todo.id} className="flex items-center justify-between gap-2 my-4">
          <div>{todo.title}</div>
          <button onClick={() => removeTodo(todo.id)} className="cursor-pointer text-gray-500">
            <Trash className="w-5 h-5" />
          </button>
        </div>
      ))}
    </>
  );
}

export default App;
