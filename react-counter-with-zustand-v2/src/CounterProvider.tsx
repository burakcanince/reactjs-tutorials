import { createContext, useContext, useState } from 'react';
import { createStore, type StoreApi, useStore } from 'zustand';

type CounterStore = {
  count: number;
  inc: () => void;
  dec: () => void;
};

const CounterContext = createContext<StoreApi<CounterStore> | undefined>(undefined);

export default function CounterProvider({
  children,
  initialCount,
}: {
  children: React.ReactNode;
  initialCount: number;
}) {
  const [store] = useState(() =>
    createStore<CounterStore>((set) => ({
      count: initialCount,
      inc: () => set((state) => ({ count: state.count + 1 })),
      dec: () => set((state) => ({ count: state.count - 1 })),
    })),
  );

  return (
    <CounterContext.Provider value={store}>
      {children}
    </CounterContext.Provider>
  );
}

export function useCounterStore<T>(selector: (state: CounterStore) => T): T {
  const context = useContext(CounterContext);

  if (!context) {
    throw new Error('useCountStore must be used within CounterProvider');
  }

  return useStore(context, selector);
}
