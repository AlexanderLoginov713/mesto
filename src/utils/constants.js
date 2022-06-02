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
const editAvatarButton = document.querySelector(".profile__avatar-edit-button");
const popupEditAvatar = document.querySelector(".popup_avatar");
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
const profileAvatar ='.profile__avatar';
const addElement = 'add-element';
const editAvatarForm ='avatar-form';

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
  profileAvatar,
  addElement,
  popupEditAvatar,
  editAvatarButton,
  editAvatarForm
}


