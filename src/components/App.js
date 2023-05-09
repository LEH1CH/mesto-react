import React from "react";
import { useState, useEffect } from "react";
import "../pages/index.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm
        name="profilePopupForm"
        title="Редактировать профиль"
        submitBtnCaption="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        children={
          <>
            <fieldset className="popup__items">
              <input
                type="text"
                className="popup__input popup__input_name"
                placeholder="Введите имя"
                name="userName"
                required
                minLength="2"
                maxLength="40"
              />
              <span className="popup__error user-name-error"></span>
            </fieldset>
            <fieldset className="popup__items">
              <input
                type="text"
                className="popup__input popup__input_job"
                placeholder="Введите профессию"
                name="userJob"
                required
                minLength="2"
                maxLength="200"
              />
              <span className="popup__error user-job-error"></span>
            </fieldset>
          </>
        }
      />

      <PopupWithForm
        name="profileAvaPopupForm"
        title="Обновить аватар"
        submitBtnCaption="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        children={
          <fieldset className="popup__items">
            <input
              type="url"
              className="popup__input popup__input_avatar-link-image"
              placeholder="Введите ссылку"
              name="link"
              required
            />
            <span className="popup__error avatar-link-error"></span>
          </fieldset>
        }
      />

      <PopupWithForm
        name="confirmPopupForm"
        title="Вы уверены?"
        submitBtnCaption="Да"
        onClose={closeAllPopups}
      />

      <PopupWithForm
        name="addCardForm"
        title="Новое место"
        submitBtnCaption="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        children={
          <>
            <fieldset className="popup__items">
              <input
                type="text"
                className="popup__input popup__input_card-name"
                placeholder="Введите название места"
                name="name"
                required
                minLength="2"
                maxLength="30"
              />
              <span className="popup__error card-name-error"></span>
            </fieldset>
            <fieldset className="popup__items">
              <input
                type="url"
                className="popup__input popup__input_card-link-image"
                placeholder="Введите ссылку"
                name="link"
                required
              />
              <span className="popup__error card-link-error"></span>
            </fieldset>
          </>
        }
      />

      <ImagePopup selectedCard={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
