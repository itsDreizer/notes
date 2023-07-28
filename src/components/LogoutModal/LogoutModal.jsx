import React from "react";
import Modal from "../UI/Modal/Modal";
import Button from "../UI/Button/Button";

import "./LogoutModal.scss";
import { FireBase } from "../../API/firebase";

const LogoutModal = ({ setModalVisible, modalVIsible, setIsAuth }) => {
  return (
    <Modal setModalVisible={setModalVisible} modalVisible={modalVIsible} className={"modal-logout"}>
      <span className="modal-logout__text">Вы действительно хотите выйти из аккаунта?</span>
      <div className="modal-logout__buttons">
        <Button
          onClick={() => {
            FireBase.logout();
            setIsAuth(false);
          }}
          className={`modal-logout__button hover-disabled`}>
          Да
        </Button>
        <Button
          onClick={() => {
            setModalVisible(false);
          }}
          className={"button--invert modal-logout__button hover-disabled"}>
          Нет
        </Button>
      </div>
    </Modal>
  );
};

export default LogoutModal;
