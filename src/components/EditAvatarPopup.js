import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  // записываем объект, возвращаемый хуком, в переменную
  const avatarLinkRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarLinkRef.current.value,
    });
  }

  //после отправки api локально обновляем форму
  React.useEffect(() => {
    avatarLinkRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      btnText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      loadingText="Сохранение..."
    >
      <input
        id="avatar-input"
        type="url"
        name="avatar"
        placeholder="Ссылка на картинку"
        className="form__item form__item_avatar_link"
        ref={avatarLinkRef}
        required
      />
      <span className="avatar-input-error form__item-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
