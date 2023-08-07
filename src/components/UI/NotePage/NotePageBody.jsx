import React, { useEffect, useRef } from "react";

const NotePageBody = (props) => {
  const { title, body, setBody, setIsConfirmDisabled, validateNote } = props;

  const ref = useRef();

  useEffect(() => {
    ref.current.style.height = "5px";
    ref.current.style.height = ref.current.scrollHeight + "px";
  }, []);

  return (
    <textarea
      ref={ref}
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
