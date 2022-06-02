import './index.css';
import Card from "../scripts/Сard.js";
import FormValidator from "../scripts/FormValidator.js";
import Section from "../scripts/Section.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import UserInfo from "../scripts/UserInfo.js";
import Api from '../scripts/Api.js';
import { config } from '../utils/data.js';

import {
  validationSettings,
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
  elementTemplate,
  profileName,
  profileJob,
  profileEdit,
  profileAvatar,
  addElement,
  popupEditAvatar,
  editAvatarButton,
  editAvatarForm
} from "../utils/constants.js";

const api = new Api(config);

let userId;

//Загрузка данных профиля
api.getUserInfo()
  .then((data) => {
    userInfo.setUserInfo(data);
    userId = data._id;
  })
  .catch(err => console.log(`Ошибка: ${err}`));

function handleCardClick (name, link) {
  popupImageTitle.textContent = name;
  popupImage.src = link;
  popupImage.alt = 'Изображение ' +  name;
  popupWithImage.open({name, link});
}

//Создание карточек при загрузке
api.getInitialCards()
.then(data => {
  const createCard =  new Section ({
    data: data,
    renderer: rendererForCards
  }, cardsContainer)
  createCard.renderItems();
})
.catch(err => console.log(`Ошибка: ${err}`));


const rendererForCards = (item) => {
  const card = new Card (item, elementTemplate, handleCardClick);
  return(card.createCard())}

//
const userInfo = new UserInfo({
  name: profileName,
  job: profileJob,
  avatar: profileAvatar
});

const popupWithImage = new PopupWithImage (popupImageElement);

const popupAdd = new PopupWithForm (popupAddElement, (data) => {
  createCard.addItem(rendererForCards(data));
});

const popupEdit = new PopupWithForm(profilePopup, (data) => {
  api.editProfile(data)
  .then(data => {
    userInfo.setUserInfo(data);
  })
  .catch(err => console.log(`Ошибка: ${err}`));

});

const popupAvatar = new PopupWithForm(popupEditAvatar, (data) => {

    api.editAvatar(data)
    .then(data => {
      userInfo.setUserInfo(data);
      popupAvatar.close();
    })
    .catch(err => console.log(`Ошибка: ${err}`));
    })


//Открытие попапа редактирование аватара
editAvatarButton.addEventListener('click', () => {
  popupAvatar.open();
  formValidators[editAvatarForm].resetValidation();
});

//Открытие попапа редактирование профиля
editButton.addEventListener('click', () =>  {
  popupEdit.open();
  formValidators[profileEdit].resetValidation();
});

//Открытие попапа добавления нового элемента (карточки)
addButton.addEventListener('click', () => {
  popupAdd.open();
  formValidators[addElement].resetValidation();
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

popupWithImage.setEventListeners();
popupAdd.setEventListeners();
popupEdit.setEventListeners();
popupAvatar.setEventListeners();
