import { useNavigate } from "react-router";
import styles from "../css/authForm.module.css";

export default function SignUp() {
  const navigate = useNavigate();

  async function handleSubmit(formData) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", localStorage.getItem("token"));

    const request = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        fullname: formData.get("fullname"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    };

    const response = await fetch("http://localhost:3000/users", request);
    if (response.ok) {
      console.log("i am here");
      navigate("/");
    }
  }

  const url = "http://localhost:3000/users";
  return (
    <main className={styles.formContainer}>
      <h2>Sign Up</h2>
      <form action={url} method="post" className={styles.formBody}>
        <div className={styles.formItem}>
          <label htmlFor="fullname">Full Name *</label>
          <input type="text" name="fullname" id="fullname" required />
        </div>
        <div className={styles.formItem}>
          <label htmlFor="email">Email *</label>
          <input type="email" name="email" id="email" required />
        </div>
        <div className={styles.formItem}>
          <label htmlFor="password">Password *</label>
          <input type="password" name="password" id="password" required />
        </div>
        <div className={styles.formItem}>
          <label htmlFor="confirm-password">Confirm Password *</label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            required
          />
        </div>
        <button className={styles.submitButton}>Submit</button>
      </form>
    </main>
  );
}
