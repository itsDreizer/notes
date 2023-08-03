import React from "react";
import Modal from "../UI/Modal/Modal";
import Button from "../UI/Button/Button";

import "./LogoutModal.scss";
import { FireBase } from "../../API/firebase";

const LogoutModal = ({ setModalVisible, modalVIsible, setIsAuth }) => {
  return (
    <Modal
      isCloseButton={true}
      setModalVisible={setModalVisible}
      modalVisible={modalVIsible}
      className={"modal-logout"}>
      <span className="modal__text">Вы действительно хотите выйти из аккаунта?</span>
      <div className="modal__buttons">
        <Button
          onClick={() => {
            FireBase.logout();
            setIsAuth(false);
          }}
          className={`modal__button hover-disabled`}>
          Да
        </Button>
        <Button
          onClick={() => {
            setModalVisible(false);
          }}
          className={"button--invert modal__button hover-disabled"}>
          Нет
        </Button>
      </div>
    </Modal>
  );
};

export default LogoutModal;
