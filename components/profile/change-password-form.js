import { useEffect, useState, useRef } from "react";

import { passwordValidation } from "../../lib/password-validator";
import Notification from "../ui/notification";
import classes from "./change-password-form.module.css";

async function sendPasswordUpdateRequest(updationData) {
  try {
    const response = await fetch("/api/change-password", {
      method: "PATCH",
      body: JSON.stringify(updationData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) return { status: "error", remarks: data.message };

    return { status: "success", remarks: data.message };
  } catch (error) {
    return { status: "error", remarks: error.message };
  }
}

function ChangePasswordForm() {
  const currentPasswordRef = useRef();
  const newPasswordRef = useRef();
  const newPassword2Ref = useRef();
  const [passwordUpdateRemarks, setPasswordUpdateRemarks] = useState();
  const [passwordUpdateStatus, setPasswordUpdateStatus] = useState();

  function newPasswordsMatchHandler() {
    const password = newPasswordRef.current.value;
    const password2 = newPassword2Ref.current.value;
    if (password.trim() === "" || password2.trim === "") {
      setPasswordUpdateRemarks();
      return;
    }
    if (password === password2) setPasswordUpdateRemarks();
    else {
      setPasswordUpdateStatus("error");
      setPasswordUpdateRemarks("Passwords do not match!");
    }
  }

  async function passwordUpdateHandler(event) {
    event.preventDefault();
    const enteredCurrentPassword = currentPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;
    const enteredNewPassword2 = newPassword2Ref.current.value;

    const {
      status: passwordValidationStatus,
      remarks: passwordValidationRemarks,
    } = passwordValidation(enteredNewPassword, enteredNewPassword2);

    if (passwordValidationStatus === "error") {
      setPasswordUpdateStatus(passwordValidationStatus);
      setPasswordUpdateRemarks(passwordValidationRemarks);
      return;
    }

    if (enteredCurrentPassword === enteredNewPassword) {
      setPasswordUpdateStatus("error");
      setPasswordUpdateRemarks(
        "New password must be different than your Current password"
      );
      return;
    }

    setPasswordUpdateStatus("pending");
    setPasswordUpdateRemarks("Updating your password ...");

    const {
      status: passwordUpdationResponseStatus,
      remarks: passwordUpdationResponseRemarks,
    } = await sendPasswordUpdateRequest({
      currentPassword: enteredCurrentPassword,
      newPassword: enteredNewPassword,
    });

    setPasswordUpdateStatus(passwordUpdationResponseStatus);
    setPasswordUpdateRemarks(passwordUpdationResponseRemarks);
  }

  return (
    <section className={classes.profile}>
      <h1>Change Password</h1>
      <form className={classes.form} onSubmit={passwordUpdateHandler}>
        <div className={classes.control}>
          <label htmlFor="current-password">Enter Current Password</label>
          <input
            type="password"
            id="current-password"
            required
            ref={currentPasswordRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="new-password">Enter New Password</label>
          <input
            type="password"
            id="new-password"
            required
            ref={newPasswordRef}
            onChange={newPasswordsMatchHandler}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="new-password2">Reenter New Password</label>
          <input
            type="password"
            id="new-password2"
            required
            ref={newPassword2Ref}
            onChange={newPasswordsMatchHandler}
          />
        </div>
        {passwordUpdateRemarks && (
          <Notification
            type={passwordUpdateStatus}
            message={passwordUpdateRemarks}
          />
        )}
        <div className={classes.action}>
          <button>Change Password</button>
        </div>
      </form>
    </section>
  );
}

export default ChangePasswordForm;
