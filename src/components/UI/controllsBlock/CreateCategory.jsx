import React, { useState } from "react";

import CategoryModal from "../../categoryModal/CategoryModal";

const CreateCategory = ({ allCategories, setAllCategories, ...props }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  return (
    <div>
      {isModalVisible ? (
        <CategoryModal
          categoryName={categoryName}
          setCategoryName={setCategoryName}
          allCategories={allCategories}
          setAllCategories={setAllCategories}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      ) : (
        false
      )}
      <div
        onClick={(e) => {
          setIsModalVisible(true);
        }}
        className="controlls-block__item controlls-block__create">
        Создать
      </div>
    </div>
  );
};

export default CreateCategory;
