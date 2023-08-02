import React from "react";

const ControllsBlockItem = ({ currentCategory, children, ...props }) => {
  return (
    <div {...props} className={`controlls-block__item ${currentCategory === children ? "active" : ""}`}>
      {children}
    </div>
  );
};

export default ControllsBlockItem;
