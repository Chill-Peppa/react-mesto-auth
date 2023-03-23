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
          alt={props.isSuccess ? props.altSuccess : props.altError}
          src={props.isSuccess ? signup : error}
        />
        <p className="popup__tooltip-text">
          {props.isSuccess ? props.successText : props.ErrorText}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;
