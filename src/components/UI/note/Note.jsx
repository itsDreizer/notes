import React from "react";

import "./Note.scss";
import { Link } from "react-router-dom";

const Note = ({ title, body, id }) => {
  return (
    <Link to={`/notes/${id}`} className="note">
      <div className="note__title">{title}</div>
      <div className="note__body">{body}</div>
    </Link>
  );
};

export default Note;
