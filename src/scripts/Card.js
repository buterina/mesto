export class Card {
  constructor(data, cardTemplate, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data.id;
    this._template = document.querySelector(cardTemplate).content.querySelector('.card');
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._userId = data.userId;
    this._ownerId = data.ownerId
  }

  //лайкнуть
  _addLike = () => {
    this._likeButton.classList.add('card__like-button_filled');
  }

  //убрать лайк
  _deleteLike = () => {
    this._likeButton.classList.remove('card__like-button_filled');
  }

  //проверить на наличие лайка
  isLiked() {
    const userHasLikedCard = this._likes.find(user => user._id === this._userId);
    return userHasLikedCard;
  }

  //удалить карточку
  deleteCard = () => {
    this._cardElement.remove();
  };

  //слушатели
  _setEventListeners = () => {
    this._likeButton.addEventListener('click', () => (this._handleLikeClick(this._id)));
    this._deleteButton.addEventListener('click', () => (this._handleDeleteClick(this._id)));
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  };

  //заполнение
  _fillCard = () => {
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    const likeCountElement = this._cardElement.querySelector('.card__like-count');
    likeCountElement.textContent = this._likes.length;


    if (this.isLiked()) {
      this._addLike();
    } else {
      this._deleteLike();
    }
  }

  //создать карточку
  getCardElement = () => {

    this._cardElement = this._template.cloneNode(true);
    this._likeButton = this._cardElement.querySelector('.card__like-button');
    this._deleteButton = this._cardElement.querySelector('.card__delete-button');
    this._cardImage = this._cardElement.querySelector('.card__photo');
    this._cardTitle = this._cardElement.querySelector('.card__title');

    this._fillCard();
    this._setEventListeners();
    this.setLikes(this._likes);

    if (this._ownerId !== this._userId) {
      this._deleteButton.style.display = 'none';
    }


    return this._cardElement;
  }

}
