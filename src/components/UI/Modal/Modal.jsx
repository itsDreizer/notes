import React from "react";

import "./Modal.scss";

const Modal = ({ children, setModalVisible, modalVisible, className }) => {
  return (
    <div
      onClick={(e) => {
        setModalVisible(false);
      }}
      className={`modal ${className}`}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modal__content">
        {children}
      </div>
    </div>
  );
};

export default Modal;
