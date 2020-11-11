import Popup from './Popup'

export default class AddCardPopup extends Popup {
  constructor(element, cardList, formValidation, api, signView) {
    super(element);

    this.api = api;
    this.cardList = cardList;
    this.formValidation = formValidation;
    this.signView = signView;

    this.popupButton = this.element.querySelector('.popup__button');
    this.newName = this.element.querySelector('.popup__input_type_name');
    this.nameError = this.element.querySelector('.popup__input-first-error-message');
    this.newLink = this.element.querySelector('.popup__input_type_link-url');
    this.linkError = this.element.querySelector('.popup__input-second-error-message');
    this.secretCode = this.element.querySelector('.popup__input_secret-code');

    this.spinner = this.element.querySelector('.spinner');

    this.addCardHandlers();
  }

  // добавление карточки пользователем
  addUserCard(event) {
    event.preventDefault();
    this.popupButton.style.fontSize = '18px';
    this.signView.loadingFull(true, this.popupButton, 'Проверяем изображение...', '+', this.spinner);
    const img = document.createElement('img');
    img.src = this.newLink.value;
   
    img.onerror = () => {
      this.popupButton.style.fontSize = '36px';
      this.signView.loadingFull(false, this.popupButton, 'Проверяем изображение...', '+', this.spinner);
      alert('Похоже, вы загружаете не изображение');
    };
    img.onload = () => {
      this.api.postme(res => {
      //  this.popupButton.style.fontSize = '18px';
        this.signView.loadingFull(true, this.popupButton, 'Загружаем...', '+', this.spinner);
        if (res.message === 'ok') {
          this.api.getMyData(data => {
            this.api.addNewCard(this.newName.value, this.newLink.value, (cardData) => {
              this.signView.loadingFull(false, this.popupButton, 'Загружаем...', '+', this.spinner);
              const card = this.cardList.addCard(this.newName.value, this.newLink.value, cardData.data._id, [], data.avatar, data.name, data._id, data._id);
              this.cardList.container.insertBefore(card.cardElement, this.cardList.container.firstChild);
              this.close();
            });
          })
        } else {
          this.signView.loadingFull(false, this.popupButton, 'Загружаем...', '+', this.spinner);
          const card = this.cardList.addCard(this.newName.value, this.newLink.value, '', [], '', 'Кто добавил - неизвестно', '', '');
          this.cardList.container.insertBefore(card.cardElement, this.cardList.container.firstChild);
          this.close();
        }
      })
    }

  }

  open() {
    super.open();
    this.newName.value = '';
    this.nameError.textContent = '';
    this.newLink.value = '';
    this.linkError.textContent = '';
    this.formValidation.setSubmitButtonState(this.popupButton, false);
    this.popupButton.style.fontSize = '36px';
  }

  // обработчик добавления карточки 
  formInputHandlerAddCard(event) {

    if (event.target === this.newName) {
      this.nameValid = this.formValidation.checkInputValidity(this.newName.value, this.nameError, 'text');

    } else if (event.target === this.newLink) {
      this.linkValid = this.formValidation.checkInputValidity(this.newLink.value, this.linkError, 'link');
    }

    if (this.nameValid && this.linkValid) {
      this.formValidation.setSubmitButtonState(this.popupButton, true);
    } else {
      this.formValidation.setSubmitButtonState(this.popupButton, false);
    }
  }

  // обработчики 
  addCardHandlers() {
    document.querySelector('.user-info__button').addEventListener('click', this.open.bind(this));
    window.addEventListener('keydown', this.closeByKey.bind(this));
    this.element.addEventListener('click', this.closeByClick.bind(this));
    this.element.querySelector('.popup__form').addEventListener('submit', this.addUserCard.bind(this));
    this.element.querySelector('.popup__form').addEventListener('input', this.formInputHandlerAddCard.bind(this));

  }
}