import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  //подписали на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  //создаем переменнуую для className
  const cardDeleteButtonClassName = `element__delete-btn ${
    isOwn ? "" : "element__delete-btn_disabled"
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element-container__like-btn ${
    isLiked ? "element-container__like-btn_active" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
    console.log("на меня кликнули");
  }

  function handleDeleteClick() {
    onCardDelete(card);
    console.log("на меня кликнули");
  }

  return (
    <li className="element">
      <img
        className="element__mask"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      />
      <div className="element-container">
        <h2 className="element-container__name">{card.name}</h2>
        <div className="element-container__like-box">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <span className="element-container__span">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
