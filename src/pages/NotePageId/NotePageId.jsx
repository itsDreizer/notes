import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { FireBase } from "../../API/firebase";
import useFetching from "../../hooks/useFetching";
import NotePage from "../../components/UI/NotePage/NotePage";
import NotePageHeader from "../../components/UI/NotePage/NotePageHeader";
import NotePageBody from "../../components/UI/NotePage/NotePageBody";
import { CategoriesContext } from "../../context/CategoriesContext";

import PageLoader from "../../components/pageloader/PageLoader";

const NotePageId = () => {
  const navigate = useNavigate();
  const ref = useRef();
  const params = useParams();
  const { allCategories, setAllCategories, fetchCategories } = useContext(CategoriesContext);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(Date.now());
  const [body, setBody] = useState("");
  const [currentCategory, setCurrentCategory] = useState("Без категории");
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isConfirmDisabled, setIsConfirmDisabled] = useState(true);

  const [fetchNote, isNoteLoading, isNoteError] = useFetching(async () => {
    const note = await FireBase.getNote(params.id);
    setTitle(note.title);
    setBody(note.body);
    setDate(note.date);
    setCurrentCategory(note.category);
  });

  useEffect(() => {
    fetchNote();
    fetchCategories();
  }, []);

  if (isNoteLoading) {
    return <PageLoader />;
  }

  const submit = async (e) => {
    e.preventDefault();
    const newDate = Date.now();
    await FireBase.updateNote(title, body, currentCategory, newDate, params.id);
    navigate("/");
  };

  const validateNote = (title, body) => {
    return title.length > 0 && body.length > 0;
  };

  return (
    <div>
      <Header />
      <NotePage submit={submit}>
        <NotePageHeader
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
          setIsCreateModalVisible={setIsCreateModalVisible}
          allCategories={allCategories}
          date={date}
          title={title}
          setTitle={setTitle}
          body={body}
          isConfirmDisabled={isConfirmDisabled}
          setIsConfirmDisabled={setIsConfirmDisabled}
          validateNote={validateNote}
          conttrolsRef={ref}
        />
        <NotePageBody
          title={title}
          body={body}
          setBody={setBody}
          setTitle={setTitle}
          setIsConfirmDisabled={setIsConfirmDisabled}
          validateNote={validateNote}
        />
        {/* <div ref={ref} className="note-page__controlls">
            controlls
          </div> */}
      </NotePage>
    </div>
  );
};

export default NotePageId;
