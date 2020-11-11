import Popup from './Popup'

export default class PopupReg extends Popup {
  constructor(element, api, formValidation, signView) {
    super(element);
    this.signView = signView;
    this.spinner = this.element.querySelector('.spinner');
    this.api = api;
    this.formValidation = formValidation;
    this.handlers();

    this.name = this.element.querySelector('.popup__input_name');
    this.about = this.element.querySelector('.popup__input_about');
    this.avatar = this.element.querySelector('.popup__input_avatar');
    this.email = this.element.querySelector('.popup__input_email');
    this.password = this.element.querySelector('.popup__input_password');
    this.confirmPassword = this.element.querySelector('.popup__input_confirm-password');

    this.popupButton = this.element.querySelector('.popup__button');

    this.nameError = this.element.querySelector('.popup__input-first-error-message');
    this.aboutError = this.element.querySelector('.popup__input-second-error-message');
    this.avatarError = this.element.querySelector('.popup__input-third-error-message');
    this.emailError = this.element.querySelector('.popup__input-fourth-error-message');
    this.passwordError = this.element.querySelector('.popup__input-fifth-error-message');
    this.confirmPasswordError = this.element.querySelector('.popup__input-sixth-error-message');

    this.nameValid = false;
    this.aboutValid = false;
    this.avatarValid = false;
    this.emailValid = false;
    this.passwordValid = false;
    this.confirmPasswordValid = false;

    this.inputsArr = [this.nameError, this.aboutError, this.avatarError, this.emailError, this.passwordError, this.confirmPasswordError, this.name, this.about, this.avatar, this.email, this.password, this.confirmPassword]
  }

  open() {
    this.formValidation.setSubmitButtonState(this.popupButton, false);
    super.open();
    // очищаем все поля
    this.inputsArr.map(input => {
      if (input.classList.contains('popup__input')) {
        return input.value = ''
      }
      return input.textContent = ''
    })
  }

  popupSignup(event) {
    event.preventDefault();
    this.signView.loadingFull(true, this.popupButton, 'Регистрируемся...', 'Зарегистрироваться', this.spinner);
    this.api.signup(this.name.value, this.about.value, this.avatar.value, this.email.value, this.password.value, (data) => {
      if (data.message.startsWith('Данные не прошли валидацию')) {
        this.signView.loadingFull(false, this.popupButton, 'e-mail занят', 'Зарегистрироваться', this.spinner);
        alert('Похожe пользователь с таким email уже существует :(')
      } else {
        alert('Поздравляем с успешной регистрацией!')
        this.close();
        this.signView.loadingFull(false, this.popupButton, 'Регистрируемся...', 'Зарегистрироваться', this.spinner);
      }
    });
  }


  formInputHandlerReg(event) {
    if (event.target === this.name) {
      this.nameValid = this.formValidation.checkInputValidity(this.name.value, this.nameError, 'text');
    } else if (event.target === this.about) {
      this.aboutValid = this.formValidation.checkInputValidity(this.about.value, this.aboutError, 'text');
    } else if (event.target === this.avatar) {
      this.avatarValid = this.formValidation.checkInputValidity(this.avatar.value, this.avatarError, 'link');
    } else if (event.target === this.email) {
      this.emailValid = this.formValidation.checkInputValidity(this.email.value, this.emailError, 'email');
    } else if (event.target === this.password) {
      this.passwordValid = this.formValidation.checkInputValidity(this.password.value, this.passwordError, 'password');
    } else if (event.target === this.confirmPassword) {
      this.confirmPasswordValid = this.formValidation.isInputSame(this.confirmPassword.value, this.password.value, this.confirmPasswordError);
    }

    this.validArr = [this.nameValid, this.aboutValid, this.avatarValid, this.emailValid, this.passwordValid, this.confirmPasswordValid]
    if (this.validArr.every(valid => valid === true)) {
      this.formValidation.setSubmitButtonState(this.popupButton, true);
    } else {
      this.formValidation.setSubmitButtonState(this.popupButton, false);
    }
  }

  handlers() {
    document.querySelector('.popup-author__button').addEventListener('click', this.open.bind(this));
    document.querySelector('.header__button_reg').addEventListener('click', this.open.bind(this));
    window.addEventListener('keydown', this.closeByKey.bind(this));
    this.element.addEventListener('click', this.closeByClick.bind(this));
    this.element.querySelector('.popup__form').addEventListener('input', this.formInputHandlerReg.bind(this));
    this.element.querySelector('.popup__form').addEventListener('submit', this.popupSignup.bind(this));

  }

}