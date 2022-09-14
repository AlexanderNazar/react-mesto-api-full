import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `element__delete ${isOwn ? '' : 'element__delete_type_inactive'}`;

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__heart ${isLiked ? 'element__heart_active' : ''}`;

  return (
    <div className="element">
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button" />
      <img className="element__image" src={card.link} alt={card.name} onClick={handleClick} />
      <div className="element__caption">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__heart-container">
          <button className={cardLikeButtonClassName} onClick ={handleLikeClick} type="button" />
          <p className="element__heart-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Card;
