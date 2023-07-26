import React, { useEffect } from "react";
import AuthForm from "../components/AuthForm";
import Button from "../components/UI/Button/Button";
import BlueLink from "../components/UI/BlueLink/BlueLink";
import { FireBase } from "../API/firebase";

const Login = () => {
  const login = async (e, email, password) => {
    e.preventDefault();
    const response = await FireBase.login(email, password);
    return response;
  };

  useEffect(() => {
    document.title = "Войти в аккаунт";
    FireBase.log();
    return () => {
      document.title = "Notes";
    };
  }, []);

  return (
    <div className="auth">
      <div className="auth__container">
        <h1 className="auth__title">Войти в аккаунт</h1>
        <AuthForm type={"login"} onSubmit={login} />
      </div>
    </div>
  );
};

export default Login;
