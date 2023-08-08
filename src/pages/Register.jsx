import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthError from "../components/Auth/AuthError";
import BlueLink from "../components/UI/BlueLink/BlueLink";
import Button from "../components/UI/Button/Button";
import Input from "../components/UI/Input/Input";
import PasswordEye from "../components/passwordEye/PasswordEye";
import { AuthContext } from "../context/AuthContext";
import { useRegisterForm } from "../hooks/useAuthForm";
import validateEmail from "../utils/validateEmail";
import validateNickname from "../utils/validateNickname";
import validatePassword from "../utils/validatePassword";

const Register = ({ setType }) => {
  const navigate = useNavigate();
  const { isAuthError, setIsAuthError } = useContext(AuthContext);
  const { authFormState, setAuthFormState, validateForm, register } = useRegisterForm();
  return (
    <form
      className="auth-form"
      onSubmit={(e) => {
        register(e, authFormState.email, authFormState.password, authFormState.nickname);
        // navigate("/notes/main");
      }}>
      <h1 className="auth__title">Зарегистрироваться</h1>
      <Input
        type={"text"}
        placeholder="Введите никнейм"
        isAuthError={isAuthError}
        inputError={authFormState.nicknameError}
        className={`auth-form__input`}
        value={authFormState.nickname}
        onChange={(e) => {
          setAuthFormState({
            ...authFormState,
            nickname: e.target.value,
            isFormValid: validateForm(authFormState.email, authFormState.password, e.target.value),
            nicknameError: e.target.value.length > 0 ? !validateNickname(e.target.value) : false,
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
      <PasswordEye>
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
      </PasswordEye>
      <AuthError error={authFormState.passwordError}>Пароль должен быть не менее 8 символов</AuthError>
      <AuthError error={authFormState.nicknameError}>Никнейм должен быть не больше 15 символов</AuthError>
      <AuthError isCenter={true} error={authFormState.errorContent}>
        {authFormState.errorContent}
      </AuthError>

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
