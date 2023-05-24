import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function ConfirmPopup(props) {
  //Обработчик сабмита. Вызывает обработчик, расположенный в App и переданный через props
  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit();
  }

  return (
    <PopupWithForm
      name="confirmPopupForm"
      title="Вы уверены?"
      submitBtnCaption={props.submitBtnCap}
      submitBtnDisabled={props.submitBtnDisabled}
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
    />
  );
}

export default ConfirmPopup;
