import React, { useState } from "react";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import Input from "../UI/Input/Input";

import "./CategoryModal.scss";

const CategoryModal = (props) => {
  const { setIsModalVisible, allCategories, categoryName, setCategoryName, setAllCategories } = props;
  const [error, setError] = useState("");

  return (
    <Modal isCloseButton={true} className={"category-modal"} setModalVisible={setIsModalVisible}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setCategoryName("");
          if (!categoryName.length) {
            setError("Введите название категории");
            return false;
          }
          if (
            allCategories.filter((category) => {
              return category.toLowerCase() == categoryName.toLowerCase();
            }).length > 0
          ) {
            setError("Категория уже существует");
            return false;
          }
          setAllCategories([...allCategories, categoryName]);
          setIsModalVisible(false);
        }}
        className="category-modal__form">
        <Input
          className={"category-modal__input"}
          placeholder={"Название категории"}
          value={categoryName}
          onChange={(e) => {
            setCategoryName(e.target.value);
          }}></Input>
        <Button className={"category-modal__button"}>Создать</Button>
        {error ? <div className="category-modal__error">{error}</div> : false}
      </form>
    </Modal>
  );
};

export default CategoryModal;
