import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

const LoadingSpinner = () => {
  return (
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
      <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
    </div>
  )
}

const UsersItems = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="text-center">
      {user ? (
        <>
          <div className="flex flex-col gap-2 text-2xl mb-4">
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p>{user.website}</p>
          </div>
          <Link to="/users" className="text-blue-500">
            Back to Users
          </Link>
        </>
      ) : (
        <>
          <h1 className="font-bold text-4xl mb-4">User not found</h1>
          <Link to="/users" className="text-blue-500">
            Back to Users
          </Link>
        </>
      )}
    </div>
  );
};

export default UsersItems;
