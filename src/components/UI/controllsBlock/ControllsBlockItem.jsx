import React from "react";

const ControllsBlockItem = (props) => {
  const {
    onClick,
    setCategoryToDelete,
    isModalVisible,
    setIsModalVisible,
    isDeleteButton,
    index,
    currentCategory,
    children,
    className,
  } = props;
  return (
    <div
      onClick={onClick}
      className={`controlls-block__item ${currentCategory === children ? "active" : ""} ${className ? className : ""}`}>
      {children}

      {isDeleteButton && currentCategory !== children ? (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setCategoryToDelete(children);
            setIsModalVisible(true);
          }}
          className="controlls-block__item-delete">
          x
        </div>
      ) : (
        false
      )}
    </div>
  );
};

export default ControllsBlockItem;
