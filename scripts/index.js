const popupElement = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popupElement.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('input[name=name]');
const jobInput = formElement.querySelector('input[name=job]');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
//const likeButtons = document.querySelectorAll('.element__like-btn');

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
  const template = document.querySelector('#element-template').content;
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

function openPopup () {
  popupElement.classList.add('popup_opened');
  profileName.value = profileName.textContent;
  profileJob.value = profileJob.textContent;
  document.addEventListener('keyup', onDocumentKeyUp);
}

function closePopup () {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keyup', onDocumentKeyUp);
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

// Обработчик «отправки» формы
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}
formElement.addEventListener('submit', formSubmitHandler);

