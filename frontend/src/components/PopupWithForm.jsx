function PopupWithForm({ name, title, textButton, isOpen, onClose, onSubmit, isValid, children }) {

  const popupClassName = `popup popup_type_${name} ${isOpen && "popup_opened"}`;
  const popupContainerClassName = `popup__container popup__container_type_${name}`;
  const popupFormClassName = `popup__form popup__form_type_${name}`;
  const popupButtonSubmitClassName = !isValid ? "popup__save-button popup__save-button_invalid" : "popup__save-button";

  return (
    <div className={popupClassName}>
      <div className={popupContainerClassName}>
        <button className="popup__close-button" type="button" onClick={onClose} />
        <form className={popupFormClassName} name={`${name}`} onSubmit={onSubmit}>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button
            type="submit"
            className={popupButtonSubmitClassName}
            name="submit"
            disabled={!isValid}>{textButton}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
