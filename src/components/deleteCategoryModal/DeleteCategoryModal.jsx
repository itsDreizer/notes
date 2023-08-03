import React, { useState } from "react";
import Modal from "../UI/Modal/Modal";

import "./DeleteCategoryModal.scss";
import Button from "../UI/Button/Button";
import { FireBase } from "../../API/firebase";

const DeleteCategoryModal = (props) => {
  const {
    notes,
    setNotes,
    categoryToDelete,
    setIsModalVisible,
    allCategories,
    setAllCategories,
    fetchNotes,
    fetchCategories,
  } = props;

  return (
    <Modal isCloseButton={true} className={"category-modal"} setModalVisible={setIsModalVisible}>
      <span className="modal__text">
        Вы действительно хотите удалить категорию {`"${categoryToDelete}"`} и все ее содержимое?
      </span>
      <div className="modal__buttons">
        <Button
          onClick={async () => {
            const index = allCategories.findIndex((category) => {
              return category === categoryToDelete;
            });

            allCategories.splice(index, 1);

            const notesToDelete = notes.filter((note) => {
              return note.category === categoryToDelete;
            });

            setIsModalVisible(false);
            
            await FireBase.deleteCategory(allCategories, notesToDelete);
            fetchCategories();
            fetchNotes();
          }}
          className={`modal__button hover-disabled`}>
          Да
        </Button>
        <Button
          onClick={() => {
            setIsModalVisible(false);
          }}
          className={"button--invert modal__button hover-disabled"}>
          Нет
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteCategoryModal;
