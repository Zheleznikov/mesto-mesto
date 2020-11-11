export default class Logout {
  constructor(api, signView, cardList) {
    this.cardList = cardList;
    this.api = api;
    this.signView = signView;
    this.handlers();
  }

  easyLogout() {
    if (confirm('Вы действительно хотите выйти?')) {
      localStorage.setItem('token', undefined);
      // this.api.signin(null, null, (data) => {
      //   console.log('Bye-bye');
      // });
      this.signView.unsignedButtonsView();
      this.signView.userInfoUnsignedView();
      this.signView.loading(true, document.querySelector('.spinner__root'));
      this.api.postme(data => {
      //  this.signView.loading(false, document.querySelector('.spinner__root'));
        this.cardList.cardClear(document.querySelector('.places-list'));
        this.api.getInitialCards(cards => this.cardList.render(cards, 'id'));
      });
    }
  }

  handlers() {
    document.querySelector('.header__button_exit').addEventListener('click', this.easyLogout.bind(this));
  }
}