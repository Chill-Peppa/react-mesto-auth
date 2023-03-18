import React from "react";

function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_open-photo ${
        props.isOpen ? "popup_opened" : " "
      }`}
    >
      <div className="popup__main">
        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}
        ></button>
        <figure className="popup__main-content">
          <img
            className="popup__open-photo"
            src={`${props.card.link}`}
            alt={props.card.name}
          />
          <figcaption className="popup__open-caption">
            {props.card.name}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
