import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  //Обработчики изменения инпутов обновляют стейт
  function handleChangeNameCard(e) {
    setName(e.target.value);
  }
  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: name,
      link: link,
    });
  }

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add-photo"
      title="Новое место"
      btnText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      loadingText="Сохранение..."
    >
      <input
        id="title-input"
        type="text"
        value={name}
        onChange={handleChangeNameCard}
        placeholder="Название"
        className="form__item form__item_info_title"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="title-input-error form__item-error"></span>
      <input
        id="link-input"
        type="url"
        value={link}
        onChange={handleChangeLink}
        placeholder="Ссылка на картинку"
        className="form__item form__item_info_link"
        required
      />
      <span className="link-input-error form__item-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
