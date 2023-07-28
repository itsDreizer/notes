import React, { useContext, useMemo, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import BlueLink from "../UI/BlueLink/BlueLink";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

import validateEmail from "../../utils/validateEmail";
import validatePassword from "../../utils/validatePassword";

import "./AuthForm.scss";

const AuthForm = ({ type, onSubmit, nickname, setNickname, errorContent, setErrorContent }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const { isAuthError, setIsAuthError } = useContext(AuthContext);

  const validateForm = (email, password, nickname) => {
    return type === "register"
      ? validateEmail(email) && validatePassword(password) && nickname
      : validateEmail(email) && validatePassword(password);
  };

  console.log("render");

  useMemo(() => {
    if (!isAuthError) {
      setErrorContent("");
    }
  }, [isAuthError]);

  return (
    <form
      className="auth-form"
      onSubmit={async (e) => {
        onSubmit(e, email, password, nickname);
      }}>
      {type === "register" ? (
        <Input
          type={"text"}
          placeholder="Введите имя или никнейм"
          isAuthError={isAuthError}
          className={`auth-form__input`}
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
            setIsFormValid(validateForm(email, password, e.target.value));
          }}
        />
      ) : (
        false
      )}

      <Input
        type={"text"}
        placeholder="Введите почту"
        isAuthError={isAuthError}
        inputError={emailError}
        className={`auth-form__input`}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setIsFormValid(validateForm(e.target.value, password, nickname));
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
          setIsFormValid(validateForm(email, e.target.value, nickname));
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
