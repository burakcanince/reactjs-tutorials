import { Link } from 'react-router-dom'

function App() {
  return (
    <>
      <h1 className="font-bold text-4xl mb-4">React Router</h1>
      <div className="flex justify-center gap-4">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/users">Users</Link>
      </div>
    </>
  )
}

export default App
