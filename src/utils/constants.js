export const inputCardName = document.querySelector('.popup__input_type_card-name');
export const inputCardLink = document.querySelector('.popup__input_type_card-link');
export const profileName = document.querySelector('.profile__title');
export const profileAvatar = document.querySelector('.profile__avatar');
export const profileAbout = document.querySelector('.profile__bio');
export const cardListSelector = document.querySelector('.cards__gallery');

//модалки
export const addCardModal = document.querySelector('.popup_type_add-card');
export const editModal = document.querySelector('.popup_type_edit');
export const photoModal = document.querySelector('.popup_type_photo');
export const confirmDeleteModal = document.querySelector('.popup_type_delete-confirm');
export const changeAvatarModal = document.querySelector('.popup_type_avatar');

//формы
export const editForm = editModal.querySelector('.popup__form');
export const addCardForm = addCardModal.querySelector('.popup__form');
export const changeAvatarForm = changeAvatarModal.querySelector('.popup__form');

// инпуты
export const inputProfileName = document.querySelector('.popup__input_type_name');
export const inputProfileAbout = document.querySelector('.popup__input_type_about');

//кнопки
export const editProfileButton = document.querySelector('.profile__edit-button');
export const addCardButton = document.querySelector('.profile__add-button');
export const editAvatarButton = document.querySelector('.profile__avatar-button');

// карточки
import arkhyzImage from '../images/arkhyz.jpeg';
import chelyabinskImage from '../images/chelyabinsk-oblast.jpeg';
import ivanovoImage from '../images/ivanovo.jpeg';
import kamchatkaImage from '../images/kamchatka.jpeg';
import kholmogorskyImage from '../images/kholmogorsky-rayon.jpeg';
import baikalImage from '../images/baikal.jpeg';

export const initialCards = [
  {
    name: 'Архыз',
    link: arkhyzImage
  },
  {
    name: 'Челябинская область',
    link: chelyabinskImage
  },
  {
    name: 'Иваново',
    link: ivanovoImage
  },
  {
    name: 'Камчатка',
    link: kamchatkaImage
  },
  {
    name: 'Холмогорский район',
    link: kholmogorskyImage
  },
  {
    name: 'Байкал',
    link: baikalImage
  }
];

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorVisibleClass: 'popup__input-error_visible',
};
