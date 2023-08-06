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

const CreateNote = () => {
  const ref = useRef(48);
  const { allCategories, setAllCategories, fetchCategories } = useContext(CategoriesContext);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(Date.now);
  const [body, setBody] = useState("");
  const [currentCategory, setCurrentCategory] = useState("Без категории");
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isCategoryControllsVisible, setIsCategoryControllsVisible] = useState(false);
  const [isConfirmDisabled, setIsConfirmDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Создать заметку";
    fetchCategories();
    return () => {
      document.title = "Notes";
    };
  }, []);

  let formattedDate = new Date(date);

  formattedDate = `${formattedDate.getDate() > 10 ? formattedDate.getDate() : "0" + formattedDate.getDate()}.${
    formattedDate.getMonth() + 1 > 10 ? formattedDate.getMonth() + 1 > 10 : "0" + (formattedDate.getMonth() + 1)
  }.${formattedDate.getFullYear()} ${
    formattedDate.getHours() > 10 ? formattedDate.getHours() : "0" + formattedDate.getHours()
  }:${formattedDate.getMinutes() > 10 ? formattedDate.getMinutes() : "0" + formattedDate.getMinutes()}`;

  const validateNote = (title, body) => {
    return title.length > 0 && body.length > 0;
  };

  const setCategory = (e) => {
    setCurrentCategory(e.target.firstChild.textContent);
    setIsCategoryControllsVisible(false);
  };

  const submit = (e) => {
    e.preventDefault();
    const newDate = Date.now;
    FireBase.addNote(title, body, currentCategory, newDate);
    navigate("/");
  };

  return (
    <div className="wrapper">
      <Header />
      <main className="main">
        {isCreateModalVisible ? (
          <CreateCategoryModal
            fetchCategories={fetchCategories}
            allCategories={allCategories}
            setAllCategories={setAllCategories}
            isModalVisible={isCreateModalVisible}
            setIsModalVisible={setIsCreateModalVisible}
          />
        ) : (
          false
        )}
        <form onSubmit={submit} className="note-page">
          <div className="note-page__container">
            <div className="note-page-header">
              <div className="note-page-header__floor-1">
                <input
                  value={title}
                  onChange={(e) => {
                    setIsConfirmDisabled();
                    setTitle(e.target.value);
                    setIsConfirmDisabled(!validateNote(e.target.value, body));
                  }}
                  placeholder="Введите название заметки"
                  className="note-page__title"
                />
                <button disabled={isConfirmDisabled} className="note-page__confirm">
                  <img className="note-page__confirm-img" src={confirm} alt="confirm" />
                </button>
              </div>
              <div className="note-page-header__floor-2">
                <time className="note-page__date">{formattedDate}</time>
                <div className="category-select note-page__category">
                  <Select
                    isSelectOpened={isCategoryControllsVisible}
                    setIsSelectOpened={setIsCategoryControllsVisible}
                    value={currentCategory}>
                    <ControllsBlock
                      style={{ marginBottom: ref.current.scrollHeight ? ref.current.scrollHeight : "0" }}
                      className={"note-page-categories"}>
                      <ControllsBlockItem
                        className={"note-page-categories__item"}
                        currentCategory={currentCategory}
                        onClick={setCategory}>
                        Без категории
                      </ControllsBlockItem>
                      {allCategories.length
                        ? allCategories.map((category, index) => {
                            return (
                              <ControllsBlockItem
                                className={"note-page-categories__item"}
                                index={index}
                                key={category}
                                currentCategory={currentCategory}
                                onClick={setCategory}>
                                {category}
                              </ControllsBlockItem>
                            );
                          })
                        : false}
                      <CreateCategory setIsModalVisible={setIsCreateModalVisible} />
                    </ControllsBlock>
                  </Select>
                </div>
              </div>
            </div>
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
            <div ref={ref} className="note-page__controlls">
              controlls
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateNote;
