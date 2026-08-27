import { useEffect, useState } from "react";
import styles from "../css/authForm.module.css";
import { useNavigate, useParams } from "react-router";

export default function Edit() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { postId } = useParams();
  const navigate = useNavigate();

  async function handleSubmit(formData) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", localStorage.getItem("token"));
    console.log(formData.get("title"));
    const request = {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify({
        title: formData.get("title"),
        content: formData.get("content"),
      }),
    };

    const response = await fetch(
      `http://localhost:3000/posts/${postId}`,
      request,
    );
    const data = await response.json();
    navigate("/");
  }

  useEffect(() => {
    async function getPosts(postId) {
      const response = await fetch(`http://localhost:3000/posts/${postId}`);
      const data = await response.json();
      setTitle(data.title);
      setContent(data.content);
    }
    getPosts(postId);
  }, []);
  return (
    <div className={styles.formContainer}>
      <h2>Edit Post</h2>
      <form action={handleSubmit} className={styles.formBody}>
        <div className={styles.formItem}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.formItem}>
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            id="content"
            rows={10}
            cols={40}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
}
