import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import Topbar from "./Topbar";
import styles from "../styles/content.module.css";

export default function App() {
  const [session, setSession] = useState(
    () => JSON.parse(localStorage.getItem("session")) || null,
  );
  console.log(session);
  return (
    <>
      <div className={styles.content}>
        <Topbar session={session} />
        <Outlet context={[session, setSession]} />
      </div>
    </>
  );
}
