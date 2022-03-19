let popupElement = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = popupElement.querySelector('.popup__close-button');
let ESC_KEY = "Escape";
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('input[name=name]');
let jobInput = formElement.querySelector('input[name=job]');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let likeButtons = document.querySelectorAll('.element__like-btn');

for (let likeButton of likeButtons) {
    likeButton.onclick = function () {
    likeButton.classList.toggle('element__like-btn_active');
  }
}

function openPopup () {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keyup', onDocumentKeyUp);
}

function closePopup () {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keyup', onDocumentKeyUp);
}

function onDocumentKeyUp(event) {
   if (event.key === ESC_KEY) {
     closePopup();
   }
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

