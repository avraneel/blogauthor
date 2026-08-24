import { useOutletContext } from "react-router";

export default function User() {
  const [session, setSession] = useOutletContext();
  return (
    <div className="userProfile">
      <h2>{session.fullname}</h2>
      <div className="detail">
        <div className="itemName">Email</div>
        <div className="itemValue">{session.email}</div>
      </div>
    </div>
  );
}
