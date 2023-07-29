import { useContext, useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuthForm = () => {
  const { isAuthError, setIsAuth, setIsAuthError } = useContext(AuthContext);

  const [authFormState, setAuthFormState] = useState({
    email: "",
    emailError: false,
    password: "",
    passwordError: false,
    isFormValid: false,
    errorContent: false,
    nickname: "",
  });

  useMemo(() => {
    if (!isAuthError) {
      setAuthFormState({ ...authFormState, errorContent: "" });
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

export default useAuthForm;
