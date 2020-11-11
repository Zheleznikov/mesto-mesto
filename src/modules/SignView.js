export default class SignView {
  constructor() {
    this.handlers();
  }
  
  signedButtonsView(myData) {
    document.querySelector('.header__button_reg').style.display = 'none';
    document.querySelector('.header__button_entry').style.display = 'none';
    document.querySelector('.header__button_exit').style.display = 'block';
  }

  unsignedButtonsView() {
    document.querySelector('.header__button_exit').style.display = 'none';
    document.querySelector('.header__button_entry').style.display = 'block';
    document.querySelector('.header__button_reg').style.display = 'block';
  }

  userInfoUnsignedView() {
    document.querySelector('.user-info__name').textContent = 'Jacques-Yves Cousteau';
    document.querySelector('.user-info__job').textContent = 'job Sailor, Researcher';
    document.querySelector('.user-info__photo').style.backgroundImage = 'url(../images/avatar.jpg)';
  }

  userInfoSignedView(myData) {
    document.querySelector('.user-info__name').textContent = myData.name;
    document.querySelector('.user-info__job').textContent = myData.about;
    document.querySelector('.user-info__photo').style.backgroundImage = `url(${myData.avatar})`;
  }

  signed(myData) {
    this.signedButtonsView(myData);
    this.userInfoSignedView(myData)
  }

  unsigned() {
    this.userInfoUnsignedView()
    this.unsignedButtonsView()
  }

  loading(isLoading, spinner) {
    if (isLoading) {
      spinner.classList.add('spinner_visible');

    } else if (isLoading === false) {
      spinner.classList.remove('spinner_visible', false);
    }

  }

  loadingFull(isLoading, element, textLoad, textBefore, spinner) {
    if (isLoading) {
      element.textContent = textLoad;
      spinner.classList.add('spinner_visible');

    } else if (isLoading === false) {
      element.textContent = textBefore;
      spinner.classList.remove('spinner_visible', false);
    }
  }

  showArrow() {
    if (pageYOffset  > 900) {
      document.querySelector('.places-list__button').style.visibility = 'visible';
    } else {
      document.querySelector('.places-list__button').style.visibility = 'hidden';
    }

  }

  handlers() {
    window.addEventListener('scroll', this.showArrow.bind(this));
  }

}