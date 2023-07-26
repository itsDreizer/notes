import React from "react";

import "./Button.scss";

const Button = ({ children, ...props }) => {
  const classes = ["button", props.className].join(" ");

  return (
    <button {...props} className={classes}>
      {children}
    </button>
  );
};

export default Button;
