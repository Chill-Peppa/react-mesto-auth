import React from "react";
import Header from "./Header";

function Register() {
  return (
    <>
      <Header email="" text="Войти" />
      <section className="sign">
        <div className="sign__up-zone">
          <h2 className="sign__header">Регистрация</h2>
          <form className="sign__form">
            <input
              className="sign__form-input"
              placeholder="Email"
              type="email"
              minLength="2"
              maxLength="70"
              required
            />
            <input
              className="sign__form-input"
              placeholder="Пароль"
              type="password"
              minLength="2"
              maxLength="40"
              required
            />
          </form>
        </div>
        <button className="sign__button">Зарегистрироваться</button>
        <p className="sign__register">
          Уже зарегистрированы? <span className="sign__enter">Войти</span>
        </p>
      </section>
    </>
  );
}

export default Register;
