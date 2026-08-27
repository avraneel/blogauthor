import { useState } from "react";
import styles from "../css/authForm.module.css";
import { useNavigate } from "react-router";
import url from "../url";

export default function Create() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  async function handleSubmit(formData) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", localStorage.getItem("token"));
    const request = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        title: formData.get("title"),
        content: formData.get("content"),
      }),
    };

    const response = await fetch(`${url}/posts`, request);
    console.log(response);
    const data = await response.json();
    navigate("/");
  }

  return (
    <div className={styles.formContainer}>
      <h2>Create a Post</h2>
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
