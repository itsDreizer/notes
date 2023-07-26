import React, { createContext, useEffect, useMemo, useState } from "react";
import { useContext } from "react";
import { FireBase } from "../API/firebase";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isAuthError, setIsAuthError] = useState(false);

  useEffect(() => {
    console.log("Отработал useEffect");
    setIsAuthLoading(true);
    FireBase.settedPersistence.then(() => {
      const storageContent = localStorage.getItem(
        "firebase:authUser:AIzaSyBiP49dOfTsq7UKUmSTvM5_IpMuUKVJT-o:[DEFAULT]"
      );

      FireBase.checkStorage(storageContent).then((data) => {
        if (data) {
          setIsAuth(FireBase.checkStorage(storageContent));
        }
      });

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
