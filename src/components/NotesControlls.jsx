import React, { useState } from "react";
import SearchInput from "./UI/searchInput/SearchInput";
import { Link } from "react-router-dom";
import ControllsBlock from "./UI/controllsBlock/ControllsBlock";
import ControllsBlockItem from "./UI/controllsBlock/ControllsBlockItem";
import CreateCategory from "./UI/controllsBlock/CreateCategory";

const NotesControlls = (props) => {
  const { currentCategory, setCurrentCategory, searchQuery, setSearchQuery, allCategories, setAllCategories, length } =
    props;

  const [isCategoryControllsVisible, setIsCategoryControllsVisible] = useState(false);

  const setCategory = (e) => {
    setCurrentCategory(e.target.textContent);
    setIsCategoryControllsVisible(false);
  };

  return (
    <div className="notes-controlls">
      <div className="notes-controlls__header">
        <div
          onClick={(e) => {
            if (isCategoryControllsVisible) {
              setIsCategoryControllsVisible(false);
            } else {
              setIsCategoryControllsVisible(true);
            }
          }}
          className={`notes__category ${isCategoryControllsVisible ? "active" : ""}`}>
          {currentCategory}
        </div>
        <Link to={"/notes/create"} className="notes-controlls__new-note">
          +
        </Link>
      </div>
      <div className="notes__length">Всего заметок: {length}</div>
      <SearchInput
        className={"notes__search-input"}
        placeholder={"Поиск заметок"}
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
      {isCategoryControllsVisible ? (
        <div className="notes-controlls__menu">
          <ControllsBlock>
            <ControllsBlockItem currentCategory={currentCategory} onClick={setCategory}>
              Все заметки
            </ControllsBlockItem>
            <ControllsBlockItem currentCategory={currentCategory} onClick={setCategory}>
              Без категории
            </ControllsBlockItem>
            <ControllsBlockItem>Избранное</ControllsBlockItem>
          </ControllsBlock>
          <ControllsBlock title={"Категории"}>
            {allCategories.length
              ? allCategories.map((category) => {
                  return (
                    <ControllsBlockItem key={category} currentCategory={currentCategory} onClick={setCategory}>
                      {category}
                    </ControllsBlockItem>
                  );
                })
              : false}
            <CreateCategory allCategories={allCategories} setAllCategories={setAllCategories} />
          </ControllsBlock>
        </div>
      ) : (
        false
      )}
    </div>
  );
};

export default NotesControlls;
