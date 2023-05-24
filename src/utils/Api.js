import { connectionConfig } from "./constants.js";

class Api {
  constructor({ server, profileDataPath, cardsDataPath, token, group }) {
    this._server = server;
    this._profileDataPath = profileDataPath;
    this._cardsDataPath = cardsDataPath;
    this._token = token;
    this._group = group;
  }

  //Метод отправки запроса к серверу
  _requestServer(path, message = { headers: { authorization: this._token } }) {
    return fetch(path, message).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.status);
    });
  }

  //Метод формирования запроса данных профиля
  getProfileData() {
    const path = `${this._server}/${this._group}/${this._profileDataPath}`;
    return this._requestServer(path);
  }

  //Метод формирования запроса для изменения данных профиля
  modifyProfileData({ name, about }) {
    const path = `${this._server}/${this._group}/${this._profileDataPath}`;
    const message = {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    };
    return this._requestServer(path, message);
  }

  //Метод формирования запроса для изменения аватара
  setUserAvatar({ link }) {
    const path = `${this._server}/${this._group}/${
      this._profileDataPath + "/avatar"
    }`;
    const message = {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: link,
      }),
    };
    console.log(message);
    return this._requestServer(path, message);
  }

  //Метод формирования запроса базы карточек
  getInitialCards() {
    const path = `${this._server}/${this._group}/${this._cardsDataPath}`;
    return this._requestServer(path);
  }

  //Метод формирования запроса на добавление карточки
  addNewCard({ name, link }) {
    const path = `${this._server}/${this._group}/${this._cardsDataPath}`;
    const message = {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    };
    return this._requestServer(path, message);
  }

  //Метод формирования запроса для установки или снятия лайка
  changeLikeCardStatus(cardId, isLiked) {
    const path = `${this._server}/${this._group}/${this._cardsDataPath}/${
      cardId + "/likes"
    }`;
    const action = isLiked ? "DELETE" : "PUT";
    const message = {
      method: action,
      headers: {
        authorization: this._token,
      },
    };
    return this._requestServer(path, message);
  }

  //Метод формирования запроса для установки лайка
  putLike(cardId) {
    const path = `${this._server}/${this._group}/${this._cardsDataPath}/${
      cardId + "/likes"
    }`;
    const message = {
      method: "PUT",
      headers: {
        authorization: this._token,
      },
    };
    return this._requestServer(path, message);
  }

  //Метод формирования запроса удаления лайка
  deleteLike(cardId) {
    const path = `${this._server}/${this._group}/${this._cardsDataPath}/${
      cardId + "/likes"
    }`;
    const message = {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    };
    return this._requestServer(path, message);
  }

  //Метод формирования запроса для удаления карточки
  deleteCard(cardId) {
    const path = `${this._server}/${this._group}/${this._cardsDataPath}/${cardId}`;
    const message = {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    };
    return this._requestServer(path, message);
  }
}

const api = new Api(connectionConfig);

export default api;
