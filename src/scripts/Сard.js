export default class Card {
  constructor ({ data, cardSelector, handleCardClick, userId, deleteIcon, setLike, deleteLike }) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
    this._userCard = data.owner._id;
    this._likes = data.likes;
    this._deleteIcon = deleteIcon;
    this._setLike = setLike;
    this._deleteLike = deleteLike;

  }
  _getTemplate () {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
    return cardElement;
  }

  createCard () {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__like-btn');
    this._trashButton = this._element.querySelector('.element__trash-btn');
    this._elementImage = this._element.querySelector('.element__image');
    this._likesCount = this._element.querySelector('.element__like-count');
    this._element.querySelector('.element__title').textContent =  this._name;
    this._elementImage.src =  this._link;
    this._elementImage.alt = 'Изображение ' +  this._name;
    this._hasDeleteBtn();
    this._isLiked();
    this._likesCount.textContent = this._likes.length;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners () {
    this._element.querySelector('.element__like-btn').addEventListener('click', (evt) => {
      if (this._likeButton.classList.contains('element__like-btn_active')) {
        this._deleteLike(this._cardId)
      } else {
        this._setLike(this._cardId)
      }
    });
    this._trashButton.addEventListener('click', () => {
      this._deleteIcon(this._cardId)
    });
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick (this._name, this._link)
    });
  }

  _isLiked() {
    if (this._likes.some((user) => {
      return this._userId === user._id;
    })) {
      this._likeButton.classList.add('element__like-btn_active');
    }
  }

  toggleLikeButton(data) {
    this._likes = data.likes;
    this._likesCount.textContent = this._likes.length;
    this._likeButton.classList.toggle('element__like-btn_active');
}

_hasDeleteBtn() {
    if (this._userId !== this._userCard) {
      this._trashButton.remove();
    }
  }

deleteElement() {
    this._element.remove();
    this._element = null;
  }
}
