import { photoCaption, popupPhoto, photoModal, openModal } from './index.js';

export class Card {
  constructor(data, cardTemplate) {
    this._name = data.name;
    this._link = data.link;
    this._template = document.querySelector(cardTemplate).content.querySelector('.card')
  }

  //лайкнуть
  _toggleLike = () => {
    this._likeButton.classList.toggle('card__like-button_filled');
  }

  //удалить карточку
  _deleteCard = () => {
    this._cardElement.remove();
  };

  //наполнить фото попап данными и открыть
  _openPhotoModal = () => {
    photoCaption.textContent = this._name;
    popupPhoto.src = this._link;
    popupPhoto.alt = this._name;
    openModal(photoModal);
  }

  //слушатели
  _setEventListeners = () => {
    this._likeButton.addEventListener('click', this._toggleLike);
    this._deleteButton.addEventListener('click', this._deleteCard);
    this._cardImage.addEventListener('click', this._openPhotoModal);
  };

  //заполнение
  _fillCard = () => {
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
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

    return this._cardElement;
  }

}
