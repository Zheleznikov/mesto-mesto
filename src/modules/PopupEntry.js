import Popup from './Popup'

export default class PopupEntry extends Popup {
  constructor(element, api, formValidation, signView, cardList) {
    super(element);
    this.cardList = cardList;
    this.signView = signView;
    this.api = api;
    this.formValidation = formValidation;
    this.handlers();

    this.popupButton = this.element.querySelector('.popup__button');
    this.email = this.element.querySelector('.popup__input-email');
    this.password = this.element.querySelector('.popup__input-password');
    this.emailError = this.element.querySelector('.popup__input-first-error-message');
    this.passwordError = this.element.querySelector('.popup__input-second-error-message');
    this.spinner = this.element.querySelector('.spinner');

    this.emailValid = false;
    this.passwordValid = false;
  }

  open() {
    this.signView.loadingFull(false, this.popupButton, 'Неправильные почта или пароль', 'Войти', this.spinner);
    this.emailValid = false;
    this.passwordValid = false;
    this.email.value = '';
    this.password.value = '';
    this.emailError.textContent = '';
    this.passwordError.textContent = '';
    this.formValidation.setSubmitButtonState(this.popupButton, false);

    super.open();
  }

  popupSignin(event) {
    event.preventDefault();
    this.signView.loadingFull(true, this.popupButton, 'Заходим...', 'войти', this.spinner);
    this.api.signin(this.email.value, this.password.value, (data) => {
      if (data.message === 'ok') {
        document.querySelector('.user-info__name').textContent = data.user.name;
        document.querySelector('.user-info__job').textContent = data.user.about;
        document.querySelector('.user-info__photo').style.backgroundImage = `url(${data.user.avatar})`;
        this.signView.signedButtonsView(data);
        this.cardList.cardClear(document.querySelector('.places-list'));
        this.signView.loading(true, document.querySelector('.spinner__root'));
        this.api.getInitialCards(cards => {
          this.signView.loading(false, document.querySelector('.spinner__root'));
          this.cardList.render(cards, data.user._id)
        });
        
        this.close();
        this.signView.loadingFull(false, this.popupButton, 'Заходим...', 'Войти', this.spinner);
      
      } else {
        this.signView.loadingFull(true, this.popupButton, 'Неправильные почта или пароль', 'Войти', this.spinner);
     }
    });
  }


  formInputHandlersignin(event) {
    if (event.target === this.email) {
      this.emailValid = this.formValidation.checkInputValidity(this.email.value, this.emailError, 'email');
    } else if (event.target === this.password) {
      this.passwordValid = this.formValidation.checkInputValidity(this.password.value, this.passwordError, 'password');
    }

    if (this.emailValid && this.passwordValid) {
      this.formValidation.setSubmitButtonState(this.popupButton, true);
    } else {
      this.formValidation.setSubmitButtonState(this.popupButton, false);
    }
  }




  handlers() {
    document.querySelector('.header__button_entry').addEventListener('click', this.open.bind(this));
    window.addEventListener('keydown', this.closeByKey.bind(this));
    this.element.addEventListener('click', this.closeByClick.bind(this));
    this.element.querySelector('.popup__form').addEventListener('submit', this.popupSignin.bind(this));
    this.element.querySelector('.popup__form').addEventListener('input', this.formInputHandlersignin.bind(this));
  }

}