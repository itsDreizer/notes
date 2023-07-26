import React from "react";

import "./Input.scss";

const Input = ({ isAuthError, inputError, ...props }) => {
  const classes = ["input", props.className];

  if (isAuthError) {
    classes.push("input--error");
  }

  if (inputError) {
    classes.push("input--error");
  }

  return <input {...props} className={classes.join(" ")} autoComplete="off" name="" />;
};

export default Input;
