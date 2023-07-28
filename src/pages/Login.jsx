import React, { useContext, useEffect, useState } from "react";
import { FireBase } from "../API/firebase";
import AuthForm from "../components/Auth/AuthForm";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { setIsAuth, setIsAuthError } = useContext(AuthContext);
  const [errorContent, setErrorContent] = useState("");
  const login = async (e, email, password) => {
    e.preventDefault();

    const response = await FireBase.login(email, password);

    if (response.error) {
      setIsAuthError(true);
      switch (response.error) {
        case `Firebase: Error (auth/user-not-found).`:
          setErrorContent("Пользователь не найден");
          break;
        case `Firebase: Error (auth/email-already-in-use).`:
          setErrorContent("Пользователь с данной почтой уже зарегистрирован");
          break;
        case `Firebase: Error (auth/wrong-password).`:
          setErrorContent("Неверный пароль");
          break;

        default:
          setErrorContent("Ошибка");

          break;
      }
    } else {
      setIsAuth(true);
    }
  };

  useEffect(() => {
    document.title = "Войти в аккаунт";
    return () => {
      document.title = "Notes";
    };
  }, []);

  return (
    <div className="auth">
      <div className="auth__container">
        <h1 className="auth__title">Войти в аккаунт</h1>
        <AuthForm errorContent={errorContent} setErrorContent={setErrorContent} type={"login"} onSubmit={login} />
      </div>
    </div>
  );
};

export default Login;
