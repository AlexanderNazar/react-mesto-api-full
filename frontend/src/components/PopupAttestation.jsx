import icon_fail from '../images/icon-fail.svg';
import icon_success from '../images/icon-success.svg';

function PopupAttestation({ isName, isOpen, onClose, onCloseSuccess }) {

  const popupClassName = `popup popup_type_${isName ? "success" : "fail"} ${isOpen && "popup_opened"}`;
  const popupContainerClassName = `popup__container popup__container_type_${isName ? "success" : "fail"}`;
  const popupTitleClassName = `popup__title_type_${isName ? "success" : "fail"}`;
  const popupTitle = isName ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз.";

  return (
    <div className={popupClassName}>
      <div className={popupContainerClassName}>
        <button className="popup__close-button" type="button" onClick={isName ? onCloseSuccess : onClose} />
        <img src={isName ? icon_success : icon_fail} alt="Изображение неудачной регистрации." className="popup__image" />
        <p className={popupTitleClassName}>{popupTitle}</p>
      </div>
    </div>
  )
}

export default PopupAttestation;
