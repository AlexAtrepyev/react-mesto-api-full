import React from 'react';
import { useHistory, Route, Switch, Redirect } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';
import ProtectedRoute from './ProtectedRoute.js';
import Login from './Login.js';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import * as auth from '../auth.js';

function App() {
  const history = useHistory();
  
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);
  
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  
  const [successStatus, setSuccessStatus] = React.useState(false);
  
  React.useEffect(() => {
    api.getUserInfo()
      .then(res => setSuccessAuth(res.email))
      .catch(err => console.log(err));
  }, []);
  
  React.useEffect(() => {
    if (loggedIn) {
      history.push("/main");
      Promise.all([api.getUserInfo(), api.getCardList()])
        .then(([user, initialCards]) => {
          setCurrentUser(user);
          setCards(initialCards);
        })
        .catch(err => console.log(err));
    }
  }, [loggedIn]);
  
  function setSuccessAuth(email) {
    setEmail(email);
    setLoggedIn(true);
  }
  
  function onRegister(password, email) {
    auth.register(password, email)
      .then(res => {
        setSuccessStatus(true);
        showInfoTooltip();
        history.push('/sign-in');
      })
      .catch(err => {
        setSuccessStatus(false);
        showInfoTooltip();
        console.log(err);
      });
  }
  
  function onLogin(password, email) {
    auth.authorize(password, email)
      .then(() => setSuccessAuth(email))
      .catch(err => {
        setSuccessStatus(false);
        showInfoTooltip();
        console.log(err);
      });
  }
  
  function onSignOut() {
    setEmail(null);
    setLoggedIn(false);
  }
  
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };
  
  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }
  
  function showInfoTooltip() {
    setIsInfoTooltipOpen(true);
  }
  
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  }
  
  function handleUpdateAvatar({ avatar }) {
    api.setUserAvatar({ avatar })
      .then(user => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }
  
  function handleUpdateUser(userData) {
    api.setUserInfo(userData)
      .then(user => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }
  
  function handleAddPlaceSubmit({ title, link }) {
    api.addCard({ title, link })
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }
  
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => setCards(state => state.map(c => c._id === card._id ? newCard : c)))
      .catch(err => console.log(err));
  }
  
  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then(res => {
        setCards(cards.filter(function(item) {
          return item._id !== card._id;
        }));
      })
      .catch(err => console.log(err));
  }
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      {loggedIn && <Header loggedIn={loggedIn} email={email} buttonText={'Выйти'} onSignOut={onSignOut} />}
      
      <Switch>
        <Route path="/sign-up">
          <Header email={email} redirectTo={'/sign-in'} buttonText={'Войти'} />
          <Register onRegister={onRegister} />
        </Route>
        
        <Route path="/sign-in">
          <Header email={email} redirectTo={'/sign-up'} buttonText={'Регистрация'} />
          <Login onLogin={onLogin} />
        </Route>
        
        <ProtectedRoute
          path="/main"
          loggedIn={loggedIn}
          component={Main}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          cards={cards}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        
        <Route path="/">
          {loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-in" />}
        </Route>
      </Switch>
      
      <Footer />
      
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        successStatus={successStatus}
      />
      
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
      
      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
