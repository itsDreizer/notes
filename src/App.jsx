import "./scss/nullstyle.scss";
import "./scss/vars.scss";

import "./App.scss";

import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import AuthProvider from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
