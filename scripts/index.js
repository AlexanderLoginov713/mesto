const popupElement = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popupElement.querySelector('.popup__close-button');
const ESC_KEY = "Escape";
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('input[name=name]');
const jobInput = formElement.querySelector('input[name=job]');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const likeButtons = document.querySelectorAll('.element__like-btn');

for (let likeButton of likeButtons) {
    likeButton.onclick = function () {
    likeButton.classList.toggle('element__like-btn_active');
  }
}

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

