import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popupSelector.querySelector('.popup__form');
  }
  submitCallBack(remove) {
    this._handleSubmit = remove;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }
}
