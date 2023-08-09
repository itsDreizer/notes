import React, { useState } from "react";

import confirm from "./images/confirm.png";
import ControllsBlock from "../controllsBlock/ControllsBlock";
import ControllsBlockItem from "../controllsBlock/ControllsBlockItem";
import Select from "../select/Select";
import CreateCategory from "../controllsBlock/CreateCategory";

const NotePageHeader = (props) => {
  const {
    title,
    setTitle,
    body,
    date,
    currentCategory,
    setCurrentCategory,
    setIsCreateModalVisible,
    validateNote,
    isConfirmDisabled,
    setIsConfirmDisabled,
    conttrolsRef,
    allCategories,
    noteId,
    setIsDeleteModalVisible,
    isFavorite,
    setIsFavorite,
  } = props;

  const [isCategoryControllsVisible, setIsCategoryControllsVisible] = useState(false);

  const setCategory = (e) => {
    setIsConfirmDisabled(!validateNote(title, body));
    setCurrentCategory(e.target.firstChild.textContent);
    setIsCategoryControllsVisible(false);
  };

  let formattedDate = new Date(date);

  formattedDate = `${formattedDate.getDate() > 9 ? formattedDate.getDate() : "0" + formattedDate.getDate()}.${
    formattedDate.getMonth() + 1 > 9 ? formattedDate.getMonth() + 1 > 9 : "0" + (formattedDate.getMonth() + 1)
  }.${formattedDate.getFullYear()} ${
    formattedDate.getHours() > 9 ? formattedDate.getHours() : "0" + formattedDate.getHours()
  }:${formattedDate.getMinutes() > 9 ? formattedDate.getMinutes() : "0" + formattedDate.getMinutes()}`;

  return (
    <div className="note-page-header">
      <div className="note-page-header__floor-1">
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setIsConfirmDisabled(!validateNote(e.target.value, body));
          }}
          placeholder="Введите название заметки"
          className="note-page__title"
        />
        <div className="note-page-header__controlls">
          {noteId ? (
            <button
              onClick={async (e) => {
                e.preventDefault();
                setIsDeleteModalVisible(true);
              }}
              className="note-page__delete">
              <img className="note-page__delete-img" src={"./images/trash-can.png"} alt="trash-can" />
            </button>
          ) : (
            false
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsConfirmDisabled(!validateNote(title, body));
              if (isFavorite) {
                setIsFavorite(false);
              } else {
                setIsFavorite(true);
              }
            }}
            className="note-page__favorites">
            <img
              className={`note-page__favorites-img ${isFavorite ? "active" : ""}`}
              src={"./images/star-24.png"}
              alt="star"
            />
          </button>
          <button disabled={isConfirmDisabled} className="note-page__confirm">
            <img className="note-page__confirm-img" src={confirm} alt="confirm" />
          </button>
        </div>
      </div>
      <div className="note-page-header__floor-2">
        <time className="note-page__date">{formattedDate}</time>
        <div className="category-select note-page__category">
          <Select
            isSelectOpened={isCategoryControllsVisible}
            setIsSelectOpened={setIsCategoryControllsVisible}
            value={currentCategory}>
            <ControllsBlock
              style={{ marginBottom: conttrolsRef.current ? conttrolsRef.current.scrollHeight : "0" }}
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
  );
};

export default NotePageHeader;
