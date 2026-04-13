import { Link } from "react-router-dom"

const About = () => {
  return (
    <div className="text-center">
      <h1 className="font-bold text-4xl mb-4">About Page</h1>
      <Link to="/" className="text-blue-500">Back to Home</Link>
    </div>
  )
}

export default About