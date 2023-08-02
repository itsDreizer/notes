import React from "react";

import "./Modal.scss";

const Modal = ({ children, setModalVisible, modalVisible, className, isCloseButton }) => {
  return (
    <div
      onClick={(e) => {
        setModalVisible(false);
      }}
      className={`modal ${className ? className : ""}`}>
      <div className="modal__container">
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="modal__content">
          {isCloseButton ? (
            <div
              onClick={() => {
                setModalVisible(false);
              }}
              className="modal__close"></div>
          ) : (
            false
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
