export default class Api {

  constructor(options) {
    this.options = options;
    this.IP = 'https://api-mesto.zheleznikov.ru/';
    this.IP2 = '84.38.180.135';
    // this.IP = 'http://localhost:3000/';
    this.errInfo = 'Что-то пошло не так';
  }

  // залогиниться
  signin(email, password, callback) {
    fetch(`${this.IP}signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          "email": email,
          "password": password,
        })
      })
      .then(res => res.json())
      .then((data) => {
        localStorage.setItem('token', data.token);
        return data
      })
      .then(data => {
        if (callback) {
          callback(data)
        }
      })
      .catch(err => console.log(err));
  }

  // зарегистрироваться
  signup(name, about, avatar, email, password, callback) {
    fetch(`${this.IP}signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          "name": name,
          "about": about,
          "avatar": avatar,
          "email": email,
          "password": password,
        })
      })
      .then(res => res.json())
      .then((result) => {
        callback(result);
      })
      .catch((err) => console.log(err))

  }

  // разлогиниться
  // logout() {
  //   fetch(`${this.IP}logout`, {
  //       method: 'POST',
  //       headers: {
  //         authorization: `Bearer ${localStorage.getItem('token')}`,
  //         'Content-Type': 'application/json'
  //       },
  //     })
  //     .then(res => res.json())
  //     .catch((err) => console.log(err));
  // }

  // получить карточки с сервера
  getInitialCards(callback) {
    fetch(`${this.IP}cards`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        },
      })
      .then(res => res.json())
      .then((result) => {
        if (callback) {
          callback(result.data);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => console.log('Пробовали загрузить карточки и дошли до сюда '));
  }


  // получить мои данные 
  getMyData(callback) {
     return fetch(`${this.IP}me`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
      })
      .then(res => res.json())
      .then((result) => {
        if (callback) {
          callback(result.data);
        }
        return result.data._id;
      })
      .catch((err) => console.log(err));
  }
  
  // отпавить информацию о себе
  postme(callback) {
    fetch(`${this.IP}me`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then((result) => {
      if (callback) {
        callback(result);
      }
    })
    .catch((err) => console.log(err));
  }


  // получить информацию о пользователе с сервера
  // getUserInfo(callback) {
  //   fetch(`${this.IP}users/${id}`, {
  //       headers: {
  //         //  authorization: `Bearer ${localStorage.getItem('token')}`,
  //         'Content-Type': 'application/json'
  //       },

  //     })
  //     .then(res => res.json())
  //     .then((result) => {
  //       callback(result.data);
  //     })
  //     .catch((err) => console.log(err));
  // }

  // отправить информацию о пользователе на сервер
  editUserInfo(userName, userJob) {

    fetch(`${this.IP}users/me`, {
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: userName,
          about: userJob
        })
      })
      .catch(err => console.log(err));

  }

  // добавить карточку на сервер
  addNewCard(cardName, cardLink, callback) {
    fetch(`${this.IP}cards`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: cardName,
          link: cardLink

        })
      })
      .then(res => res.json())
      .then((result) => {
        if (callback) {
          callback(result);
        }
      })
      .catch(err => console.log(err));
  }

    // отправить аватар на сервер
    updateAvatar(link) {

      fetch(`${this.IP}users/me/avatar`, {
          method: 'PATCH',
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            avatar: link
          })
        })
        .catch(err => console.log(this.errInfo));
    }


  // удалить карточку
  deleteCard(id) {
    fetch(`${this.IP}cards/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .catch(err => console.log(this.errInfo));

  }

  // поставить лайк
  addLikeToServer(id) {
    fetch(`${this.IP}cards/${id}/likes`, {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .catch(err => console.log(this.errInfo));
  }

  //удалить лайк
  deleteLikeFromServer(id) {
    fetch(`${this.IP}cards/${id}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .catch(err => console.log(this.errInfo));
  }






  // при загрузке информации на сервер крутится спиннер
  loading(isLoading, element, text, spinner) {
    if (isLoading) {
      element.textContent = 'Загрузка...'
      spinner.classList.add('spinner_visible');

    } else if (isLoading === false) {
      element.textContent = text;
      spinner.classList.remove('spinner_visible', false);
    }
  }


}