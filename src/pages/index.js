import './index.css';
import {config} from '../utils/data.js'
import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from "../components/UserInfo.js";
import Api from '../components/Api.js';

import {
  validationSettings,
  cardsContainer,
  profilePopup,
  editButton,
  addButton,
  popupAddElement,
  popupImageElement,
  elementTemplate,
  nameInput,
  jobInput,
  profileName,
  profileJob,
  profileEdit,
  profileAvatar,
  addElement,
  popupEditAvatar,
  editAvatarButton,
  editAvatarForm,
  popupConfirmDelete
} from "../utils/constants.js";

const api = new Api(config);
let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()])
.then(([initialCards, userData]) => {
  userInfo.setUserInfo(userData);
  userId = userData._id;
  cardList.renderItems(initialCards);
})
.catch((err) => {
  console.log(`Ошибка: ${err}`)
});

const userInfo = new UserInfo({
  name: profileName,
  job: profileJob,
  avatar: profileAvatar
});

function handleCardClick (name, link) {
  popupWithImage.open({name, link});
}

//Попап с картинкой
const popupWithImage = new PopupWithImage (popupImageElement);

//Добавление новой карточки
const popupAdd = new PopupWithForm (popupAddElement, (data) => {
  popupAdd.loading(true, 'Сохранить');
  api.addCard(data)
  .then(data => {
    cardList.addItem(createCard(data));
    popupAdd.close();
  })
  .catch(err => console.log(`Ошибка: ${err}`))
  .finally(() => {
    popupAdd.loading(false, 'Сохранить');
  })
});

// Редактирование профиля
const popupEdit = new PopupWithForm(profilePopup, (data) => {
  popupEdit.loading(true, 'Сохранить');
  api.editProfile(data)
  .then(data => {
    userInfo.setUserInfo(data);
    popupEdit.close();
  })
  .catch(err => console.log(`Ошибка: ${err}`))
  .finally(() => {
    popupEdit.loading(false, 'Сохранить');
  })
});

//Обновление аватара
const popupAvatar = new PopupWithForm(popupEditAvatar, (data) => {
  popupAvatar.loading(true, 'Сохранить');
    api.editAvatar(data)
    .then(data => {
      userInfo.setUserInfo(data);
      popupAvatar.close();
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      popupAvatar.loading(false, 'Сохранить');
    })
  })

  //Создание карточки
  const createCard = (data) => {
    const card = new Card({
      data: data,
      cardSelector: elementTemplate,
      userId: userId,
      handleCardClick: handleCardClick,
        deleteIcon: (cardId) => {
          popupConfirm.open();
          popupConfirm.submitCallBack(() => {
            api.deleteIcon(cardId)
            .then(() => {
              popupConfirm.close();
              card.deleteElement();
            })
            .catch((err) => {
              console.log(`Ошибка: ${err}`);
            });
          });
        },
        setLike: (cardId) => {
          api.setLike(cardId)
          .then((data) => {
            card.toggleLikeButton(data);
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
        },
        deleteLike: (cardId) => {
          api.deleteLike(cardId)
          .then((data) => {
            card.toggleLikeButton(data);
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
        }
      });
      return card.createCard();
    };

const cardList = new Section({
  renderer: (card) => {
    cardList.addItem(createCard(card));
  },
}, cardsContainer);

//Подтверждение удаления карточки
const popupConfirm = new PopupWithConfirm(popupConfirmDelete);

//Открытие попапа редактирование аватара
editAvatarButton.addEventListener('click', () => {
  popupAvatar.open();
  formValidators[editAvatarForm].resetValidation();
});

//Открытие попапа редактирование профиля
function handleProfileButtonClick () {
  popupEdit.open();
  formValidators[profileEdit].resetValidation();
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.job;
}

editButton.addEventListener('click', handleProfileButtonClick);

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
popupConfirm.setEventListeners();
