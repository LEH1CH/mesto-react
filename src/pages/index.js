import "./index.css";

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";
import { config, connectionConfig } from "../utils/constants.js";

//Элементы на главной странице
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const avatarButton = document.querySelector(".profile__avatar-button");

//Id шаблона вёрстки новой карточки
const newCardTemplate = "#article-id";

//Создаём экземпляр валидатора формы редактирования данных профиля
const profilePopupFormValidator = new FormValidator(config, profilePopupForm);
profilePopupFormValidator.enableValidation();

//Создаём экземпляр валидатора формы добавления карточек
const addCardPopupFormValidator = new FormValidator(config, addCardForm);
addCardPopupFormValidator.enableValidation();

//Создаём экземпляр валидатора формы загрузки аватара
const avatarEditPopupFormValidator = new FormValidator(
  config,
  profileAvaPopupForm
);
avatarEditPopupFormValidator.enableValidation();

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  profSelector: ".profile__profession",
  avaSelector: ".profile__avatar-button",
});

//Создаём экземпляр api
const api = new Api(connectionConfig);

//Обработчик постановки лайка и обновления количества лайков
const handlePutLike = (cardId, cardEl) => {
  api
    .putLike(cardId)
    .then((res) => {
      cardEl.setLikes(res.likes.length, true);
      return true;
    })
    .catch((err) => {
      alert(`Запрос на установку лайка не выполнен! Ошибка: ${err}`);
      console.error(`Запрос на установку лайка не выполнен! Ошибка: ${err}`);
    });
};

//Обработчик удаления лайка и обновления количества лайков
const handleDeleteLike = (cardId, cardEl) => {
  api
    .deleteLike(cardId)
    .then((res) => {
      cardEl.setLikes(res.likes.length, false);
      return false;
    })
    .catch((err) => {
      alert(`Запрос на удаление лайка не выполнен! Ошибка: ${err}`);
      console.error(`Запрос на удаление лайка не выполнен! Ошибка: ${err}`);
    });
};

//Создаём экземпляр класса Section
const section = new Section((cardData, id = cardData.owner._id) => {
  const isMine = id === cardData.owner._id;
  const likes = cardData.likes.length;
  const isLikedByMe = cardData.likes.some((el) => el._id === id);
  const newCard = new Card(
    cardData,
    newCardTemplate,
    handleCardClick,
    cardData._id,
    isMine,
    likes,
    isLikedByMe,
    handlePutLike,
    handleDeleteLike,
    (cardId, cardEl) => confirmPopup.open(cardId, cardEl)
  );
  const cardElement = newCard.createCard();
  return cardElement;
}, ".cards");

//Получаем данные пользователя и выводим массив карточек
api
  .getProfileData()
  .then((data) => {
    userInfo.setUserInfo({ name: data.name, prof: data.about });
    userInfo.setUserAvatar({ link: data.avatar });
    return data._id;
  })
  .then((myId) => {
    api
      .getInitialCards()
      .then((initialCards) => {
        section.renderInitialCards(initialCards, myId);
      })
      .catch((err) => {
        alert(`Не удалось загрузить данные карточек! Ошибка: ${err}`);
        console.error(`Не удалось загрузить данные карточек! Ошибка: ${err}`);
      });
  })
  .catch((err) => {
    alert(`Не удалось загрузить данные профиля пользователя! Ошибка: ${err}`);
    console.error(
      `Не удалось загрузить данные профиля пользователя! Ошибка: ${err}`
    );
  });

/*-----------------------------ПОПАП С ИЗОБРАЖЕНИЕМ-----------------------------*/

//Создаём экземпляр попапа с изображением
const imagePopup = new PopupWithImage({
  popupSelector: ".popup_for_full-image",
  imageSelector: ".popup__full-image",
  subtitleSelector: ".popup__caption",
});

imagePopup.setEventListeners();

const handleCardClick = (cardData) => {
  imagePopup.open(cardData);
};

/*-----------------------------ПОПАП ДАННЫХ ПРОФИЛЯ-----------------------------*/

//Создаём экземпляр попапа с формой редактирования данных профиля
const profilePopup = new PopupWithForm(
  {
    popupSelector: ".popup_for_edit-profile",
    formSelector: ".popup__container",
    inputSelector: ".popup__input",
    sbmtBtnSelector: ".popup__button",
  },

  (values) => {
    return api
      .modifyProfileData(values)
      .then((data) => {
        userInfo.setUserInfo({
          userName: data.name,
          userJob: data.about,
        });
        profilePopup.close();
      })
      .catch((err) => {
        alert(`Запрос на изменение данных профиля не выполнен! Ошибка: ${err}`);
        console.error(
          `Запрос на изменение данных профиля не выполнен! Ошибка: ${err}`
        );
      });
  }
);

profilePopup.setEventListeners();

//Вызов popup с формой редактирования данных профиля нажатием на кнопку с ручкой
editButton.addEventListener("click", () => {
  const values = userInfo.getUserInfo();
  profilePopup.setInputValues(values);
  profilePopup.open();
  profilePopupFormValidator.resetValidation();
});

/*-----------------------------ПОПАП КАРТОЧКИ МЕСТА-----------------------------*/

//Создаём экземпляр попапа с формой добавления карточки места
const cardPopup = new PopupWithForm(
  {
    popupSelector: ".popup_for_add-card",
    formSelector: ".popup__container",
    inputSelector: ".popup__input",
    sbmtBtnSelector: ".popup__button",
  },

  (cardData) => {
    api
      .addNewCard(cardData)
      .then((res) => {
        section.addItem(res, res.owner._id);
        cardPopup.close();
      })
      .catch((err) => {
        alert(`Запрос на добавление карточки не выполнен! Ошибка: ${err}`);
        console.error(
          `Запрос на добавление карточки не выполнен! Ошибка: ${err}`
        );
      });
  }
);

cardPopup.setEventListeners();

//Вызов popup-окна добавления карточки нажатием на кнопку с крестиком
addButton.addEventListener("click", function () {
  cardPopup.open();
  addCardPopupFormValidator.resetValidation();
});

/*-----------------------------ПОПАП ЗАГРУЗКИ АВАТАРА-----------------------------*/

//Создаём экземпляр попапа с формой редактирования аватара профиля
const avatarPopup = new PopupWithForm(
  {
    popupSelector: ".popup_for_add-photo",
    formSelector: ".popup__container",
    inputSelector: ".popup__input",
    sbmtBtnSelector: ".popup__button",
  },
  (lnk) => {
    api
      .setUserAvatar(lnk)
      .then((data) => {
        userInfo.setUserAvatar({ link: data.avatar });
        avatarPopup.close();
      })
      .catch((err) => {
        alert(`Запрос на изменение аватара не выполнен! Ошибка: ${err}`);
        console.error(
          `Запрос на изменение аватара не выполнен! Ошибка: ${err}`
        );
      });
  }
);
avatarPopup.setEventListeners();

avatarButton.addEventListener("click", () => {
  avatarPopup.open();
  avatarEditPopupFormValidator.resetValidation();
});

/*-----------------------------ПОПАП ПОДТВЕРЖДЕНИЯ УДАЛЕНИЯ КАРТОЧКИ-----------------------------*/

//Создаём экземпляр попапа с формой подтверждения
const confirmPopup = new PopupWithConfirmation(
  {
    popupSelector: ".confirm-popup",
    formSelector: ".popup__container",
    inputSelector: ".popup__input",
  },
  (cardId, cardEl) => {
    api
      .deleteCard(cardId)
      .then(() => {
        cardEl.remove();
        confirmPopup.close();
      })
      .catch((err) => {
        alert(`Запрос на удаление карточки не выполнен! Ошибка: ${err}`);
        console.error(
          `Запрос на удаление карточки не выполнен! Ошибка: ${err}`
        );
      });
  }
);
confirmPopup.setEventListeners();
