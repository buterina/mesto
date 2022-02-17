import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const list = document.querySelector('.cards__gallery');

//модалки
const editModal = document.querySelector('.popup_type_edit');
const addCardModal = document.querySelector('.popup_type_add-card');
export const photoModal = document.querySelector('.popup_type_photo');
export const popupPhoto = document.querySelector('.popup__photo');
export const photoCaption = document.querySelector('.popup__caption');
const popups = document.querySelectorAll('.popup');


//формы
const editForm = editModal.querySelector('.popup__form');
const addCardForm = addCardModal.querySelector('.popup__form');

//кнопки
const submitCardButton = addCardModal.querySelector('.popup__button');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

// инпуты

const inputProfileName = document.querySelector('.popup__input_type_name');
const inputProfileAbout = document.querySelector('.popup__input_type_about');

const inputCardName = document.querySelector('.popup__input_type_card-name');
const inputCardLink = document.querySelector('.popup__input_type_card-link');

const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__bio');


// карточки
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


//добавить карточки в галерею
function renderCard(data) {
  const card = new Card(data, '#card-template-photo');
  const cardElement = card.getCardElement();
  list.prepend(cardElement);
}

initialCards.forEach(renderCard);


export function openModal(modal) {
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', closeKeyHandler);
}

function closeModal(modal) {
  modal.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeKeyHandler);

}

function closeKeyHandler(evt) {
  if (evt.key === 'Escape') {
    const openedModal = document.querySelector('.popup_opened');
    closeModal(openedModal);
  }
}

function populateEditModal() {
  inputProfileName.value = profileName.textContent;
  inputProfileAbout.value = profileAbout.textContent;
}

function editProfileSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileAbout.textContent = inputProfileAbout.value;
  closeModal(editModal);
}

function addCardSubmitHandler(event) {
  event.preventDefault();

  renderCard({
    name: inputCardName.value,
    link: inputCardLink.value
  });
  closeModal(addCardModal);

  submitCardButton.classList.add('popup__button_disabled');
  submitCardButton.setAttribute('disabled', true);

  inputCardName.value = '';
  inputCardLink.value = '';

};

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (!evt.target.closest('.popup__container')) {
      closeModal(popup);
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closeModal(popup)
    }
  });
});

function clearError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.textContent = '';
};

editProfileButton.addEventListener('click', function () {  //Михаил, я перенесла clearError сюда, т.к. если перенести после сабмита, то ошибки не будут очищаться после закрытия крестиком, оверлеем или esc
  populateEditModal();
  clearError(editModal, inputProfileName);
  clearError(editModal, inputProfileAbout);
  openModal(editModal);

});

addCardButton.addEventListener('click', () => openModal(addCardModal));
editForm.addEventListener('submit', editProfileSubmitHandler);
addCardForm.addEventListener('submit', addCardSubmitHandler);

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
const addCardFormValidator = new FormValidator(config, addCardForm);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
