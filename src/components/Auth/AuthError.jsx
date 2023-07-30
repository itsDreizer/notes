import React from "react";

const AuthError = ({ children, isCenter, error }) => {
  const classes = ["auth__error"];
  if (isCenter) {
    classes.push("auth__error--center");
  }
  return error ? <div className={classes.join(" ")}>{children}</div> : false;
};

export default AuthError;
