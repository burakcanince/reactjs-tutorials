import { Virtuoso } from 'react-virtuoso'
import { useState, useCallback, useEffect } from 'react'

interface User {
  name: string;
  description: string;
}

const Header = () => {
  return <div className="border-b border-gray-200 font-bold text-lg text-center p-2">Endless Scrolling</div>
}
  
const Footer = () => {
  return <div className="font-bold text-lg p-2">Loading...</div>
}

const generateUsers = (count: number, start: number) => {
  return Array.from({ length: count }, (_, i) => ({
    name: `User ${start + i}`,
    description: `Description for user ${start + i}`
  }))
}

function EndlessScrolling() {
  const [users, setUsers] = useState<User[]>([]);

  const loadMore = useCallback(() => {
    setTimeout(() => {
      setUsers((users) => [
        ...users,
        ...generateUsers(100, users.length)
      ]);
    }, 500);
  }, [setUsers]);

  useEffect(() => {
    loadMore();
  }, [loadMore]);

  return (
    <Virtuoso
      style={{ height: '400px', width: '400px', border: '4px solid #eee' }}
      data={users}
      endReached={loadMore}
      increaseViewportBy={100}
      components={{ Header, Footer }}
      itemContent={(_, user) => (
        <div className="p-2 border-b border-gray-200">
          <p className="text-lg font-bold">{user.name}</p>
          <p className="text-sm text-gray-500">{user.description}</p>
        </div>
      )}
    />
  );
}

export default EndlessScrolling;
