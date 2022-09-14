function PopupImageOpen({ card, onClose }) {

  const imagePreviewClassName = `popup popup_type_preview ${!!card && "popup_opened"}`;
  const cardLink = !!card ? card.link : "";
  const cardName = !!card ? card.name : "";

  return (
    <div className={imagePreviewClassName}>
      <div className="popup__container-image">
        <button className="popup__close-button" type="button" onClick={onClose} />
        <img
          className="popup__open-image"
          src={cardLink}
          alt={cardName} />
        <h2 className="popup__image-title">{cardName}</h2>
      </div>
    </div>
  )
}

export default PopupImageOpen;
