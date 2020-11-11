import Popup from './Popup'

export default class ImagePopup extends Popup {
    constructor(element) {
        super(element);
        this.handlers();
    }

    open(link,name, image) {
        super.open();
        this.element.querySelector('.place-popup__new-image').setAttribute('src', link);
        this.element.querySelector('.place-popup__author-name').textContent = name;
        this.element.querySelector('.place-popup__author-logo').style.backgroundImage = `url(${image})`
    }

    handlers() {
        document.querySelector('.place-popup__close').addEventListener('click', this.close.bind(this));
        window.addEventListener('keydown', this.closeByKey.bind(this));
        this.element.addEventListener('click', this.closeByClick.bind(this));
    }
}