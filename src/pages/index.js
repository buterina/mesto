import { Card } from "../scripts/Card.js";
import { FormValidator } from "../scripts/FormValidator.js";
import { Section } from "../scripts/Section.js";
import { PopupWithForm } from "../scripts/PopupWithForm.js";
import { PopupWithImage } from "../scripts/PopupWithImage.js";
import { UserInfo } from "../scripts/UserInfo.js";
import {
  inputCardName, inputCardLink, profileName, profileAbout, cardListSelector, initialCards, editProfileButton,
  addCardButton, addCardModal, editModal, photoModal, inputProfileName, inputProfileAbout, editForm, addCardForm, config
} from "../utils/constants.js";
import './index.css';

//попапы
export const profilePopup = new PopupWithForm(editModal, profilePopupSubmitHandler);
const popupWithImage = new PopupWithImage(photoModal);
const addCardPopup = new PopupWithForm(addCardModal, addCardSubmitHandler);

//обновить профиль
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


function handleCardClick(name, link) {
  popupWithImage.open(name, link);
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
  const { name, about } = userInfo.getUserInfo();
  editFormValidator.resetValidation();
  inputProfileName.value = name;
  inputProfileAbout.value = about;
  profilePopup.open();
});


//валидирование форм

const editFormValidator = new FormValidator(config, editForm);
export const addCardFormValidator = new FormValidator(config, addCardForm);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

//слушатели
addCardPopup.setEventListeners();
profilePopup.setEventListeners();
popupWithImage.setEventListeners();
addCardButton.addEventListener('click', () => { addCardFormValidator.resetValidation(), addCardPopup.open() });



