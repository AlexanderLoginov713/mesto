import { validationSettings } from "./constants.js";
console.log(validationSettings.submitButtonSelector);

export class FormValidator {

  constructor (validationSettings, formElement) {
    this._formSelector = validationSettings.formSelector;
    this._inputSelector = validationSettings.inputSelector;
    this._submitButtonSelector = validationSettings.submitButtonSelector;
    this._inactiveButtonClass = validationSettings.inactiveButtonClass;
    this._inputErrorClass = validationSettings.inputErrorClass;
    this._errorClass = validationSettings.errorClass;
    this._formElement = formElement;

  }

  _showInputError (inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  };

  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners () {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector);

    if (formElement.className === 'popup__form popup__form_add-element') {
      _toggleButtonState(inputList, buttonElement);
    }
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        _checkInputValidity(inputElement);
        _toggleButtonState(inputList, buttonElement);
      });
    });

  };

  //Переключение стилей кнопки
  _toggleButtonState (inputList, buttonElement) {
    if (_hasInvalidInput(inputList)) {
        buttonElement.classList.add(this._inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(this._inactiveButtonClass);
        buttonElement.disabled = false;
    }
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
  };

  _enableValidation () {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault()
      });
       this._setEventListeners();
    });
  }

}



