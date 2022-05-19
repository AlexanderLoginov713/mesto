export default class Popup {
  constructor (popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

//Открытие попапов
open () {
  this._popupSelector.classList.add('popup_opened');
  document.addEventListener('keydown', this._handleEscClose);
}

//Закрытие попапов
close () {
  this._popupSelector.classList.remove('popup_opened');
  document.removeEventListener('keydown', this._handleEscClose);
}

setEventListeners () {
  this._popupSelector.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close-button') || evt.target.classList.contains('popup')) {
      this.close()
     }
});
}

_handleEscClose (evt) {
  if (evt.key === 'Escape') {
    this.close();
  }
}
}
