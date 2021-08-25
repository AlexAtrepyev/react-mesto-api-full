import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm.js';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  
  React.useEffect(() => {
    setName(currentUser?.name || '');
    setDescription(currentUser?.about || '');
  }, [currentUser, props.isOpen]);
  
  function handleChange(e) {
    e.target.name === "name" ? setName(e.target.value) : setDescription(e.target.value);
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }
  
  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="form__input"
        type="text"
        name="name"
        placeholder="Имя"
        value={name}
        onChange={handleChange}
        minLength="2"
        maxLength="40"
        required
      />
      <span className="form__error" id="name-error">Текст</span>
      <input
        className="form__input"
        type="text"
        name="about"
        placeholder="О себе"
        value={description}
        onChange={handleChange}
        minLength="2"
        maxLength="200"
        required
      />
      <span className="form__error" id="about-error">Текст</span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
