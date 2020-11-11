 //  Класс для работы с попапом добавления аватара

 import Popup from './Popup'

 export default class UserAvatarPopup extends Popup {
   constructor(element, formValidation, api) {
     super(element);
     this.api = api;
     this.formValidation = formValidation;
     this.handlers();

     this.form = this.element.querySelector('.popup-form');
     this.link = this.element.querySelector('.popup__input');
     this.popupButton = this.element.querySelector('.popup__button');
     this.error = this.element.querySelector('.popup__input-first-error-message');

   }

   open() {
     super.open();
     this.formValidation.setSubmitButtonState(this.popupButton, false);
     this.link.value = '';
     this.error.value = '';
   }


   // поменять аватар
   addAvatar(evt) {
     evt.preventDefault();

     const img = document.createElement('img');
     img.src = this.link.value;

     img.onerror = () => alert('Похоже, вы загружаете не изображение');
     img.onload = () => {
       this.api.updateAvatar(this.link.value);
       document.querySelector('.user-info__photo').style.backgroundImage = `url(${this.link.value})`;
       this.close();
     }
   }


   // обработчик добавления аватара
   formInputHandlerAddAvatar() {
     this.valid = this.formValidation.checkInputValidity(this.link.value, this.error, 'link');
     if (this.valid) {
       this.formValidation.setSubmitButtonState(this.popupButton, true);
     } else {
       this.formValidation.setSubmitButtonState(this.popupButton, false);
     }
   }


   // обработчики
   handlers() {
     document.querySelector('.user-info__photo').addEventListener('click', this.open.bind(this));
     window.addEventListener('keydown', this.closeByKey.bind(this));
     this.element.addEventListener('click', this.closeByClick.bind(this));
     this.element.querySelector('.popup__form').addEventListener('submit', this.addAvatar.bind(this));
     this.element.querySelector('.popup__form').addEventListener('input', this.formInputHandlerAddAvatar.bind(this));
   }

 }