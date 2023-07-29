import React, { useContext } from "react";
import BlueLink from "../components/UI/BlueLink/BlueLink";
import Button from "../components/UI/Button/Button";
import Input from "../components/UI/Input/Input";
import useRegisterForm from "../hooks/useRegisterForm";
import validateEmail from "../utils/validateEmail";
import validatePassword from "../utils/validatePassword";
import { AuthContext } from "../context/AuthContext";

const Register = ({ setType }) => {
  const { isAuthError, setIsAuthError } = useContext(AuthContext);
  const { authFormState, setAuthFormState, validateForm, register } = useRegisterForm();
  return (
    <form
      className="auth-form"
      onSubmit={(e) => {
        register(e, authFormState.email, authFormState.password, authFormState.nickname);
      }}>
      <h1 className="auth__title">Зарегистрироваться</h1>
      <Input
        type={"text"}
        placeholder="Введите никнейм"
        isAuthError={isAuthError}
        className={`auth-form__input`}
        value={authFormState.nickname}
        onChange={(e) => {
          setAuthFormState({
            ...authFormState,
            nickname: e.target.value,
            isFormValid: validateForm(authFormState.email, authFormState.password, e.target.value),
          });
          setIsAuthError(false);
        }}
      />
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
            isFormValid: validateForm(e.target.value, authFormState.password, authFormState.nickname),

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
            isFormValid: validateForm(authFormState.email, e.target.value, authFormState.nickname),
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
            setType("login");
          }}>
          Есть аккаунт?
        </BlueLink>
        <Button disabled={!authFormState.isFormValid} className={"auth-form__button"}>
          Зарегистрироваться
        </Button>
      </div>
    </form>
  );
};

export default Register;
