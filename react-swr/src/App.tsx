import useSWR from 'swr'

interface User {
  id: number
  name: string
  email: string
}

function App() {
  const fetcher = (url: string) => fetch(url).then(res => res.json())
  const { data } = useSWR('https://jsonplaceholder.typicode.com/users', fetcher)

  if (!data) return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
      </div>
    </div>
  )

  return (
    <>
      <h1 className="font-bold text-4xl mb-8">SWR: React Hooks for Data Fetching</h1>
      {data.map((user: User) => (
        <div key={user.id} className="mb-4">
          <div className="font-bold text-lg">{user.name}</div>
          <div className="text-sm text-gray-500">{user.email}</div>
        </div>
      ))}
    </>
  )
}

export default App
