import React, { useState } from "react";

import "./Auth.scss";
import Login from "../../pages/Login";
import Register from "../../pages/Register";

const Auth = () => {
  const [authType, setAuthType] = useState("login");
  return (
    <div className="auth">
      <div className="auth__container">
        {authType === "login" ? <Login setType={setAuthType} /> : <Register setType={setAuthType} />}
      </div>
    </div>
  );
};

export default Auth;
