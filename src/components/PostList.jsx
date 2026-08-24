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

  async function handleSubmit(postId, formData) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", localStorage.getItem("token"));
    const request = {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify({
        published: formData.get("published"),
      }),
    };

    const response = await fetch(
      `http://localhost:3000/posts/${postId}`,
      request,
    );
    const data = await response.json();
  }

  const listElements = postTitles.map((post) => (
    <li key={post.id}>
      <Link to={`posts/${post.id}`}>{post.title}</Link>
      <form action={(formData) => handleSubmit(post.id, formData)}>
        <input
          type="hidden"
          name="published"
          value={post.published ? false : true}
        />
        <button>{post.published ? "Unpublish" : "Publish"}</button>
      </form>
    </li>
  ));

  return (
    <div className="postList">
      <ul>{listElements}</ul>
    </div>
  );
}
