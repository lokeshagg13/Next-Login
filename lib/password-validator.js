export function passwordValidation(password, password2) {
  if (password !== password2)
    return { status: "error", remarks: "Passwords do not match!" };

  const passwordErrorRemarks =
    "Password must have 6-16 characters including an upper case letter, a lower case letter, a special character and a number, without any whitespaces";
  if (password.trim().length < 6 || password.trim().length > 16)
    return { status: "error", remarks: passwordErrorRemarks };

  const upperCaseValidation = /(?=.*[A-Z])/.test(password);
  const lowerCaseValidation = /(?=.*[a-z])/.test(password);
  const digitValidation = /(?=.*\d)/.test(password);
  const specialCharactersValidation =
    /(?=.*[!@#$%^&*()_\-+=~`{[}\]\\\|'":;?\/>.<,])/.test(password);
  const spaceValidation = /(?=.*\s)/.test(password);
  if (
    !upperCaseValidation ||
    !lowerCaseValidation ||
    !digitValidation ||
    !specialCharactersValidation ||
    spaceValidation
  ) {
    return { status: "error", remarks: passwordErrorRemarks };
  }
  return { status: "success", remarks: "Passwords are matching" };
}
