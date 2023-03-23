import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

function Main(props) {
  //подписываемся на контекст
  const currentUser = React.useContext(CurrentUserContext);
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem("token");
    navigate("/sign-in", { replace: true });
  };

  return (
    <>
      <Header email={props.email} text="Выйти" onClick={signOut} />
      <main className="content">
        <section className="profile">
          <div className="profile__area">
            <button
              type="button"
              className="profile__avatar-button"
              onClick={props.onEditAvatar}
            >
              <img
                className="profile__avatar"
                src={currentUser.avatar}
                alt="Аватар профиля"
              />
            </button>
            <div className="profile-info">
              <h1 className="profile-info__name">{currentUser.name}</h1>
              <button
                type="button"
                className="profile-info__edit-button"
                onClick={props.onEditProfile}
              ></button>
              <p className="profile-info__description">{currentUser.about}</p>
            </div>
          </div>
          <button
            type="button"
            className="profile__add-button"
            onClick={props.onAddPlace}
          ></button>
        </section>

        <section className="cards">
          <ul className="elements">
            {props.cards.map((item) => {
              return (
                <Card
                  card={item}
                  key={item._id}
                  onCardClick={props.onCardClick}
                  onCardLike={props.onCardLike}
                  onCardDelete={props.onCardDelete}
                />
              );
            })}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Main;
