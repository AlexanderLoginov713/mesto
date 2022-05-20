import './pages/index.css';
import { initialCards } from "./scripts/data.js";
import { validationSettings } from "./scripts/validationSettings.js";
import Card from "./scripts/Сard.js";
import FormValidator from "./scripts/FormValidator.js";
import Section from "./scripts/Section.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import UserInfo from "./scripts/UserInfo.js";

import {
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
} from "./scripts/constants.js";

function handleCardClick (name, link) {
  popupImageTitle.textContent = name;
  popupImage.src = link;
  popupImage.alt = 'Изображение ' +  name;
  popupWithImage.open({name, link});
}

//Создание карточек из массива при загрузке
const rendererForCards = (item) => {
  const card = new Card (item, '.element-template', handleCardClick);
  return(card.createCard())}

const createCard =  new Section ({
  data: initialCards,
  renderer: rendererForCards
}, cardsContainer);
createCard.renderItems();

//
const userInfo = new UserInfo({
  name: '.profile__name',
  job: '.profile__job'
});

const popupWithImage = new PopupWithImage (popupImageElement);
popupWithImage.setEventListeners();
console.log(popupWithImage);

const popupAdd = new PopupWithForm (popupAddElement, (data) => {
  createCard.addItem(rendererForCards(data));
});
popupAdd.setEventListeners();

const popupEdit = new PopupWithForm(profilePopup, (data) => {
  userInfo.setUserInfo(data);
});
popupEdit.setEventListeners();

//Открытие попапа редактирование профиля
editButton.addEventListener('click', () =>  {
  const user = userInfo.getUserInfo()
  nameInput.value = user.name;
  jobInput.value = user.job;
  popupEdit.open();
  formValidators['profile-edit'].resetValidation();
});

//Открытие попапа добавления нового элемента (карточки)
addButton.addEventListener('click', () => {
  popupAdd.open();
  formValidators['add-element'].resetValidation();
});

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