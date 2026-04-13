import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="text-center">
      <h1 className="font-bold text-4xl mb-4">404 Not Found</h1>
      <Link to="/" className="text-blue-500">Back to Home</Link>
    </div>
  )
}

export default NotFound