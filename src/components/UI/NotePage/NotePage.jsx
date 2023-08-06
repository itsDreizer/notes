import React from "react";

import "./NotePage.scss";

const NotePage = ({ submit, children }) => {
  return (
    <form onSubmit={submit} className="note-page">
      <div className="note-page__container">{children}</div>
    </form>
  );
};

export default NotePage;
