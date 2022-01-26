import Link from "next/link";
import classes from "./user-profile.module.css";

function UserProfile(props) {
  const { name: userName } = props.session.user;
  return (
    <section className={classes.profile}>
      <h1>Welcome {userName}</h1>
      <Link href="/change-password">
        <a>
          <div className={classes.actions}>
            <button type="button">Change Password</button>
          </div>
        </a>
      </Link>
    </section>
  );
}

export default UserProfile;
