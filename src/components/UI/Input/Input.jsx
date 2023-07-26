import React from "react";

import "./Input.scss";

const Input = ({ isError, ...props }) => {
  const classes = ["input", props.className];

  if (isError) {
    classes.push("input--error");
  }

  return <input {...props} className={classes.join(" ")} autoComplete="off" name="" />;
};

export default Input;
