/* 
МОДУЛЬ ДЛЯ ИЗМЕНЕНИЯ ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ
*/
import Popup from './Popup'


export default class AddUserInfoPopup extends Popup {
    constructor(element, userInfo, formValidation) {
        super(element);
        this.formValidation = formValidation;
        this.userInfo = userInfo;
        this.popupButton = this.element.querySelector('.popup__button');
        this.newName = this.element.querySelector('.popup__input_type_name');
        this.nameError = this.element.querySelector('.popup__input-first-error-message');
        this.newJob = this.element.querySelector('.popup__input_type_job');
        this.jobError = this.element.querySelector('.popup__input-second-error-message');
        this.spinner = this.element.querySelector('.spinner');
        this.nameValid = true;
        this.jobValid = true;
        this.addUserInfoHandlers();

    }

    // изменить информацию пользователем
    addUserInfo(event) {
        event.preventDefault();
        this.userInfo.setUserInfo(this.newName.value, this.newJob.value);
        this.close();
    }

    // обработчик изменения информации
    formInputHandlerUserInfo(event) {
        if (event.target === this.newName) {
            this.nameValid = this.formValidation.checkInputValidity(this.newName.value, this.nameError, 'text');

        } else if (event.target === this.newJob) {
            this.jobValid = this.formValidation.checkInputValidity(this.newJob.value, this.jobError, 'text');
        }

        if (this.nameValid && this.jobValid) {
            this.formValidation.setSubmitButtonState(this.popupButton, true);
        } else {
            this.formValidation.setSubmitButtonState(this.popupButton, false);
        }
    }

    open() {
        super.open();
        this.nameError.textContent = '';
        this.jobError.textContent = '';
        this.newName.value = document.querySelector('.user-info__name').textContent;
        this.newJob.value = document.querySelector('.user-info__job').textContent;
        this.formValidation.setSubmitButtonState(this.popupButton, true);

        this.nameValid = true;
        this.jobValid = true;
    }

    // обработчики
    addUserInfoHandlers() {
        document.querySelector('.user-info__add').addEventListener('click', this.open.bind(this));
        window.addEventListener('keydown', this.closeByKey.bind(this));
        this.element.addEventListener('click', this.closeByClick.bind(this));
        this.element.querySelector('.popup__form').addEventListener('submit', this.addUserInfo.bind(this));
        this.element.querySelector('.popup__form').addEventListener('input', this.formInputHandlerUserInfo.bind(this));
    }


}