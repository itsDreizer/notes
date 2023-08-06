import React from "react";

const NotePageBody = (props) => {
  const { title, body, setBody, setIsConfirmDisabled, validateNote } = props;

  return (
    <textarea
      value={body}
      placeholder="Введите текст"
      onChange={(e) => {
        e.target.style.height = "5px";
        e.target.style.height = e.target.scrollHeight + "px";
        setBody(e.target.value);
        setIsConfirmDisabled(!validateNote(title, e.target.value));
      }}
      className="note-page__body"></textarea>
  );
};

export default NotePageBody;
