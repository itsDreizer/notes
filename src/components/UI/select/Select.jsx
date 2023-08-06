import React, { useState } from "react";

import "./Select.scss";

const Select = ({ children, value, isSelectOpened, setIsSelectOpened }) => {
  return (
    <div className="select">
      <div
        onClick={(e) => {
          if (isSelectOpened) {
            setIsSelectOpened(false);
          } else {
            setIsSelectOpened(true);
          }
        }}
        className={`select__selected ${isSelectOpened ? "active" : ""}`}>
        {value}
      </div>
      <div className={`select__body ${isSelectOpened ? "active" : ""}`}>{children}</div>
    </div>
  );
};

export default Select;
