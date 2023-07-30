import React, { useRef } from "react";

import "./PasswordEye.scss";

import eye from "./images/eye.png";

const PasswordEye = ({ children }) => {
  return (
    <div className="password-eye">
      <div className="password-eye__eye">
        <img
          onClick={(e) => {
            const input = e.target.closest(".password-eye").querySelector(".input");
            if (e.target.classList.contains("active")) {
              e.target.classList.remove("active");
              input.type = "password";
            } else {
              e.target.classList.add("active");
              input.type = "text";
            }
          }}
          className="password-eye__img"
          src={eye}
          alt="eye"
        />
      </div>
      {children}
    </div>
  );
};

export default PasswordEye;
