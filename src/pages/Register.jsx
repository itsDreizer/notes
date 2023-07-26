import React, { useEffect } from "react";
import { FireBase } from "../API/firebase";
import AuthForm from "../components/AuthForm";
import Button from "../components/UI/Button/Button";
import BlueLink from "../components/UI/BlueLink/BlueLink";

const Register = () => {
  const register = async (e, email, password) => {
    e.preventDefault();
    const response = await FireBase.createUser(email, password);
    return response;
  };



  useEffect(() => {
    document.title = "Регистрация";
    return () => {
      document.title = "Notes";
    };
  }, []);

  return (
    <div className="auth">
      <div className="auth__container">
        <h1 className="auth__title">Зарегиструйтесь</h1>
        <AuthForm type={"register"} onSubmit={register} />
      </div>
    </div>
  );
};

export default Register;
