import { useState } from 'react';
import { Trash } from 'lucide-react';

interface Task {
  id: number;
  title: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks(tasks => [...tasks, {id: tasks.length + 1, title: newTask}]);
      setNewTask('');
    }
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <>
      <div className="flex flex-col items-center gap-3">
        <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} className="border-2 border-gray-300 outline-none rounded-md p-2" />
        <button
          onClick={addTask}
          className={`rounded-md w-full p-2 ${
            newTask.trim()
              ? 'bg-black text-white cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Add Task
        </button>
      </div>
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center justify-between gap-2 my-4">
          <div>{task.title}</div>
          <button onClick={() => deleteTask(task.id)} className="cursor-pointer text-gray-500">
            <Trash className="w-5 h-5" />
          </button>
        </div>
      ))}
    </>
  );
}

export default App;
