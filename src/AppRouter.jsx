import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PageLoader from "./components/pageloader/PageLoader";
import { AuthContext } from "./context/AuthContext";
import { privateRoutes, publicRoutes } from "./router/routes";
import CategoriesProvider from "./context/CategoriesContext";

const AppRouter = () => {
  const { isAuth, isAuthLoading } = useContext(AuthContext);

  if (isAuthLoading) return <PageLoader />;

  return isAuth ? (
    <CategoriesProvider>
      <Routes>
        {privateRoutes.map((route) => {
          return <Route key={route.path} path={route.path} element={route.element} />;
        })}
        <Route path="/notes/*" element={<Navigate to={"/notes/main"} replace />}></Route>
      </Routes>
    </CategoriesProvider>
  ) : (
    <Routes>
      {publicRoutes.map((route) => {
        return <Route key={route.path} path={route.path} element={route.element} />;
      })}
      <Route path="/notes/*" element={<Navigate to={"/notes/auth"} replace />}></Route>
    </Routes>
  );
};

export default AppRouter;
