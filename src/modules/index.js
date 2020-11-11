import '../pages/index.css';

import AddCardPopup from './AddCardPopup';
import AddUserInfoPopup from './AddUserInfoPopup';
import Api from './Api';
import Card from './Card';
import CardList from './CardList';
import FormValidation from './FormValidation';
import ImagePopup from './ImagePopup';
import OtherUsersData from './OtherUsersData';
import UserAvatarPopup from './UserAvatarPopup';
import UserInfo from './UserInfo';
import UsersListPopup from './UsersListPopup';
import PopupReg from './PopupReg';
import PopupEntry from './PopupEntry';
import Logout from './logout';
import SignView from './SignView';
import PopupAuthor from './PopupAuthor';


(function() {
  const api = new Api;
  const signView = new SignView;

  // отправляем на сервер запрос о том, зарегистрированный ли пользователь зашел
  api.postme((data) => {
    const spinner =  document.querySelectorAll('.spinner');
    spinner.forEach(spinner => signView.loading(true, spinner));
    if (data.message === 'ok') {
      api.getInitialCards(initialCards => {
        api.getMyData(myData => {
          spinner.forEach(spinner => signView.loading(false, spinner));
          cardList.render(initialCards, myData._id);
          signView.signed(myData);
        })
      });
    } else {
      api.getInitialCards(initialCards => {
        spinner.forEach(spinner => signView.loading(false, spinner));
        cardList.render(initialCards, 'id');
        signView.unsigned();
      })
    }
  })

  // самая главная функция
  function addCard(name, link, _id, likes, owner_avatar, owner_name, owner_id, my_id) {
    const card = new Card(name, link, _id, likes, owner_avatar, owner_name, owner_id, my_id, api);
    card.createCardElement();
    card.createHandlers();
    card.whooseCard();
    return card;
  }

  const otherUsersData = new OtherUsersData(document.querySelector('.popup-user-list__all-list'));
  const cardList = new CardList(document.querySelector('.places-list'), addCard);
  const userInfo = new UserInfo(api);
  const formValidation = new FormValidation();

  new AddCardPopup(document.querySelector('.popup-add-card'), cardList, formValidation, api, signView);
  new AddUserInfoPopup(document.querySelector('.popup-add-user-info'), userInfo, formValidation);
  new ImagePopup(document.querySelector('.place-popup'));
  new UserAvatarPopup(document.querySelector('.popup-user-avatar'), formValidation, api);
  new UsersListPopup(document.querySelector('.popup-user-list'), api, otherUsersData, signView);
  new PopupReg(document.querySelector('.popup-reg'), api, formValidation, signView);
  new PopupEntry(document.querySelector('.popup-entry'), api, formValidation, signView, cardList);
  new Logout(api, signView, cardList);
  new PopupAuthor(document.querySelector('.popup-author'));

})();