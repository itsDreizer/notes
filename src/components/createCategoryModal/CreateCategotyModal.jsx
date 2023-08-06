import React, { useState } from "react";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import Input from "../UI/Input/Input";

import "./CreateCategotyModal.scss";
import { FireBase } from "../../API/firebase";

const CreateCategoryModal = (props) => {
  const { setIsModalVisible, allCategories, setAllCategories, fetchCategories } = props;
  const [error, setError] = useState("");
  const [categoryName, setCategoryName] = useState("");

  return (
    <Modal isCloseButton={true} className={"category-modal"} setModalVisible={setIsModalVisible}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!categoryName.length) {
            setError("Введите название категории");
            return false;
          }
          if (
            allCategories.filter((category) => {
              return category.toLowerCase() === categoryName.toLowerCase();
            }).length > 0
          ) {
            setError("Категория уже существует");
            return false;
          }
          setCategoryName("");
          setIsModalVisible(false);
          await FireBase.updateCategories([...allCategories, categoryName]);
          fetchCategories();
        }}
        className="category-modal__form">
        <Input
          className={"category-modal__input"}
          placeholder={"Название категории"}
          value={categoryName}
          onChange={(e) => {
            setError("");
            setCategoryName(e.target.value);
          }}></Input>
        <Button className={"category-modal__button"}>Создать</Button>
        {error ? <div className="category-modal__error">{error}</div> : false}
      </form>
    </Modal>
  );
};

export default CreateCategoryModal;
