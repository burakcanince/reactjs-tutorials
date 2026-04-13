import { Minus, Plus } from "lucide-react";
import { useCounterStore } from "./CounterProvider";

function App() {
  const { count, inc, dec } = useCounterStore((state) => state)

  return (
    <div className="flex items-center gap-8">
      <button onClick={dec} className="bg-blue-500 cursor-pointer text-white p-5 rounded-full w-16 h-16">
        <Minus />
      </button>
      <div className="bg-blue-500 flex items-center justify-center font-bold rounded-md text-6xl text-white h-32 w-32">
        {count}
      </div>
      <button onClick={inc} className="bg-blue-500 cursor-pointer text-white p-5 rounded-full w-16 h-16">
        <Plus />
      </button>
    </div>
  );
}

export default App;
