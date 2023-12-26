import React from "react";
import { Formik, Form, Field } from "formik";
import AuthRequest from "../../core/User/authRequest";
import style from "./../../styles/css/Login.module.css";
import LoginService from "../../pages/Login/LoginService";

function Login() {
  const initialValues: AuthRequest = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: AuthRequest) => {
    try {
      const AuthResponse = await LoginService.login(
        values.email,
        values.password
      );

      console.log("Login successful:", AuthResponse);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className={style.main}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {() => (
          <Form>
            <h2>Bem vindo!</h2>
            <p>Entre com sua conta para acessar nossa plataforma</p>

            <span className={style.inputBox}>
              <Field name="email" id="email" type="text" required />
              <label htmlFor="email">e-mail</label>
              <span />
            </span>

            <span className={style.inputBox}>
              <Field name="password" id="password" type="password" required />
              <label htmlFor="password">Senha</label>
              <span />
            </span>

            <div className={style.links}>
              <a href="##" className="recuperar">
                Recuperar senha
              </a>
              <a href="##" className={style.registro}>
                Registrar-se
              </a>
            </div>

            <button type="submit">Entrar</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
