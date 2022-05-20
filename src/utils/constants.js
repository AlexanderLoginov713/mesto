const cardsContainer = document.querySelector('.elements');
const profilePopup = document.querySelector('.profile-popup');
const editButton = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup__form_profile');
const nameInput = formElement.querySelector('input[name=name]');
const jobInput = formElement.querySelector('input[name=job]');
const addButton = document.querySelector('.profile__add-button');
const popupAddElement = document.querySelector('.popup_add-element');
const popupImageElement = document.querySelector('.popup_view-image');
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__image-title');

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error-text_status-error'
}

const elementTemplate = '.element-template';
const profileName = '.profile__name';
const profileJob = '.profile__job';
const profileEdit ='profile-edit';
const addElement = 'add-element';

export {
  cardsContainer,
  profilePopup,
  editButton,
  nameInput,
  jobInput,
  addButton,
  popupAddElement,
  popupImageElement,
  popupImage,
  popupImageTitle,
  validationSettings,
  elementTemplate,
  profileName,
  profileJob,
  profileEdit,
  addElement
}


