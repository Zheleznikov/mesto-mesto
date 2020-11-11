/* 
КЛАСС ДЛЯ РАБОТЫ С ИНФОРМАЦИЕЙ И ПОЛЬЗОВАТЕЛЕ
*/


export default class UserInfo {
  constructor(api) {
    this.api = api;
  }

  setUserInfo(name, job) {
    this.name = name;
    this.job = job;

    this.updateUserInfo();
    this.api.editUserInfo(this.name, this.job);


  }

  updateUserInfo() {
    document.querySelector('.user-info__name').textContent = this.name;
    document.querySelector('.user-info__job').textContent = this.job;
  }


}