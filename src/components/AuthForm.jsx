import React, { useContext, useEffect, useMemo, useState } from "react";
import Button from "./UI/Button/Button";
import Input from "./UI/Input/Input";
import { AuthContext } from "../context/AuthContext";
import BlueLink from "./UI/BlueLink/BlueLink";

import validateEmail from "../utils/validateEmail";
import validatePassword from "../utils/validatePassword";
import { FireBase } from "../API/firebase";

const AuthForm = ({ type, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
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
        isAuthError={isAuthError}
        inputError={emailError}
        className={`auth-form__input`}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setIsFormValid(validateForm(e.target.value, password));
          setIsAuthError(false);
          setEmailError(e.target.value.length > 0 ? !validateEmail(e.target.value) : false);
        }}
      />

      <Input
        type={"password"}
        placeholder="Введите пароль"
        className={"auth-form__input"}
        inputError={passwordError}
        isAuthError={isAuthError}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setIsFormValid(validateForm(email, e.target.value));
          setIsAuthError(false);
          setPasswordError(e.target.value.length > 0 ? !validatePassword(e.target.value) : false);
        }}
      />

      {passwordError ? <div style={{ color: "red" }}>Пароль не менее 8 символов </div> : false}

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
