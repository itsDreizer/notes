import React, { createContext, useState } from "react";
import { useContext } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isAuthError, setIsAuthError] = useState(false);

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
