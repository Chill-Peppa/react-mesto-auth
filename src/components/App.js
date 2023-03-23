import React from "react";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import { auth } from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { RenderLoadingContext } from "../contexts/RenderLoadingContext";
import Login from "../components/Login";
import Register from "../components/Register";
import InfoTooltip from "../components/InfoTooltip";
import ProtectedRoute from "../components/ProtectedRoute";
import PageNotFound from "../components/PageNotFound";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isCardPopupOpen, setIsCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });

  const [currentUser, setCurrentUser] = React.useState({ name: "", about: "" });
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [isSignSuccess, setIsSignSuccess] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    loggedIn &&
      Promise.all([api.getUserInfo(), api.getAllCards()])
        .then(([userArr, initialCards]) => {
          setCurrentUser(userArr);
          setCards(initialCards);
        })
        .catch((err) => {
          console.error(`Ошибка: ${err}`);
        });
  }, [loggedIn]);

  //проверяем токен
  React.useEffect(() => {
    const jwt = localStorage.getItem("token");

    if (jwt) {
      auth
        .checkToken()
        .then((res) => {
          setEmail(res.data.email);
          setLoggedIn(true);
          navigate("/main", { replace: true });
        })
        .catch((err) => {
          console.error(`${err}`);
        });
    }
  }, [navigate]);

  const onRegister = (email, password) => {
    auth
      .register(email, password)
      .then(() => {
        setIsSignSuccess(true);
        setIsTooltipOpen(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        setIsSignSuccess(false);
        setIsTooltipOpen(true);
        console.error(err);
      });
  };

  const onLogin = (email, password) => {
    auth
      .authorization(email, password)
      .then((data) => {
        if (data.token) {
          setEmail("");
          handleLogin();
          navigate("/main", { replace: true });
        }
      })
      .catch((err) => {
        setIsSignSuccess(false);
        setIsTooltipOpen(true);
      });
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleCardClick = (card) => {
    setIsCardPopupOpen(true);
    setSelectedCard(card);
  };

  const handleDeleteClick = (card) => {
    setIsConfirmPopupOpen(true);
    setSelectedCard(card);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsCardPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setIsTooltipOpen(false);
  };

  const handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((like) => like._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  };

  const handleCardDelete = (card) => {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => (c._id === card._id ? "" : c)));
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateUser = (data) => {
    setIsLoading(true);
    api
      .updateUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateAvatar = (data) => {
    setIsLoading(true);
    api
      .sendUserAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAddPlaceSubmit = (newCard) => {
    setIsLoading(true);
    api
      .postCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <RenderLoadingContext.Provider value={isLoading}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="App">
          <div className="page">
            <Routes>
              <Route
                path="/"
                element={
                  loggedIn ? (
                    <Navigate to="/main" replace />
                  ) : (
                    <Navigate to="/sign-in" replace />
                  )
                }
              />
              <Route path="/sign-in" element={<Login onLogin={onLogin} />} />
              <Route
                path="/sign-up"
                element={<Register onRegister={onRegister} />}
              />
              <Route
                path="/main"
                element={
                  <ProtectedRoute
                    element={Main}
                    email={email}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleDeleteClick}
                    cards={cards}
                    loggedIn={loggedIn}
                  />
                }
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />
            <ImagePopup
              isOpen={isCardPopupOpen}
              onClose={closeAllPopups}
              card={selectedCard}
            />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <ConfirmDeletePopup
              isOpen={isConfirmPopupOpen}
              onClose={closeAllPopups}
              card={selectedCard}
              onDeleteCard={handleCardDelete}
            />
            <InfoTooltip
              isOpen={isTooltipOpen}
              onClose={closeAllPopups}
              isSuccess={isSignSuccess}
              successText="Вы успешно зарегистрировались!"
              errorText="Что-то пошло не так! Попробуйте ещё раз."
              altSuccess="Sign up done"
              altError="Error! Please try again"
            />
          </div>
        </div>
      </CurrentUserContext.Provider>
    </RenderLoadingContext.Provider>
  );
}

export default App;
