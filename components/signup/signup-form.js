import { useRef, useState } from "react";
import classes from "./signup-form.module.css";

function SignupForm() {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const password2InputRef = useRef();
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  function passwordMatchHandler(event) {
    const password = passwordInputRef.current.value;
    const password2 = password2InputRef.current.value;
    if (password.trim() === "" || password2.trim === "") {
      setPasswordMismatch(false);
      return;
    }
    if (password === password2) setPasswordMismatch(false);
    else setPasswordMismatch(true);
  }

  return (
    <section className={classes.auth}>
      <h1>Sign Up</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" required ref={nameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
            onChange={passwordMatchHandler}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password2">Reenter Password</label>
          <input
            type="password"
            id="password2"
            required
            ref={password2InputRef}
            onChange={passwordMatchHandler}
          />
        </div>
        {passwordMismatch && (
          <div className={classes.error}>Passwords do not match !</div>
        )}
        <div className={classes.actions}>
          <button>Create Account</button>
        </div>
      </form>
    </section>
  );
}

export default SignupForm;
