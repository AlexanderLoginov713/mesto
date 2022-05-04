
import { initialCards } from "./constants.js";
import Card from "./card.js";

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

//const popupImageElement = document.querySelector('.popup_view-image');
//const popupImage = popupImageElement.querySelector('.popup__image');
//const popupImageTitle = popupImageElement.querySelector('.popup__image-title');

//const template = document.querySelector('.element-template').content;

const elementsContainer = document.querySelector('.elements');

/*const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];*/

//Создание карточек из массива при загрузке

/*const createCard = (cardName, cardLink) => {
  const element = template.querySelector('.element').cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  element.querySelector('.element__title').textContent = cardName;
  elementImage.src = cardLink;
  elementImage.alt = 'Изображение ' + cardName;
  element.querySelector('.element__trash-btn').addEventListener('click', () => {
    element.remove();
  });
  element.querySelector('.element__like-btn').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like-btn_active');
  });
  elementImage.addEventListener('click', () => imagePopup (cardName, cardLink));
  return element;
}
*/


initialCards.forEach((item) => {
  const card = new Card(item, '.element-template');
  const cardElement = card.createCard();
elementsContainer.append(cardElement);
});

//функции открытия и закрытия попапов
export const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc)
}

//Функция закрытия для всех попапов
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
     if (evt.target.classList.contains('popup__close-button') || evt.target.classList.contains('popup')) {
        closePopup(popup)
      }
  })
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
});

//Обработчик «отправки» формы профиля
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profilePopup);
}
formElement.addEventListener('submit', handleProfileFormSubmit);

//Добавление нового элемента (карточки)
addButton.addEventListener('click', () => openPopup(popupAddElement));
const renderAddElement = (placeNameInput, photoLinkInput) => {
  elementsContainer.prepend(createCard(placeNameInput.value, photoLinkInput.value));
}

// Обработчик «отправки» формы нового элемента (карточки)
const handleAddForm = (evt) => {
  evt.preventDefault();
  renderAddElement(placeNameInput, photoLinkInput);
  closePopup(popupAddElement);
  placeNameInput.value = '';
  photoLinkInput.value = '';
}
formAddElement.addEventListener('submit', handleAddForm);

//Попап с картинкой
/*const imagePopup = (cardName, cardLink) => {
  popupImageTitle.textContent = cardName;
  popupImage.src = cardLink;
  popupImage.alt = 'Изображение ' + cardName;
  openPopup (popupImageElement);
}

*/



