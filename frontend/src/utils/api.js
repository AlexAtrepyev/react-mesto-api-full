class Api {
  constructor({ baseUrl, authorization }) {
    this._baseUrl = baseUrl;
    this._authorization = authorization;
  }
  
  _checkResponseStatus(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }
  
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    }).then(res => this._checkResponseStatus(res));
  }
  
  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(res => this._checkResponseStatus(res));
  }
  
  setUserAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    }).then(res => this._checkResponseStatus(res));
  }
  
  getCardList() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authorization
      }
    }).then(res => this._checkResponseStatus(res));
  }
  
  addCard({ title, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: title,
        link: link
      })
    }).then(res => this._checkResponseStatus(res));
  }
  
  removeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    }).then(res => this._checkResponseStatus(res));
  }
  
  changeLikeCardStatus(cardId, needLike) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: needLike ? 'PUT': 'DELETE',
      headers: {
        authorization: this._authorization
      }
    }).then(res => this._checkResponseStatus(res));
  }
}

export default new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
  authorization: '7214c9c3-83e9-4888-acd9-406a09a18fba'
});
