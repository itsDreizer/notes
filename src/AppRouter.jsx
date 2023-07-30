import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PageLoader from "./components/pageloader/PageLoader";
import { AuthContext } from "./context/AuthContext";
import { privateRoutes, publicRoutes } from "./router/routes";

const AppRouter = () => {
  const { isAuth, isAuthLoading } = useContext(AuthContext);

  if (isAuthLoading) return <PageLoader />;

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
      <Route path="/*" element={<Navigate to={"/auth"} replace />}></Route>
    </Routes>
  );
};

export default AppRouter;
