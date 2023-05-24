import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup(props) {
  //Создаём реф
  const inputRef = React.useRef(null);

  //Обнуляем инпут при закрытии попапа
  React.useEffect(() => {
    if (props.isOpen) inputRef.current.value = "";
  }, [props.isOpen]);

  //ОБработчик сабмита с сохранением ссылки на новый аватар с помощью функции, проброшенной через props
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      link: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="profileAvaPopupForm"
      title="Обновить аватар"
      submitBtnCaption={props.submitBtnCap}
      submitBtnDisabled={props.submitBtnDisabled}
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      children={
        <fieldset className="popup__items">
          <input
            ref={inputRef}
            type="url"
            className="popup__input popup__input_avatar-link-image"
            placeholder="Ссылка на картинку"
            name="link"
            required
          />
          <span className="popup__error avatar-link-error"></span>
        </fieldset>
      }
    />
  );
}

export default EditAvatarPopup;
