import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handlerSubmitForm = handleSubmitForm;
    this._popupForm = this._popupSelector.querySelector('.popup__form');
    this._inputs = this._popupForm.querySelectorAll('.popup__input');
    this._submitButton = this._popupForm.querySelector('.popup__submit-button');
    this._submitButtonText = this._submitButton.textContent;
  }
  _getInputValues() {
    this._formValue = {};
    this._inputs.forEach((input) => {
      this._formValue[input.name] = input.value
    });
      return this._formValue;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handlerSubmitForm(this._getInputValues());
      this.close();
      });
  }
  close() {
    super.close();
    this._popupForm.reset();
  }

  loading(isLoading, defaultText) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = defaultText;
    }
  }
}
