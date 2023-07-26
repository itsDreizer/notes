import React from "react";
import { Link } from "react-router-dom";

import "./BlueLink.scss";

const BlueLink = ({ children, to, ...props }) => {
  const classes = ["link-blue", props.className].join(" ");

  return (
    <Link {...props} className={classes} to={to}>
      {children}
    </Link>
  );
};

export default BlueLink;
