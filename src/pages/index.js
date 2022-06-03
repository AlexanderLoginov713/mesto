import './index.css';
import {config} from '../utils/data.js'
import Card from '../scripts/Сard.js';
import FormValidator from '../scripts/FormValidator.js';
import Section from '../scripts/Section.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import PopupWithConfirm from '../scripts/PopupWithConfirm.js';
import UserInfo from "../scripts/UserInfo.js";
import Api from '../scripts/Api.js';

import {
  validationSettings,
  cardsContainer,
  profilePopup,
  editButton,
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
  editAvatarForm,
  popupConfirmDelete
} from "../utils/constants.js";

const api = new Api(config);

let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()])
.then(([initialCards, userData]) => {
  userInfo.setUserInfo(userData);
  userId = userData._id;
  console.log(initialCards);
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
  popupImageTitle.textContent = name;
  popupImage.src = link;
  popupImage.alt = 'Изображение ' +  name;
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

    const cardElement = card.createCard();
    return cardElement;
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
popupConfirm.setEventListeners();
