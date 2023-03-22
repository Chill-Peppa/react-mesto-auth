import React from "react";
import signup from "../images/signup.png";
import error from "../images/error.png";

function InfoTooltip(props) {
  return (
    <div
      className={`popup popup_type_open-tooltip ${
        props.isOpen ? "popup_opened" : " "
      }`}
    >
      <div className="popup__container popup__container-tooltip">
        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}
        ></button>
        <img
          className="popup__tooltip"
          alt={props.isSucces ? "Sign up done" : "Error! Please try again."}
          src={props.isSucces ? signup : error}
        />
        <p className="popup__tooltip-text">
          {props.isSucces
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;
