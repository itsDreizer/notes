import React, { useContext, useEffect, useMemo, useState } from "react";
import Button from "./UI/Button/Button";
import Input from "./UI/Input/Input";
import { AuthContext } from "../context/AuthContext";
import BlueLink from "./UI/BlueLink/BlueLink";

import validateEmail from "../utils/validateEmail";
import validatePassword from "../utils/validatePassword";

const AuthForm = ({ type, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const { setIsAuth, isAuthError, setIsAuthError } = useContext(AuthContext);
  const [errorContent, setErrorContent] = useState("");
  const validateForm = (email, password) => {
    return validateEmail(email) && validatePassword(password);
  };

  useMemo(() => {
    if (!isAuthError) {
      setErrorContent("");
    }
  }, [isAuthError]);

  return (
    <form
      className="auth-form"
      onSubmit={async (e) => {
        const response = await onSubmit(e, email, password);
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
      }}>
      <Input
        type={"text"}
        placeholder="Введите почту"
        isError={isAuthError}
        className={`auth-form__input`}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setIsFormValid(validateForm(e.target.value, password));
          setIsAuthError(false);
        }}
      />
      <Input
        type={"password"}
        placeholder="Введите пароль"
        className={"auth-form__input"}
        isError={isAuthError}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setIsFormValid(validateForm(email, e.target.value));
          setIsAuthError(false);
        }}
      />
      <div className="auth__error">{errorContent ? errorContent : false}</div>
      <div className="auth-form__footer">
        <BlueLink to={type === "register" ? "/login" : "/register"}>
          {type === "register" ? `Есть аккаунт?` : "Нет аккаунта?"}
        </BlueLink>
        <Button disabled={!isFormValid} className={"auth-form__button"}>
          {type === "register" ? `Зарегистрироваться` : `Войти`}
        </Button>
      </div>
    </form>
  );
};

export default AuthForm;
