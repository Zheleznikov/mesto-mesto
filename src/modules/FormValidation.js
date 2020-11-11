export default class FormValidation {

  // валидация текстовых полей
  checkInputTextValidity(value, tip) {
    const errorMessage1 = 'это поле должно быть заполнено';
    const errorMessage2 = 'должно быть от 2 до 30 символов';

    if (value.length === 0) {
      tip.textContent = errorMessage1;
      return false;

    } else if (value.length === 1 || value.length > 30) {
      tip.textContent = errorMessage2;
      return false;

    } else {
      tip.textContent = '';
      return true;
    }
  }

  // валидация ссылок
  checkInputLinkValidity(value, tip) {
    const errorMessage1 = 'это поле должно быть заполнено';
    const errorMessage3 = 'это не ссылка';
    const linkReg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/

    if (value === '') {
      tip.textContent = errorMessage1;
      return false;

    } else if (!linkReg.test(value)) {
      tip.textContent = errorMessage3;
      return false;
    } else {
      tip.textContent = '';
      return true;
    }
  }

  // валидация картинок
  isImg(url, callback) {
    const img = document.createElement('img');
    img.src = url;
    img.onload = () => callback();
    img.onerror = () => alert('Похоже, вы загружаете не изображение');
  }

  // валидация пароля
  checkInputPasswordValidity(value, tip) {
    const passwordReg = /\w+/;
    const errorMessage4 = 'Пароль должен содержать латинские символы и цифры';
    const errorMessage1 = 'это поле должно быть заполнено';
    const errorMessage5 = 'Пароль должен быть не менее 8 символов'
    if (value === '') {
      tip.textContent = errorMessage1;
      return false;
    } else if (value.length < 8) {
      tip.textContent = errorMessage5;
      return false;
    } else if (!passwordReg.test(value)) {
      tip.textContent = errorMessage4;
      return false;
    } else {
      tip.textContent = '';
      return true;
    }
  }

  // валидация email 
  checkInputEmailValidity(value, tip) {
    const emailReg = /\w+@\w+\.\w+/;
    const errMessage4 = 'Это не email';
    const errorMessage1 = 'это поле должно быть заполнено';
    if (value === '') {
      tip.textContent = errorMessage1;
      return false;
    } else if (!emailReg.test(value)) {
      tip.textContent = errMessage4;
      return false;
    } else {
      tip.textContent = '';
      return true;
    }
  }

  // валидация полей на одинаковость
  isInputSame(value1, value2, tip) {
    if (value1 !== value2) {
      tip.textContent = 'пароли не совпадают';
      return false;
    } else if (value2 === value1) {
      tip.textContent = '';
      return true;
    }

  }

  // определям что валидируем
  checkInputValidity(value, tip, inputType) {
    if (inputType === 'text') {
      return this.checkInputTextValidity(value, tip);
    }
    if (inputType === 'link') {
      return this.checkInputLinkValidity(value, tip);
    }
    if (inputType === 'email') {
      return this.checkInputEmailValidity(value, tip)
    }
    if (inputType === 'password') {
      return this.checkInputPasswordValidity(value, tip)
    }
  }

  // работа с кнопкой
  setSubmitButtonState(button, valid) {
    if (valid) {
      button.removeAttribute('disabled', true);
      button.classList.add('popup__button_active');
    } else {
      button.setAttribute('disabled', true);
      button.classList.remove('popup__button_active');
    }
  }


}