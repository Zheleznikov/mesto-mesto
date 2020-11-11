export default class CardList {
  constructor(container, addCard) {
    this.container = container;
    this.addCard = addCard;
  }

  appendCard(container, card) {
    container.appendChild(card);
  }

  isLiked(checkedContainer, element, my_id) {
    if (checkedContainer.includes(my_id)) {
      element.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked');
    }
  }

  cardClear(container) {
    container.textContent = '';
  }

  render(cardsArray, my_id) {
    cardsArray.reverse().forEach(elem => {
      const card = this.addCard(elem.name, elem.link, elem._id, elem.likes, elem.owner.avatar, elem.owner.name, elem.owner._id, my_id);
      this.appendCard(this.container, card.cardElement);
      this.isLiked(elem.likes, card.cardElement, my_id);

      const img = document.createElement('img');
      img.src = elem.link;
      img.onload = () => card.cardElement.style.display = 'block';
      img.onerror = () => card.cardElement.style.display = 'none';
    })


  }



}