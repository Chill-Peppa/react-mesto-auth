import React from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/auth";

function Login(props) {
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

    if (!email || !password) {
      return;
    }

    auth
      .authorization(email, password)
      .then((data) => {
        if (data.token) {
          console.log(data.token);
          setEmail("");
          setPassword("");
          props.handleLogin();
          navigate("/main", { replace: true });
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Header email="" text="Регистрация" />
      <section className="sign">
        <div className="sign__up-zone">
          <h2 className="sign__header">Вход</h2>
          <form className="sign__form" onSubmit={handleSubmit}>
            <input
              className="sign__form-input"
              placeholder="Email"
              type="email"
              name="email"
              minLength="2"
              maxLength="70"
              autoComplete="username"
              value={email}
              onChange={handleChangeEmail}
              required
            />
            <input
              className="sign__form-input"
              placeholder="Пароль"
              name="password"
              type="password"
              minLength="2"
              maxLength="40"
              autoComplete="current-password"
              value={password}
              onChange={handleChangePassword}
              required
            />
            <button type="submit" className="sign__button">
              Войти
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
