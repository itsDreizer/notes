import React, { useState } from "react";

const CreateCategory = ({ setIsModalVisible, ...props }) => {
  return (
    <div
      onClick={(e) => {
        setIsModalVisible(true);
      }}
      className="controlls-block__item controlls-block__create">
      Создать
    </div>
  );
};

export default CreateCategory;
