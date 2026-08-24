import styles from "../css/authForm.module.css";

export default function Create() {
  return (
    <div className={styles.formContainer}>
      <h2>Create a Post</h2>
      <form action="" className={styles.formBody}>
        <div className={styles.formItem}>
          <label htmlFor="ttle">Title</label>
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
