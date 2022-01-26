import { useEffect, useRef, useState } from "react";

import { passwordValidation } from "../../lib/password-validator";
import Notification from "../ui/notification";
import classes from "./signup-form.module.css";

async function sendSignupRequest(signupData) {
  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(signupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) return { status: "error", remarks: data.message };

    return { status: "success", remarks: "You are registered successfully!" };
  } catch (error) {
    return { status: "error", remarks: error.message };
  }
}

function SignupForm() {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const password2InputRef = useRef();
  const [signupRemarks, setSignupRemarks] = useState();
  const [signupStatus, setSignupStatus] = useState();

  useEffect(() => {
    if (signupStatus === "success" || signupStatus === "error") {
      const timer = setTimeout(() => {
        setSignupStatus();
        setSignupRemarks();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [signupStatus]);

  function passwordMatchHandler() {
    const password = passwordInputRef.current.value;
    const password2 = password2InputRef.current.value;
    if (password.trim() === "" || password2.trim === "") {
      setSignupRemarks();
      return;
    }
    if (password === password2) setSignupRemarks();
    else {
      setSignupStatus("error");
      setSignupRemarks("Passwords do not match!");
    }
  }

  async function signupHandler(event) {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredPassword2 = password2InputRef.current.value;

    const {
      status: passwordValidationStatus,
      remarks: passwordValidationRemarks,
    } = passwordValidation(enteredPassword, enteredPassword2);

    if (passwordValidationStatus === "error") {
      setSignupStatus(passwordValidationStatus);
      setSignupRemarks(passwordValidationRemarks);
      return;
    }

    setSignupStatus("pending");
    setSignupRemarks("Registering your details...");

    const { status: signupResponseStatus, remarks: signupResponseRemarks } =
      await sendSignupRequest({
        name: enteredName,
        email: enteredEmail,
        password: enteredPassword,
      });

    setSignupStatus(signupResponseStatus);
    setSignupRemarks(signupResponseRemarks);
  }

  return (
    <section className={classes.auth}>
      <h1>Sign Up</h1>
      <form onSubmit={signupHandler}>
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
        {signupRemarks && (
          <Notification type={signupStatus} message={signupRemarks} />
        )}
        <div className={classes.actions}>
          <button>Create Account</button>
        </div>
      </form>
    </section>
  );
}

export default SignupForm;
