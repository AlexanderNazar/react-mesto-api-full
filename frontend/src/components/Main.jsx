import load from '../images/avatar-loading.svg'
import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards }) {

  const currentUser = useContext(CurrentUserContext);
  const sourceAvatar = currentUser.avatar ? currentUser.avatar : load;

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container" onClick={onEditAvatar}>
          <img src={sourceAvatar} alt="Фото пользовантеля" className="profile__avatar" />
        </div>
        <div className="profile__info">
          <div className="profile__title">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button type="button" className="profile__edit-button" aria-label="Редактировать" onClick={onEditProfile} />
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-button" aria-label="Добавить" onClick={onAddPlace} />
      </section>
      <section className="elements">
        {cards.map(card => (<Card
          key={card._id}
          card={card}
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          onCardDelete={onCardDelete}
        />))}
      </section>
    </main>
  )
}

export default Main;
