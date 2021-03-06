import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImageTitle = this._popupSelector.querySelector('.popup__image-title');
    this._popupImage = this._popupSelector.querySelector('.popup__image');
  }
  open({ name, link }) {
    super.open();
    this._popupImageTitle.textContent = name;
    this._popupImage.alt = 'Изображение ' +  name;
    this._popupImage.src = link;
  }
}
