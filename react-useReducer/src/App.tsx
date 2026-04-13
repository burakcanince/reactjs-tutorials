import { useReducer } from 'react';

function reducer(state: number, action: string) {
  switch (action) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    default:
      throw new Error();
  }
}

function App() {
  const [count, dispatch] = useReducer(reducer, 0);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Count: {count}</h1>
      <div className="flex gap-2">
        <button className="bg-blue-500 cursor-pointer text-white p-3 rounded-md" onClick={() => dispatch('increment')}>Increment</button>
        <button className="bg-red-500 cursor-pointer text-white p-3 rounded-md" onClick={() => dispatch('decrement')}>Decrement</button>
      </div>
    </div>
  );
}

export default App;
