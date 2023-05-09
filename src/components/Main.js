import React from "react";
import { useState, useEffect } from "react";
import editButtonPic from "../images/edit-button.svg";
import addButtonPic from "../images/add-button-cross.svg";
import Card from "./Card.js";
import api from "../utils/Api.js";

function Main(props) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  React.useEffect(function () {
    api
      .getProfileData()
      .then((data) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
      })
      .catch((err) => {
        alert(`Не удалось загрузить данные профиля! Ошибка: ${err}`);
      });
  }, []);

  React.useEffect(function () {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        alert(`Не удалось загрузить данные карточек! Ошибка: ${err}`);
      });
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__pers-data">
          <button
            type="button"
            onClick={props.onEditAvatar}
            style={{ backgroundImage: `url(${userAvatar})` }}
            className="profile__avatar-button link"
            aria-label="Изменить аватар"
          ></button>
          <div className="profile__details">
            <div className="profile__name-field">
              <h1 className="profile__name">{userName}</h1>
              <button
                type="button"
                onClick={props.onEditProfile}
                className="profile__edit-button link-transparency link"
                aria-label="Редактировать данные"
              >
                <img
                  src={editButtonPic}
                  className="profile__edit-button-image"
                  alt="Кнопка 'Изменить данные'"
                />
              </button>
            </div>
            <p className="profile__profession">{userDescription}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={props.onAddPlace}
          className="profile__add-button link"
          aria-label="Добавить изображение"
        >
          <img
            src={addButtonPic}
            className="profile__add-button-image"
            alt="Кнопка 'Добавить'"
          />
        </button>
      </section>

      <section className="cards" aria-label="Галерея фотографий">
        {cards.map((el, i) => (
          <Card key={el._id} card={el} onCardClick={props.onCardClick} />
        ))}
      </section>
    </main>
  );
}

export default Main;
