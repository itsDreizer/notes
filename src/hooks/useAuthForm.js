import { useContext, useEffect, useMemo, useState } from "react";
import { FireBase } from "../API/firebase";
import { AuthContext } from "../context/AuthContext";
import validateEmail from "../utils/validateEmail";
import validateNickname from "../utils/validateNickname";
import validatePassword from "../utils/validatePassword";
import { useNavigate } from "react-router-dom";

const useAuthForm = () => {
  const { isAuthError, setIsAuth, setIsAuthError } = useContext(AuthContext);

  const [authFormState, setAuthFormState] = useState({
    nickname: "",
    nicknameError: false,
    email: "",
    emailError: false,
    password: "",
    passwordError: false,
    isFormValid: false,
    errorContent: false,
  });

  useMemo(() => {
    if (!isAuthError && authFormState.errorContent) {
      setAuthFormState((prev) => {
        return { ...prev, errorContent: "" };
      });
    }
  }, [isAuthError]);

  return {
    authFormState,
    setAuthFormState,
    setIsAuth,
    isAuthError,
    setIsAuthError,
  };
};

export const useLoginForm = () => {
  const { authFormState, setAuthFormState, setIsAuth, setIsAuthError, isAuthError } = useAuthForm();

  const navigate = useNavigate();

  const login = async (e, email, password) => {
    e.preventDefault();
    const response = await FireBase.login(email, password);
    if (response.error) {
      setIsAuthError(true);
      switch (response.error) {
        case `Firebase: Error (auth/user-not-found).`:
          setAuthFormState({ ...authFormState, errorContent: "Пользователь не найден" });
          break;
        case `Firebase: Error (auth/email-already-in-use).`:
          setAuthFormState({ ...authFormState, errorContent: "Пользователь с данной почтой уже зарегистрирован" });
          break;
        case `Firebase: Error (auth/wrong-password).`:
          setAuthFormState({ ...authFormState, errorContent: "Неверный пароль" });
          break;

        default:
          setAuthFormState({ ...authFormState, errorContent: "Ошибка" });
          navigate("/notes/main");
          break;
      }
    } else {
      setIsAuth(true);
      navigate("/notes/main");
    }
  };

  const validateForm = (email, password) => {
    return validateEmail(email) && validatePassword(password);
  };

  useEffect(() => {
    document.title = "Войти в аккаунт";
    return () => {
      document.title = "Notes";
    };
  }, []);

  return { authFormState, setAuthFormState, validateForm, login, isAuthError, setIsAuthError };
};

export const useRegisterForm = () => {
  const { authFormState, setAuthFormState, setIsAuthError, setIsAuth } = useAuthForm();
  const navigate = useNavigate();

  const register = async (e, email, password, nickname) => {
    e.preventDefault();
    const response = await FireBase.createUser(email, password, nickname);
    if (response.error) {
      setIsAuthError(true);
      switch (response.error) {
        case `Firebase: Error (auth/email-already-in-use).`:
          setAuthFormState({ ...authFormState, errorContent: "Пользователь с данной почтой уже зарегистрирован" });
          break;

        default:
          setAuthFormState({ ...authFormState, errorContent: "Ошибка" });
          break;
      }
    } else {
      setIsAuth(true);
      navigate("/notes/main");
    }
  };

  const validateForm = (email, password, nickname) => {
    return validateEmail(email) && validatePassword(password) && validateNickname(nickname);
  };

  useEffect(() => {
    document.title = "Регистрация";
    return () => {
      document.title = "Notes";
    };
  }, []);

  return { authFormState, setAuthFormState, validateForm, register };
};
