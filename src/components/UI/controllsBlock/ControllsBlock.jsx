import React from "react";

import "./ControllsBlock.scss";

const ControllsBlock = ({ children, title, ...props }) => {
  return (
    <div className="controlls-block">
      {title ? <div className="controlls-block__title">{title}</div> : false}
      <div className="controlls-block__items">{children}</div>
    </div>
  );
};

export default ControllsBlock;
