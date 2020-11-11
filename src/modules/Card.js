import ImagePopup from './ImagePopup';

export default class Card {
  constructor(newName, newLink, _id, likes, owner_avatar, owner_name, owner_id, my_id, api) {
    this.api = api;
    this.owner_name = owner_name;
    this.owner_avatar = owner_avatar;
    this.likes = likes;
    this.owner_id = owner_id;
    this._id = _id;
    this.newName = newName;
    this.newLink = newLink;
    this.popupElement = document.querySelector('.place-popup');
    this.my_id = my_id;
  }

  // метод для присвоения карточки
  createCardElement() {
    this.cardElement = this.create(this.newName, this.newLink, this.owner_name);
    this.cardElement.querySelector('.place-card__like-counter').textContent = this.likes.length;
  }

  // создание карточки
  create(name, link, owner_name) {
    const card = document.querySelector('.card-template').content.cloneNode(true);
    card.querySelector('.place-card__name').textContent = name;
    card.querySelector('.place-card__image').style.backgroundImage = `url(${link})`;

    if (this.owner_id === this.my_id) {
      card.querySelector('.place-card__author').textContent = `добавил(a) я`;
    } else {
      card.querySelector('.place-card__author').textContent = `добавил(a) ${owner_name}`;
    }
    return card.querySelector('.place-card');
  }


  // лайк +1
  addLike() {
    this.cardElement.querySelector('.place-card__like-counter').textContent = +this.cardElement.querySelector('.place-card__like-counter').textContent + 1;
  }

  // лайк -1
  deleteLike() {
    this.cardElement.querySelector('.place-card__like-counter').textContent = +this.cardElement.querySelector('.place-card__like-counter').textContent - 1;
  }

  // лайк
  like() {
    this.cardElement.querySelector('.place-card__like-icon').classList.toggle('place-card__like-icon_liked');
    // если в нашем сердечке есть класс .place-card__like-icon_liked, то 
    if (this.cardElement.querySelector('.place-card__like-icon').classList.contains('place-card__like-icon_liked')) {
      this.addLike(); // увеличиваем количество лайков на 1
      this.api.addLikeToServer(this._id); // отправляем лайк на сервер
    } else { // в обратном случае делаем все наоборот
      this.deleteLike(); // убираем лайк
      this.api.deleteLikeFromServer(this._id);
    }
  }

  //проверка на то, моя ли карточка загружена на сервер
  whooseCard() {
    if (this.owner_id === this.my_id) {
      this.cardElement.querySelector('.place-card__delete-icon').style.display = 'block';
    }
  }

  // удалить карточку
  delete() {
    if (this.owner_id !== this.my_id) {
      this.cardElement.parentElement.removeChild(this.cardElement);
    } else if (this.owner_id === this.my_id) {
      if (confirm('Вы действительно хотите удалить свою карточку навсегда?')) {
        this.cardElement.parentElement.removeChild(this.cardElement);
        this.api.deleteCard(this._id);
      }
    }
  }

  //обработчик работы с попапом карточки
  imageClickHandler(event) {
    if (event.target === this.cardElement.querySelector('.place-card__image')) {
      const imagePopup = new ImagePopup(this.popupElement, this.newLink);
      if (this.owner_id === this.myId) {
        imagePopup.open(this.newLink, 'это я', this.owner_avatar);
      } else {
        imagePopup.open(this.newLink, this.owner_name, this.owner_avatar);
      }
    }
  }

  // обработчики
  createHandlers() {
    this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.like.bind(this));
    this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', this.delete.bind(this));
    this.cardElement.querySelector('.place-card__image').addEventListener('click', this.imageClickHandler.bind(this));
  }

}