import { Link } from "react-router-dom"

const Users = () => {
  const userItems = [
    { id: 1, name: 'User Link 1' },
    { id: 2, name: 'User Link 2' },
    { id: 3, name: 'User Link 3' },
  ]

  return (
    <div className="text-center">
      <h1 className="font-bold text-4xl">Users Page</h1>
      <div className="flex justify-center gap-4 my-4">
        {userItems.map((user) => (
          <Link to={`/users/${user.id}`} key={user.id}>
            {user.name}
          </Link>
        ))}
      </div>
      <Link to="/" className="text-blue-500">Back to Home</Link>
    </div>
  )
}

export default Users