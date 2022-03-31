const popupElement = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popupElement.querySelector('.popup__close-button');

const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('input[name=name]');
const jobInput = formElement.querySelector('input[name=job]');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const addButton = document.querySelector('.profile__add-button');
const popupAddElement = document.querySelector('.popup_add-element');
const closeAddPopupButton = popupAddElement.querySelector('.popup__add-close-button');
const formAddElement = document.querySelector('.popup__form_add-element');
const placeNameInput = formAddElement.querySelector('input[name=addPlaceName]');
const photoLinkInput = formAddElement.querySelector('input[name=addPhotoLink]');

const popupImageElement = document.querySelector('.popup_image');
const openImage = popupImageElement.querySelector('.element__image');
//const openTitle = popupImageElement.querySelector('.element__title');
const closeImage = popupImageElement.querySelector('.popup__close-button_image');

const initialCards = [
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
];
const elementsContainer = document.querySelector('.elements');
const createCard = (cardName, cardLink) => {
  const template = document.querySelector('.element-template').content;
  const element = template.querySelector('.element').cloneNode(true);
  element.querySelector('.element__title').textContent = cardName;
  element.querySelector('.element__image').src = cardLink;
  element.querySelector('.element__trash-btn').addEventListener('click', () => {
    element.remove();
  });
  element.querySelector('.element__like-btn').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like-btn_active');
  });
  return element;
}

const elements = initialCards.map(function(item) {
  return createCard(item.name, item.link);
});

elementsContainer.append(...elements);

const openPopup = () => {
  popupElement.classList.add('popup_opened');
  profileName.value = profileName.textContent;
  profileJob.value = profileJob.textContent;
}

const closePopup = () => {
  popupElement.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

// Обработчик «отправки» формы профиля
const formSubmitHandler = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}
formElement.addEventListener('submit', formSubmitHandler);


const openAddPopup = () => {
  popupAddElement.classList.add('popup_opened');
}

const closeAddPopup = () => {
  popupAddElement.classList.remove('popup_opened');
}

addButton.addEventListener('click', openAddPopup);
closeAddPopupButton.addEventListener('click', closeAddPopup);

const renderAddElement = (placeNameInput, photoLinkInput) => {
  elementsContainer.prepend(createCard(placeNameInput.value, photoLinkInput.value));
}

// Обработчик «отправки» формы нового элемента (карточки)
const formAddHandler = (evt) => {
  evt.preventDefault();
  renderAddElement(placeNameInput, photoLinkInput);
  closePopup();
}
formAddElement.addEventListener('submit', formAddHandler);




