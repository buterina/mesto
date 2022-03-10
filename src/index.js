import { Card } from "./scripts/Card.js";
import { FormValidator } from "./scripts/FormValidator.js";
import { Section } from "./scripts/Section.js";
import { PopupWithForm } from "./scripts/PopupWithForm.js";
import { PopupWithImage } from "./scripts/PopupWithImage.js";
import { UserInfo } from "./scripts/UserInfo.js";
import './pages/index.css';


const cardListSelector = document.querySelector('.cards__gallery');

//модалки
export const editModal = document.querySelector('.popup_type_edit');
const addCardModal = document.querySelector('.popup_type_add-card');
export const photoModal = document.querySelector('.popup_type_photo');
const popupWithImage = new PopupWithImage(photoModal);
export const profilePopup = new PopupWithForm(editModal, profilePopupSubmitHandler);
const addCardPopup = new PopupWithForm(addCardModal, addCardSubmitHandler);
addCardPopup.setEventListeners();
profilePopup.setEventListeners();

function profilePopupSubmitHandler() {
  userInfo.setUserInfo();
  profilePopup.close();

}

//добавить новую карточку
export function addCardSubmitHandler() {
  const cardElement = createCard({
    name: inputCardName.value,
    link: inputCardLink.value
  });
  cardGallery.addItem(cardElement);
  addCardPopup.close();


  addCardForm.reset();
  addCardFormValidator.disableSubmitButton();
};

//формы
const editForm = editModal.querySelector('.popup__form');
export const addCardForm = addCardModal.querySelector('.popup__form');

//кнопки
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

// инпуты
export const inputProfileName = document.querySelector('.popup__input_type_name');
export const inputProfileAbout = document.querySelector('.popup__input_type_about');
const inputCardName = document.querySelector('.popup__input_type_card-name');
const inputCardLink = document.querySelector('.popup__input_type_card-link');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__bio');

// карточки
import arkhyzImage from './images/arkhyz.jpeg';
import chelyabinskImage from './images/chelyabinsk-oblast.jpeg';
import ivanovoImage from './images/ivanovo.jpeg';
import kamchatkaImage from './images/kamchatka.jpeg';
import kholmogorskyImage from './images/kholmogorsky-rayon.jpeg';
import baikalImage from './images/baikal.jpeg';

const initialCards = [
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


function handleCardClick(name, link) {
  popupWithImage.open(name, link);
  popupWithImage.setEventListeners();
}

//создать карточку
function createCard(item) {
  const card = new Card(item, handleCardClick, '#card-template-photo');

  const cardElement = card.getCardElement();
  return cardElement;

}

//добавить изначальные карточки в галерею
const cardGallery = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardGallery.addItem(cardElement);
  }
}, cardListSelector);

cardGallery.renderItems();

//Профиль
const userInfo = new UserInfo({
  profileNameSelector: profileName,
  profileAboutSelector: profileAbout
});


editProfileButton.addEventListener('click', function () {
  userInfo.getUserInfo();
  editFormValidator.resetValidation();
  profilePopup.open();
});


//валидирование форм
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorVisibleClass: 'popup__input-error_visible',
};

const editFormValidator = new FormValidator(config, editForm);
export const addCardFormValidator = new FormValidator(config, addCardForm);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

addCardButton.addEventListener('click', () => {addCardFormValidator.resetValidation(), addCardPopup.open()});



