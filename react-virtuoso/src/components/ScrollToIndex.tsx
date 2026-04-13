import { Virtuoso, type VirtuosoHandle } from 'react-virtuoso'
import { useMemo, useRef } from 'react'

function ScrollToIndex() {
  const users = useMemo(() => {
    return Array.from({ length: 100000 }, (_, index) => ({
      name: `Title ${index}`,
      description: `Description for user ${index}`
    }))
  }, [])

  const virtuoso = useRef<VirtuosoHandle>(null);

  return (
    <>
      <Virtuoso
        ref={virtuoso}
        style={{ height: '400px', width: '400px', border: '4px solid #eee' }}
        data={users}
        itemContent={(_, user) => (
          <div className="p-2 border-b border-gray-200">
            <p className="text-lg font-bold">{user.name}</p>
            <p className="text-sm text-gray-500">{user.description}</p>
          </div>
        )}
      />
      <button
        className="bg-gray-800 cursor-pointer rounded-md text-white w-full mt-4 p-2"
        onClick={() => {
          virtuoso.current?.scrollToIndex({
            index: Math.floor(Math.random() * users.length),
            align: 'start',
            behavior: 'smooth'
          });
        }}
      >
        Go to random index
      </button>
    </>
  );
}

export default ScrollToIndex;
