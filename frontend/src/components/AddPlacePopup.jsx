import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, validDefault, setValidDefault, isLoading }) {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [isValidName, setIsValidName] = useState(true);
  const [isValidLink, setIsValidLink] = useState(true);
  const [validTextName, setValidTextName] = useState('');
  const [validTextLink, setValidTextLink] = useState('');

  function handleChangeName(evt) {
    setName(evt.target.value);
    setIsValidName(evt.target.validity.valid);
    setValidTextName(evt.target.validationMessage);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
    setIsValidLink(evt.target.validity.valid);
    setValidTextLink(evt.target.validationMessage);
    setValidDefault();
  }

  function validityForm() {
    return  validDefault && isValidName && isValidLink;
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({ name, link });
  }

  useEffect(() => {
    setName('');
    setLink('');
    setIsValidName(true);
    setIsValidLink(true);
    setValidTextName('');
    setValidTextLink('');
  }, [isOpen]);

  const valueTextButton = !isLoading ? "Создать" : "Сохранение...";
  const inputNameClassName = isValidName ? "popup__input-text" : "popup__input-text popup__input-text_type_error";
  const inputLinkClassName = isValidLink ? "popup__input-text" : "popup__input-text popup__input-text_type_error";

  return (
    <PopupWithForm
    name="add-image"
    title="Новое место"
    textButton={valueTextButton}
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    isValid={validityForm()}
    children={
      <>
        <input
          className={inputNameClassName}
          type="text"
          id="place"
          name="name"
          required
          placeholder="Название"
          minLength="2"
          maxLength="30"
          value={name || ""}
          onChange={handleChangeName} />
        <span id="place-error" className="popup__error">{validTextName}</span>
        <input
          className={inputLinkClassName}
          type="url"
          id="link"
          name="link"
          required
          placeholder="Ссылка на картинку"
          value={link || ""}
          onChange={handleChangeLink} />
        <span id="link-error" className="popup__error">{validTextLink}</span>
      </>
    } />
  )
}

export default AddPlacePopup;
