import React from "react";

import "./ControllsBlock.scss";

const ControllsBlock = ({ className, children, title, ...props }) => {
  return (
    <div {...props} className={`controlls-block ${className ? className : ""}`}>
      {title ? <div className="controlls-block__title">{title}</div> : false}
      <div className={`controlls-block__items ${className ? `${className}__items` : ""}`}>{children}</div>
    </div>
  );
};

export default ControllsBlock;
