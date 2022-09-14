import { useState, useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, validDefault, setValidDefault, isLoading }) {

  const [isValid, setIsValid] = useState(true);
  const [validText, setValidText] = useState('');


  const avatarRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  function handleChangeInput(evt) {
    setIsValid(evt.target.validity.valid);
    setValidText(evt.target.validationMessage);
    setValidDefault(evt.target.validity.valid);
  }

  function validityForm() {
    return  validDefault && isValid;
  }

  useEffect(() => {
    avatarRef.current.value = '';
    setIsValid(true);
    setValidText('');
  }, [isOpen]);

  const valueTextButton = !isLoading ? "Сохранить" : "Сохранение...";
  const inputClassName = isValid ? "popup__input-text" : "popup__input-text popup__input-text_type_error";

  return (
    <PopupWithForm
    name="update-avatar"
    title="Обновить аватар"
    textButton={valueTextButton}
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    isValid={validityForm()}
    children={
      <>
        <input
          className={inputClassName}
          type="url"
          id="avatar"
          name="avatar"
          required
          placeholder="Ссылка на аватар"
          ref={avatarRef}
          onChange={handleChangeInput} />
        <span id="avatar-error" className="popup__error">{validText}</span>
      </>
    } />
  )
}

export default EditAvatarPopup;
