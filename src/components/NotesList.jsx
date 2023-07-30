import React from "react";
import Note from "./UI/note/Note";

const NotesList = ({ notes, searchQuery, isLoading, isError }) => {
  if (isLoading) {
    return <ul className="notes-list">Загрузка...</ul>;
  }

  if (isError) {
    return <ul className="notes-list">Ошибка</ul>;
  }

  return (
    <ul className="notes-list">
      {notes.length
        ? notes.map((note) => {
            return <Note key={note.id} id={note.id} title={note.title} body={note.body} />;
          })
        : searchQuery
        ? `По запросу "${searchQuery}" ничего не найдено`
        : "Заметки не найдены"}
    </ul>
  );
};

export default NotesList;
