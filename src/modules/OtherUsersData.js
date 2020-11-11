export default class OtherUsersData {
  constructor(container, about, avatar, name, _id) {
    this.container = container;
    this.about = about;
    this.avatar = avatar;
    this.name = name;
    this._id = _id;
  }

  clear() {
    this.container.innerHTML = '';
  }

  create(about, avatar, name, _id, counter) {
    const block = document.querySelector('.users-list-template').content.cloneNode(true);

    block.querySelector('.popup-user-list__name').textContent = name;
    block.querySelector('.popup-user-list__job').textContent = about;
    block.querySelector('.popup-user-list__photo').style.backgroundImage = `url(${avatar})`;

    if (counter === 1) {
      block.querySelector('.popup-user-list__counter').textContent = `Добавил(а) 1 карточку`;
    } else if (counter > 1 && counter < 5) {
      block.querySelector('.popup-user-list__counter').textContent = `Добавил(а) уже ${counter} карточки`;
    } else if (counter > 4 && counter < 11) {
      block.querySelector('.popup-user-list__counter').textContent = `Добавил(а) целых ${counter} карточек`;
    } else if (counter > 10) {
      block.querySelector('.popup-user-list__counter').textContent = `Добавил(а) больше 10 карточек, не сосчитать`;
    }

    this.container.appendChild(block);
  }

  render(blocks) {
    let owners = [];
    let ownersMap = {};
    this.counter = 0;
    owners = blocks.map(elem => elem.owner);
    owners.forEach(owner => ownersMap[owner._id] = owner)

    //наконец-то создаем блок с информацией
    Object.values(ownersMap).forEach(owner => {
      this.counter = 0;
      owners.forEach(ow => {
        if (owner._id === ow._id) {
          this.counter++;
        }
      })
      owner.numOfCards = this.counter;
    })

     Object.entries(ownersMap).map(el => el[1]).sort((a,b) => b.numOfCards - a.numOfCards).forEach(owner => this.create(owner.about, owner.avatar, owner.name, owner._id, owner.numOfCards));

  }




}