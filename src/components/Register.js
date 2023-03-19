import React from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/auth";

function Register() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    auth.register(email, password).then(() => {
      navigate("/sign-in", { replace: true });
    });
  };

  return (
    <>
      <Header email="" text="Войти" />
      <section className="sign">
        <div className="sign__up-zone">
          <h2 className="sign__header">Регистрация</h2>
          <form className="sign__form">
            <input
              className="sign__form-input"
              name="email"
              value={email}
              id="email"
              onChange={handleChangeEmail}
              placeholder="Email"
              type="email"
              minLength="2"
              maxLength="70"
              required
            />
            <input
              className="sign__form-input"
              name="password"
              id="password"
              autoComplete="on"
              value={password}
              onChange={handleChangePassword}
              placeholder="Пароль"
              type="password"
              minLength="2"
              maxLength="40"
              required
            />
          </form>
        </div>
        <button className="sign__button" onSubmit={handleSubmit}>
          Зарегистрироваться
        </button>
        <p className="sign__register">
          Уже зарегистрированы?{" "}
          <Link to="/sign-in" className="sign__enter">
            Войти
          </Link>
        </p>
      </section>
    </>
  );
}

export default Register;
