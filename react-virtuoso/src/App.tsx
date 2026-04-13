import { Virtuoso } from 'react-virtuoso'
import { useMemo } from 'react'

function App() {
  const users = useMemo(() => {
    return Array.from({ length: 100000 }, (_, index) => ({
      name: `Title ${index}`,
      description: `Description for user ${index}`
    }))
  }, [])

  return (
    <Virtuoso
      style={{ height: '400px', width: '400px', border: '4px solid #eee' }}
      data={users}
      itemContent={(_, user) => (
        <div className="p-2 border-b border-gray-200">
          <p className="text-lg font-bold">{user.name}</p>
          <p className="text-sm text-gray-500">{user.description}</p>
        </div>
      )}
    />
  );
}

export default App;
