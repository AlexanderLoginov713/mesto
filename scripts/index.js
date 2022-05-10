import { initialCards, validationSettings } from "./constants.js";
import Card from "./Сard.js";
import FormValidator from "./FormValidator.js";

const popups = document.querySelectorAll('.popup');

const profilePopup = document.querySelector('.profile-popup');
const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const formElement = document.querySelector('.popup__form_profile');
const nameInput = formElement.querySelector('input[name=name]');
const jobInput = formElement.querySelector('input[name=job]');

const addButton = document.querySelector('.profile__add-button');
const popupAddElement = document.querySelector('.popup_add-element');
const formAddElement = document.querySelector('.popup__form_add-element');
const placeNameInput = formAddElement.querySelector('input[name=addPlaceName]');
const photoLinkInput = formAddElement.querySelector('input[name=addPhotoLink]');

const elementsContainer = document.querySelector('.elements');

const popupImageElement = document.querySelector('.popup_view-image');
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__image-title');

//Создание карточек из массива при загрузке
const createCard = (item) => {
  const card = new Card(item, '.element-template', handleCardClick);
  return card.createCard();
}

const elements = initialCards.map(createCard);
elementsContainer.append(...elements);

//Открытие попапов
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

//Закрытие попапов
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
     if (evt.target.classList.contains('popup__close-button') || evt.target.classList.contains('popup')) {
        closePopup(popup)
      }
  });
});

const closeByEsc = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//Открытие попапа редактирование профиля
editButton.addEventListener('click', () =>  {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(profilePopup);
  formValidators['profile-edit'].resetValidation();
});

//Обработчик «отправки» формы профиля
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profilePopup);
}
formElement.addEventListener('submit', handleProfileFormSubmit);

//Открытие попапа добавления нового элемента (карточки)
addButton.addEventListener('click', () => {
  openPopup(popupAddElement);
  formValidators['add-element'].resetValidation();
});

const renderAddElement = (placeNameInput, photoLinkInput) => {
  elementsContainer.prepend(createCard({ name: placeNameInput.value, link: photoLinkInput.value }));
}

// Обработчик «отправки» формы нового элемента (карточки)
const handleAddForm = (evt) => {
  evt.preventDefault();
  renderAddElement(placeNameInput, photoLinkInput);
  formAddElement.reset();
  closePopup(popupAddElement);
}
formAddElement.addEventListener('submit', handleAddForm);

function handleCardClick (name, link) {
  popupImageTitle.textContent = name;
  popupImage.src = link;
  popupImage.alt = 'Изображение ' +  name;
  openPopup(popupImageElement);
}

// Включение валидации
const formValidators = {}
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
   validator.enableValidation();
  });
}
enableValidation(validationSettings);
