import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  //Обработчики изменения инпутов обновляют стейт
  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name={"edit-button"}
      btnText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      loadingText="Сохранение..."
    >
      <input
        id="firstname-input"
        type="text"
        value={name}
        onChange={handleChangeName}
        placeholder="Имя пользователя"
        className="form__item form__item_info_name"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="firstname-input-error form__item-error"></span>
      <input
        id="career-input"
        type="text"
        value={description}
        onChange={handleChangeDescription}
        placeholder="Род деятельности"
        className="form__item form__item_info_job"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="career-input-error form__item-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
