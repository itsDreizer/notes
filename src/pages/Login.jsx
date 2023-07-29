import React from "react";
import BlueLink from "../components/UI/BlueLink/BlueLink";
import Button from "../components/UI/Button/Button";
import Input from "../components/UI/Input/Input";
import useLoginForm from "../hooks/useLoginForm";
import validateEmail from "../utils/validateEmail";
import validatePassword from "../utils/validatePassword";

const Login = ({ setType }) => {
  const { authFormState, setAuthFormState, validateForm, login, setIsAuthError, isAuthError } = useLoginForm();
  return (
    <form
      className="auth-form"
      onSubmit={(e) => {
        login(e, authFormState.email, authFormState.password);
      }}>
      <h1 className="auth__title">Войти в аккаунт</h1>
      <Input
        type={"text"}
        placeholder="Введите почту"
        isAuthError={isAuthError}
        inputError={authFormState.emailError}
        className={`auth-form__input`}
        value={authFormState.email}
        onChange={(e) => {
          setAuthFormState({
            ...authFormState,
            email: e.target.value,
            isFormValid: validateForm(e.target.value, authFormState.password),
            emailError: e.target.value.length > 0 ? !validateEmail(e.target.value) : false,
          });
          setIsAuthError(false);
        }}
      />
      <Input
        type={"password"}
        placeholder="Введите пароль"
        className={"auth-form__input"}
        inputError={authFormState.passwordError}
        isAuthError={isAuthError}
        value={authFormState.password}
        onChange={(e) => {
          setAuthFormState({
            ...authFormState,
            password: e.target.value,
            isFormValid: validateForm(authFormState.email, e.target.value),
            passwordError: e.target.value.length > 0 ? !validatePassword(e.target.value) : false,
          });
          setIsAuthError(false);
        }}
      />

      {authFormState.passwordError ? <div style={{ color: "red" }}>Пароль не менее 8 символов </div> : false}

      <div className="auth__error">{authFormState.errorContent ? authFormState.errorContent : false}</div>

      <div className="auth-form__footer">
        <BlueLink
          onClick={() => {
            setType("register");
          }}>
          Нет аккаунта?
        </BlueLink>
        <Button disabled={!authFormState.isFormValid} className={"auth-form__button"}>
          Войти
        </Button>
      </div>
    </form>
  );
};

export default Login;
