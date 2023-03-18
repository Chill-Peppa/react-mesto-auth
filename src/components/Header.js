import React from "react";
import logo from "../images/logo.svg";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" alt="Логотип сайта место" src={logo} />
      <div className="header__right-side">
        <p className="header__post">почта юзера</p>
        <span className="header__span">Войти</span>
      </div>
    </header>
  );
}

export default Header;
