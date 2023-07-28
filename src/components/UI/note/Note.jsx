import React from "react";

const Note = ({ title, body, tags, date }) => {
  return (
    <div className="note">
      <div className="note__title">{title}</div>
      <div className="note__body"></div>
    </div>
  );
};

export default Note;
