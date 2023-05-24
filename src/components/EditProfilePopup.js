import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
  //Создаём переменную контекста
  const currentUser = React.useContext(CurrentUserContext);

  //Переменные состояний
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  //Сброс значений полей попапа изменения данных профиля к дефолтным значениям при закрытии попапа
  React.useEffect(() => {
    if (props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [props.isOpen]);

  //ОБработчик изменения состояния переменной имени
  function handleNameChange(e) {
    setName(e.target.value);
  }

  //ОБработчик изменения состояния переменной профессии
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  //ОБработчик сабмита, вызывающий функцию сохранения данных профиля на сервере, проброшенную из App
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profilePopupForm"
      title="Редактировать профиль"
      submitBtnCaption={props.submitBtnCap}
      submitBtnDisabled={props.submitBtnDisabled}
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      children={
        <>
          <fieldset className="popup__items">
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
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
              value={description}
              onChange={handleDescriptionChange}
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
  );
}

export default EditProfilePopup;
