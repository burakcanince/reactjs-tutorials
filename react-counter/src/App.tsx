import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

function App() {
  const [counter, setCounter] = useState(0);

  const incrementCounter = () => {
    setCounter(counter + 10);
  }

  const decrementCounter = () => {
    setCounter(Math.max(0, counter - 10));
  }

  return (
      <div className="flex items-center gap-8">
        <button onClick={decrementCounter} className="bg-blue-500 cursor-pointer text-white p-5 rounded-full w-16 h-16">
          <Minus />
        </button>
        <div className="bg-blue-500 flex items-center justify-center font-bold rounded-md text-6xl text-white h-32 w-32">
          {counter}
        </div>
        <button onClick={incrementCounter} className="bg-blue-500 cursor-pointer text-white p-5 rounded-full w-16 h-16">
          <Plus />
        </button>
      </div>
  );
}

export default App;
