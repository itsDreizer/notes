import React from "react";
import { Link } from "react-router-dom";
import "./Logo.scss";

const Logo = ({ className = `BEMBLOCK` }) => {
  return (
    <Link to={"/notes/main"} className={`logo ${className}`}>
      <div className={`logo__text ${className}__text`}>Notes</div>
    </Link>
  );
};

export default Logo;
