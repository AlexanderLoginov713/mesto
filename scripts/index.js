const popups = document.querySelectorAll('.popup');

const profilePopup = document.querySelector('.profile-popup');
const editButton = document.querySelector('.profile__edit-button');

const formElement = document.querySelector('.popup__form_profile');
const nameInput = formElement.querySelector('input[name=name]');
const jobInput = formElement.querySelector('input[name=job]');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const addButton = document.querySelector('.profile__add-button');
const popupAddElement = document.querySelector('.popup_add-element');
const formAddElement = document.querySelector('.popup__form_add-element');
const placeNameInput = formAddElement.querySelector('input[name=addPlaceName]');
const photoLinkInput = formAddElement.querySelector('input[name=addPhotoLink]');

const popupImageElement = document.querySelector('.popup_view-image');
const popupImage = popupImageElement.querySelector('.popup__image');
const popupImageTitle = popupImageElement.querySelector('.popup__image-title');

const template = document.querySelector('.element-template').content;

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

//Создание карточек из массива при загрузке
const elementsContainer = document.querySelector('.elements');
const createCard = (cardName, cardLink) => {
  const element = template.querySelector('.element').cloneNode(true);
  element.querySelector('.element__title').textContent = cardName;
  element.querySelector('.element__image').src = cardLink;
  element.querySelector('.element__image').alt = 'Изображение ' + cardName;
  element.querySelector('.element__trash-btn').addEventListener('click', () => {
    element.remove();
  });
  element.querySelector('.element__like-btn').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like-btn_active');
  });
  element.querySelector('.element__image').addEventListener('click', () => imagePopup (cardName, cardLink));
  return element;
}

const elements = initialCards.map(function(item) {
  return createCard(item.name, item.link);
});

elementsContainer.append(...elements);

//функции открытия и закрытия попапов
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
}
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
}

//Функция закрытия для всех попапов
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
     if (evt.target.classList.contains('popup__close-button')) {
        closePopup(popup)
      }
  })
});

//Открытие попапа редактирование профиля
editButton.addEventListener('click', () => openPopup(profilePopup));

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
const imagePopup = (cardName, cardLink) => {
  openPopup (popupImageElement);
  popupImageTitle.textContent = cardName;
  popupImage.src = cardLink;
  popupImage.alt = 'Изображение ' + cardName;
}



