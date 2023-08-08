import React, { useContext, useEffect, useRef, useState } from "react";

import Header from "../../components/Header/Header";
import confirm from "./images/confirm.png";
import ControllsBlock from "../../components/UI/controllsBlock/ControllsBlock";
import ControllsBlockItem from "../../components/UI/controllsBlock/ControllsBlockItem";
import Select from "../../components/UI/select/Select";
import { CategoriesContext } from "../../context/CategoriesContext";
import CreateCategory from "../../components/UI/controllsBlock/CreateCategory";
import CreateCategoryModal from "../../components/createCategoryModal/CreateCategotyModal";

import "./CreateNote.scss";
import { FireBase } from "../../API/firebase";
import { useNavigate } from "react-router-dom";
import NotePage from "../../components/UI/NotePage/NotePage";
import NotePageHeader from "../../components/UI/NotePage/NotePageHeader";
import NotePageBody from "../../components/UI/NotePage/NotePageBody";

const CreateNote = () => {
  const ref = useRef();
  const { allCategories, fetchCategories } = useContext(CategoriesContext);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(Date.now());
  const [body, setBody] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("Без категории");
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isConfirmDisabled, setIsConfirmDisabled] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Создать заметку";
    fetchCategories();
    return () => {
      document.title = "Notes";
    };
  }, []);

  const validateNote = (title, body) => {
    return title.length > 0 && body.length > 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    const newDate = Date.now();
    await FireBase.addNote(title, body, currentCategory, newDate, isFavorite);
    navigate("/notes/main");
  };

  return (
    <div className="wrapper">
      <Header />
      <main className="main">
        {isCreateModalVisible ? (
          <CreateCategoryModal
            fetchCategories={fetchCategories}
            allCategories={allCategories}
            isModalVisible={isCreateModalVisible}
            setIsModalVisible={setIsCreateModalVisible}
          />
        ) : (
          false
        )}
        <NotePage submit={submit}>
          <NotePageHeader
            isFavorite={isFavorite}
            setIsFavorite={setIsFavorite}
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
        </NotePage>
      </main>
    </div>
  );
};

export default CreateNote;
