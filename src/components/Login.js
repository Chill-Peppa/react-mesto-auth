import React from "react";

function Login() {
  return (
    <main className="content">
      <section className="login">
        <div className="login__up-zone">
          <h2 className="login__header">Вход</h2>
          <form className="login__form">
            <input
              className="login__form-input"
              placeholder="Email"
              type="email"
              minLength="2"
              maxLength="70"
              required
            />
            <input
              className="login__form-input"
              placeholder="Пароль"
              type="password"
              minLength="2"
              maxLength="40"
              required
            />
          </form>
        </div>
        <button className="login__button">Войти</button>
      </section>
    </main>
  );
}

export default Login;
