import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  
  function handleClick() {
    onCardClick(card);
  }
  
  function handleLikeClick() {
    onCardLike(card);
  }
  
  function handleDeleteClick() {
    onCardDelete(card);
  }
  
  return (
    <li className="card">
      <img className="card__image" src={card.link} alt={card.name} onClick={handleClick} />
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__likes-info">
          <button
            className={`card__button-like ${isLiked && 'card__button-like_active'}`}
            type="button"
            aria-label="лайк"
            onClick={handleLikeClick}
          />
          <span className="card__likes-number">{card.likes.length}</span>
        </div>
      </div>
      <button
        className={`card__button-trash ${!isOwn && 'card__button-trash_inactive'}`}
        type="button"
        aria-label="корзина"
        onClick={handleDeleteClick}
      />
    </li>
  );
}

export default Card;
