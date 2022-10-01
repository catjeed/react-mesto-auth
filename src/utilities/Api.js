class Api {
    constructor(item) {
        this._baseUrl = item.baseUrl
        this._headers = item.headers
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: this._headers,
        }).then(this._checkResponse);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: "GET",
            headers: this._headers,
        }).then(this._checkResponse);
    }

    editUserInfo(user) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: user.name,
                about: user.about,
            }),
        }).then(this._checkResponse);
    }

    addNewCard(card) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: card.name,
                link: card.link,
            }),
        }).then(this._checkResponse);
    }


    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._checkResponse);
    }


    editUserAvatar(data) {
        return fetch(`${this._baseUrl}users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar,
            }),
        }).then(this._checkResponse);
    }

    changeLikeCardStatus(cardId, likeStatus) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: likeStatus ? 'PUT' : 'DELETE',
            headers: this._headers
        })
            .then(this._checkResponse);
    }
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-46/',
    headers: {
        authorization: 'af9fb7d2-eb64-485a-90d3-38d9d75e8e83',
        'Content-Type': 'application/json',
    }
});

export default api;