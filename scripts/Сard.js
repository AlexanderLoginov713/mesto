import { openPopup } from "./index.js";
export default class Card {
  constructor (data, cardSelector) {
    this._cardName = data.name;
    this._cardLink = data.link;
    this._cardSelector = cardSelector;
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
    this._setEventListeners();
    const elementImage = this._element.querySelector('.element__image');
    this._element.querySelector('.element__title').textContent =  this._cardName;
    elementImage.src =  this._cardLink;
    elementImage.alt = 'Изображение ' +  this._cardName;
    return this._element;
  }

   //Попап с картинкой
  _imagePopup () {
    const _popupImageElement = document.querySelector('.popup_view-image');
    const _popupImage = _popupImageElement.querySelector('.popup__image');
    const _popupImageTitle = _popupImageElement.querySelector('.popup__image-title');
    _popupImageTitle.textContent = this._cardName;
    _popupImage.src = this._cardLink;
    openPopup (_popupImageElement);
  }

  _setEventListeners () {
    this._element.querySelector('.element__trash-btn').addEventListener('click', () => {
      this._element.remove();
    });
    this._element.querySelector('.element__like-btn').addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__like-btn_active');
    });
    this._element.querySelector('.element__image').addEventListener('click', () => this._imagePopup ());
  }
}
