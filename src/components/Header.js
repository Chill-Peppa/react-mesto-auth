import React from "react";
import logo from "../images/logo.svg";

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" alt="Логотип сайта место" src={logo} />
      <div className="header__right-side">
        <p className="header__post">{props.email}</p>
        <span className="header__span" onClick={props.onClick}>
          {props.text}
        </span>
      </div>
    </header>
  );
}

export default Header;
