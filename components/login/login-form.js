import Link from "next/link";
import { signIn } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import Notification from "../ui/notification";
import classes from "./login-form.module.css";

function LoginForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const router = useRouter();
  const [loginStatus, setLoginStatus] = useState();
  const [loginRemarks, setLoginRemarks] = useState();

  useEffect(() => {
    if (loginStatus === "error") {
      const timer = setTimeout(() => {
        setLoginStatus();
        setLoginRemarks();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [loginStatus]);

  async function loginHandler(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setLoginStatus("pending");
    setLoginRemarks("Logging you in");

    const result = await signIn("credentials", {
      redirect: false,
      email: enteredEmail,
      password: enteredPassword,
    });
    if (result.error) {
      setLoginStatus("error");
      setLoginRemarks(result.error);
      return;
    }
    router.replace("/profile");
  }

  return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <form onSubmit={loginHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        {loginRemarks && (
          <Notification type={loginStatus} message={loginRemarks} />
        )}
        <div className={classes.actions}>
          <button type="submit">Login</button>
          <Link href="/signup">Create new account</Link>
        </div>
      </form>
    </section>
  );
}

export default LoginForm;
