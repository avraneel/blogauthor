import styles from "../css/authForm.module.css";
import { useNavigate } from "react-router";

export default function Create() {
  const navigate = useNavigate();
  async function handleSubmit(formData) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", localStorage.getItem("token"));
    console.log(typeof formData);
    const request = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        title: formData.get("title"),
        content: formData.get("content"),
      }),
    };

    const response = await fetch("http://localhost:3000/posts", request);
    const data = await response.json();
    navigate("/");
  }

  return (
    <div className={styles.formContainer}>
      <h2>Create a Post</h2>
      <form action={handleSubmit} className={styles.formBody}>
        <div className={styles.formItem}>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" />
        </div>
        <div className={styles.formItem}>
          <label htmlFor="content">Content</label>
          <textarea name="content" id="content" rows={10} cols={40}></textarea>
        </div>
        <button className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
}
