import { Link } from "react-router";
import { useState, useEffect } from "react";

export default function PostList() {
  const [postTitles, setPostTitles] = useState([]);
  useEffect(() => {
    async function getData() {
      const response = await fetch("http://localhost:3000/posts");
      const data = await response.json();

      setPostTitles(data);
    }

    getData();
  }, []);

  const listElements = postTitles.map((post) => (
    <li key={post.id}>
      <Link to={`posts/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <div className="postList">
      <ul>{listElements}</ul>
    </div>
  );
}
