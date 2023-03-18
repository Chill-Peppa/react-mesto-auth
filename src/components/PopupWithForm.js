import React from "react";
import { RenderLoadingContext } from "../contexts/RenderLoadingContext";

function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  children,
  btnText,
  onSubmit,
  loadingText,
}) {
  const isLoading = React.useContext(RenderLoadingContext);

  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : " "}`}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <h2 className="popup__heading">{`${title}`}</h2>
        <form
          className="form"
          name={`form-${name}_dlt-confirm`}
          onSubmit={onSubmit}
        >
          {children}
          <button
            type="submit"
            className="form__button-submit form__button-submit_confirm"
          >
            {isLoading ? `${loadingText}` : `${btnText}`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
