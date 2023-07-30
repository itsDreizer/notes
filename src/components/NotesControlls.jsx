import React, { useState } from "react";
import SearchInput from "./UI/searchInput/SearchInput";
import { Link } from "react-router-dom";
import CategoryControlls from "./categotyControlls/CategoryControlls";

const NotesControlls = (props) => {
  const { currentCategory, setCurrentCategory, searchQuery, setSearchQuery, allCategories, length } = props;

  const [isCategoryControllsVisible, setIsCategoryControllsVisible] = useState(true);

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
      {isCategoryControllsVisible ? <CategoryControlls categories={allCategories} /> : false}
    </div>
  );
};

export default NotesControlls;
