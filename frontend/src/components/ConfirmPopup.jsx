import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({ isOpen, onClose, onDeliteCard, isLoading }) {

  const [isValid] = useState(true);

  function handleSubmit(evt) {
    evt.preventDefault();
    onDeliteCard();
  }

  const valueTextButton = !isLoading ? "Да" : "Удаление...";

  return (
    <PopupWithForm
    name="confirm"
    title="Вы уверены?"
    textButton={valueTextButton}
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    isValid={isValid} />
  )
}

export default ConfirmPopup;

