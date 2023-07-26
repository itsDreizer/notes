import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { privateRoutes, publicRoutes } from "./router/routes";
import { FireBase } from "./API/firebase";


const AppRouter = () => {
  const { isAuth, isAuthLoading } = useContext(AuthContext);

  if (isAuthLoading) return `Загрузка`;

  return isAuth ? (
    <Routes>
      {privateRoutes.map((route) => {
        return <Route key={route.path} path={route.path} element={route.element} />;
      })}
      <Route path="/*" element={<Navigate to={"/"} replace />}></Route>
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => {
        return <Route key={route.path} path={route.path} element={route.element} />;
      })}
      <Route path="/*" element={<Navigate to={"/login"} replace />}></Route>
    </Routes>
  );
};

export default AppRouter;
