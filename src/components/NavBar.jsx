import { Link } from "react-router";
import styles from "../css/topBar.module.css";

export default function NavBar({ session, setSession }) {
  const topbarTitles =
    session === null
      ? [
          { text: "Home", url: "/" },
          { text: "Login", url: "login" },
          { text: "Sign Up", url: "signup" },
        ]
      : [
          { text: "Home", url: "/" },
          { text: "Create", url: "create" },
          { text: session.fullname, url: `/users/${session.id}` },
          { text: "Log Out", url: "/" },
        ];

  const topbarItems = topbarTitles.map((item, index) =>
    item.text === "Log Out" ? (
      <li key={index}>
        <Link to={item.url} className={styles.topBarItem} onClick={logout}>
          {item.text}
        </Link>
      </li>
    ) : (
      <li key={index}>
        <Link to={item.url} className={styles.topBarItem}>
          {item.text}
        </Link>
      </li>
    ),
  );

  const topBar = (
    <nav>
      <ul className={styles.topBar}>{topbarItems}</ul>
    </nav>
  );

  return topBar;
}

function logout(setSession) {
  localStorage.removeItem("token");
  localStorage.removeItem("session");
  setSession(null);
}
