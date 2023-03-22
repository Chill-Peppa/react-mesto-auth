import React from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";

function Register(props) {
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
    props.onRegister(email, password);
  };

  const handleOnEnter = () => {
    navigate("/sign-in", { replace: true });
  };

  return (
    <>
      <Header email="" text="Войти" onClick={handleOnEnter} />
      <section className="sign">
        <div className="sign__up-zone">
          <h2 className="sign__header">Регистрация</h2>
          <form className="sign__form" onSubmit={handleSubmit}>
            <input
              className="sign__form-input"
              name="email"
              value={email}
              id="email"
              onChange={handleChangeEmail}
              placeholder="Email"
              autoComplete="username"
              type="email"
              minLength="2"
              maxLength="70"
              required
            />
            <input
              className="sign__form-input"
              name="password"
              id="password"
              value={password}
              onChange={handleChangePassword}
              placeholder="Пароль"
              autoComplete="current-password"
              type="password"
              minLength="2"
              maxLength="40"
              required
            />
            <button className="sign__button" type="submit">
              Зарегистрироваться
            </button>
            <p className="sign__register">
              Уже зарегистрированы?{" "}
              <Link to="/sign-in" className="sign__enter">
                Войти
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

export default Register;
