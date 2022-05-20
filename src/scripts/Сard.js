export default class Card {
  constructor (data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }
  _getTemplate () {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
    return cardElement;
  }

  createCard () {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._element.querySelector('.element__title').textContent =  this._name;
    this._elementImage.src =  this._link;
    this._elementImage.alt = 'Изображение ' +  this._name;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners () {
    this._element.querySelector('.element__like-btn').addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__like-btn_active');
    });
    this._element.querySelector('.element__trash-btn').addEventListener('click', () => {
      this._element.remove();
    });
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick (this._name, this._link)
      });
  }
}
