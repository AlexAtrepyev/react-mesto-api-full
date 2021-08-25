import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  
  return (
    <main>
      <section className="profile">
        <img className="profile__avatar" src={currentUser?.avatar ? currentUser.avatar : '#'} alt="аватар" />
        <button className="profile__button-edit-avatar" type="button" onClick={props.onEditAvatar} />
        <div className="profile__info">
          <div className="profile__text">
            <h1 className="profile__name">{currentUser?.name ? currentUser.name : ''}</h1>
            <p className="profile__about">{currentUser?.about ? currentUser.about : ''}</p>
          </div>
          <button className="profile__button-edit" type="button" onClick={props.onEditProfile} />
        </div>
        <button className="profile__button-add" type="button" onClick={props.onAddPlace} />
      </section>
      
      <section className="elements">
        <ul className="elements__list">
          {props.cards.map(card => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
