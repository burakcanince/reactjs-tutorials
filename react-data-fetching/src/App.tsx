import { useEffect, useState } from "react";

const BASE_URL = "https://jsonplaceholder.typicode.com";

interface Post {
  id: number;
  title: string;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null); 
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`${BASE_URL}/posts`);
        const postsData = await response.json();
        setPosts(postsData);
      } catch (error) {
        setError("Error fetching posts: " + error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">Data Fetching in React</h1>

      {isLoading && <div>Loading...</div>}

      <ul className="max-h-[500px] overflow-y-auto">
        {posts.map((post) => (
          <li key={post.id} className="border-b border-gray-300 p-2">{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
