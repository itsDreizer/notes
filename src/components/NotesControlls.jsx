import React, { useState } from "react";
import SearchInput from "./UI/searchInput/SearchInput";
import { Link } from "react-router-dom";
import ControllsBlock from "./UI/controllsBlock/ControllsBlock";
import ControllsBlockItem from "./UI/controllsBlock/ControllsBlockItem";
import CreateCategory from "./UI/controllsBlock/CreateCategory";
import CreateCategoryModal from "./createCategoryModal/CreateCategotyModal";
import DeleteCategoryModal from "./deleteCategoryModal/DeleteCategoryModal";
const NotesControlls = (props) => {
  const {
    notes,
    setNotes,
    currentCategory,
    setCurrentCategory,
    searchQuery,
    setSearchQuery,
    allCategories,
    setAllCategories,
    length,
    fetchNotes,
    fetchCategories,
  } = props;

  const [isCategoryControllsVisible, setIsCategoryControllsVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState("");

  const setCategory = (e) => {
    setCurrentCategory(e.target.firstChild.textContent);
    setIsCategoryControllsVisible(false);
  };

  return (
    <div className="notes-controlls">
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
      {isDeleteModalVisible ? (
        <DeleteCategoryModal
          fetchCategories={fetchCategories}
          fetchNotes={fetchNotes}
          notes={notes}
          setNotes={setNotes}
          allCategories={allCategories}
          setAllCategories={setAllCategories}
          isModalVisible={isDeleteModalVisible}
          setIsModalVisible={setIsDeleteModalVisible}
          categoryToDelete={categoryToDelete}
        />
      ) : (
        false
      )}
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
            {allCategories && allCategories.length
              ? allCategories.map((category, index) => {
                  return (
                    <ControllsBlockItem
                      setCategoryToDelete={setCategoryToDelete}
                      isModalVisible={isDeleteModalVisible}
                      setIsModalVisible={setIsDeleteModalVisible}
                      isDeleteButton={true}
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
        </div>
      ) : (
        false
      )}
    </div>
  );
};

export default NotesControlls;
