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
  popupImageTitle
}
