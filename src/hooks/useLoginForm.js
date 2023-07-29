import { useEffect } from "react";
import useAuthForm from "./useAuthForm";

import { FireBase } from "../API/firebase";
import validateEmail from "../utils/validateEmail";
import validatePassword from "../utils/validatePassword";

const useLoginForm = () => {
  const { authFormState, setAuthFormState, setIsAuth, setIsAuthError, isAuthError } = useAuthForm();

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

          break;
      }
    } else {
      setIsAuth(true);
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

export default useLoginForm;
