import React, { useContext, useState } from "react";
import Button from "../UI/Button/Button";

import { AuthContext } from "../../context/AuthContext";
import LogoutModal from "../LogoutModal/LogoutModal";
import "./Header.scss";
import Logo from "../UI/logo/Logo";

const Header = () => {
  const { setIsAuth } = useContext(AuthContext);

  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  return (
    <header className="header">
      {logoutModalVisible ? (
        <LogoutModal setIsAuth={setIsAuth} setModalVisible={setLogoutModalVisible} modalVisible={logoutModalVisible} />
      ) : (
        false
      )}

      <div className="header__container">
        <Logo className="header-logo" />
        <nav className="nav">
          <ul className="nav-list"></ul>
        </nav>
        <Button
          onClick={() => {
            setLogoutModalVisible(true);
          }}>
          Выйти
        </Button>
      </div>
    </header>
  );
};

export default Header;
