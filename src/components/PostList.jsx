import { Link } from "react-router";
import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router";

export default function PostList() {
  const [session, setSession] = useOutletContext();
  const navigate = useNavigate();
  const [postTitles, setPostTitles] = useState([]);

  async function getData() {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", localStorage.getItem("token"));

      const request = {
        method: "GET",
        headers: myHeaders,
      };
      const response = await fetch("http://localhost:3000/posts", request);
      const data = await response.json();
      setPostTitles(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function getPublicData() {
    try {
      const response = await fetch(
        "http://localhost:3000/posts?published=true",
      );
      const data = await response.json();
      setPostTitles(data);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    if (session) {
      getData();
    } else {
      getPublicData();
    }
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
    getData();
  }

  async function handleDelete(formData) {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", localStorage.getItem("token"));
      const request = {
        method: "DELETE",
        headers: myHeaders,
      };
      const response = await fetch(
        `http://localhost:3000/posts/${formData.get("delete")}`,
        request,
      );
      const data = await response.json();
      console.log(data);
      getData();
    } catch (err) {
      console.log(err.message);
    }
  }

  const listElements = postTitles.map((post) => (
    <li key={post.id}>
      <Link to={`posts/${post.id}`}>{post.title}</Link>
      {session && (
        <div>
          <form action={(formData) => handleSubmit(post.id, formData)}>
            <input
              type="hidden"
              name="published"
              value={post.published ? false : true}
            />
            <button>{post.published ? "Unpublish" : "Publish"}</button>
          </form>
          <form action={handleDelete}>
            <input type="hidden" name="delete" value={post.id} />
            <button>Delete Post</button>
          </form>
        </div>
      )}
    </li>
  ));

  return (
    <div className="postList">
      <ul>{listElements}</ul>
    </div>
  );
}
