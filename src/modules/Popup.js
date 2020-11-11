 //УНИВЕРСАЛЬНЫЙ КЛАСС РАБОТЫ С ПОПАПОМ

 export default class Popup {
   constructor(element) {
     this.element = element;
   }

   // открыть
   open() {
     this.element.classList.add('popup_is-opened');
   }

   // закрыть
   close() {
     this.element.classList.remove('popup_is-opened');
   }

   // закрыть by esc
   closeByKey(event) {
     if (event.keyCode === 27) {
      this.close();
     }
   }

   // закрыть, щелкнув просто где-то на экране
   closeByClick(event) {
    if (event.target === this.element || event.target === this.element.querySelector('.popup__close')) {
      this.close();
    }
   }

  

 }