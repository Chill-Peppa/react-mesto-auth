import React from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

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

    props.onLogin(email, password);
  };

  const handleOnRegister = () => {
    navigate("/sign-up", { replace: true });
  };

  return (
    <>
      <Header email="" text="Регистрация" onClick={handleOnRegister} />
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
