import { useState, useEffect } from "react";

interface Posts {
  id: number;
  title: string;
  body: string;
}

const LazyComponent = () => {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
          setPosts(data);
        })
        .catch((err) => {
            setError(err);
        });
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <div key={post.id}>
          <p className="font-bold text-lg">{post.title}</p>
          <p className="text-gray-500 text-sm">{post.body}</p>
        </div>
      ))}
    </div>
  )
}

export default LazyComponent;
