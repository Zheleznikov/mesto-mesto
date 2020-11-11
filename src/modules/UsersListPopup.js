import Popup from './Popup'

export default class UsersListPopup extends Popup {
  constructor(element, api, otherUsersData, signView) {
    super(element);
    this.api = api;
    this.otherUsersData = otherUsersData;
    this.signView = signView;
    this.handlers();
    this.spinner = this.element.querySelector('.spinner');
  }

  open() {
    this.otherUsersData.clear();
    super.open();
    this.signView.loading(true, this.spinner);
    this.api.getInitialCards(initialCards => {
      this.signView.loading(false, this.spinner);
      this.otherUsersData.render(initialCards)
    });
  }

  handlers() {
    document.querySelector('.user-info__get').addEventListener('click', this.open.bind(this));
    window.addEventListener('keydown', this.closeByKey.bind(this));
    this.element.addEventListener('click', this.closeByClick.bind(this));
  }
}