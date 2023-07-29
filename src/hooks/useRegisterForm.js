import { useEffect } from "react";
import { FireBase } from "../API/firebase";
import useAuthForm from "./useAuthForm";

import validateEmail from "../utils/validateEmail";
import validatePassword from "../utils/validatePassword";

const useRegisterForm = () => {
  const { authFormState, setAuthFormState, setIsAuthError, setIsAuth } = useAuthForm();

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
    }
  };

  const validateForm = (email, password, nickname) => {
    return validateEmail(email) && validatePassword(password) && nickname;
  };

  useEffect(() => {
    document.title = "Регистрация";
    return () => {
      document.title = "Notes";
    };
  }, []);

  return { authFormState, setAuthFormState, validateForm, register };
};

export default useRegisterForm;
