import React, { createContext, useEffect, useState } from "react";
import { FireBase } from "../API/firebase";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isAuthError, setIsAuthError] = useState(false);

  useEffect(() => {
    FireBase.checkAuth().then((data) => {
      setIsAuth(data);
      setIsAuthLoading(false);
    });
  }, []);

  const values = {
    isAuth,
    setIsAuth,
    isAuthLoading,
    setIsAuthLoading,
    isAuthError,
    setIsAuthError,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
