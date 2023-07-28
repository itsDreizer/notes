import React, { useContext, useEffect, useState } from "react";
import { FireBase } from "../API/firebase";
import AuthForm from "../components/Auth/AuthForm";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { setIsAuth, setIsAuthError } = useContext(AuthContext);
  const [nickname, setNickname] = useState("");
  const [errorContent, setErrorContent] = useState("");

  const register = async (e, email, password, nickname) => {
    e.preventDefault();

    const response = await FireBase.createUser(email, password, nickname);
    
    if (response.error) {
      setIsAuthError(true);
      switch (response.error) {
        case `Firebase: Error (auth/email-already-in-use).`:
          setErrorContent("Пользователь с данной почтой уже зарегистрирован");
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
    document.title = "Регистрация";
    return () => {
      document.title = "Notes";
    };
  }, []);

  return (
    <div className="auth">
      <div className="auth__container">
        <h1 className="auth__title">Зарегиструйтесь</h1>
        <AuthForm
          errorContent={errorContent}
          setErrorContent={setErrorContent}
          nickname={nickname}
          setNickname={setNickname}
          type={"register"}
          onSubmit={register}
        />
      </div>
    </div>
  );
};

export default Register;
