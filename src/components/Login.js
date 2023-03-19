import React from "react";
import Header from "./Header";

function Login() {
  return (
    <>
      <Header email="" text="Регистрация" />
      <section className="sign">
        <div className="sign__up-zone">
          <h2 className="sign__header">Вход</h2>
          <form className="sign__form">
            <input
              className="sign__form-input"
              placeholder="Email"
              type="email"
              minLength="2"
              maxLength="70"
              autoComplete="username"
              required
            />
            <input
              className="sign__form-input"
              placeholder="Пароль"
              type="password"
              minLength="2"
              maxLength="40"
              autoComplete="current-password"
              required
            />
          </form>
        </div>
        <button className="sign__button">Войти</button>
      </section>
    </>
  );
}

export default Login;
