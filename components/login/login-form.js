import Link from "next/link";
import classes from "./login-form.module.css";

function LoginForm() {
  return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required />
        </div>
        <div className={classes.actions}>
          <button type="submit">Login</button>
          <Link href="/signup">Create new account</Link>
        </div>
      </form>
    </section>
  );
}

export default LoginForm;
