class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }
  
  _checkResponseStatus(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }
  
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include'
    }).then(res => this._checkResponseStatus(res));
  }
  
  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
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
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    }).then(res => this._checkResponseStatus(res));
  }
  
  getCardList() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      credentials: 'include'
    }).then(res => this._checkResponseStatus(res));
  }
  
  addCard({ title, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: {
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
      credentials: 'include'
    }).then(res => this._checkResponseStatus(res));
  }
  
  changeLikeCardStatus(cardId, needLike) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: needLike ? 'PUT': 'DELETE',
      credentials: 'include'
    }).then(res => this._checkResponseStatus(res));
  }
}

export default new Api('https://backend.mesto.nomoredomains.monster');
