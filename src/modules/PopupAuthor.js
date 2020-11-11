import Popup from './Popup'

export default class PopupAuthor extends Popup {
  constructor(element) {
    super(element);
    this.handlers();
  }

  handlers() {
    document.querySelector('.header__button_author').addEventListener('click', this.open.bind(this));
    window.addEventListener('keydown', this.closeByKey.bind(this));
    this.element.addEventListener('click', this.closeByClick.bind(this));
    this.element.querySelector('.popup__button').addEventListener('click', this.close.bind(this));
  }
}