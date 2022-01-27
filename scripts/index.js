const list = document.querySelector('.cards__gallery');
const cardTemplate = document.querySelector('.card-template').content;

//модалки
const editModal = document.querySelector('.popup_type_edit');
const addCardModal = document.querySelector('.popup_type_add-card');
const photoModal = document.querySelector('.popup_type_photo');
const popupPhoto = document.querySelector('.popup__photo');
const photoCaption = document.querySelector('.popup__caption');
const popups = document.querySelectorAll('.popup');

//формы
const editForm = editModal.querySelector('.popup__form');
const addCardForm = addCardModal.querySelector('.popup__form');

//кнопки
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const closeEditModalButton = editModal.querySelector('.popup__close-button');
const closeAddCardModalButton = addCardModal.querySelector('.popup__close-button');
const closePhotoModalButton = photoModal.querySelector('.popup__close-button');

// инпуты

const inputProfileName = document.querySelector('.popup__input_type_name');
const inputProfileAbout = document.querySelector('.popup__input_type_about');

const inputCardName = document.querySelector('.popup__input_type_card-name');
const inputCardLink = document.querySelector('.popup__input_type_card-link');

const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__bio');

initialCards.forEach(renderCard);

//создать карточку
function createCard(cardData) {

  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__photo');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  likeButton.addEventListener('click', toggleLike);
  deleteButton.addEventListener('click', deleteCard);

  cardImage.addEventListener('click', function () {
    populatePhotoModal(cardData);
    openModal(photoModal);
  });

  return cardElement;
}

//функция лайка
function toggleLike(evt) {
  evt.target.classList.toggle('card__like-button_filled');
}

//удалить карточку
function deleteCard(evt) {
  evt.target.closest('.card').remove();
};

//добавить карточки в галерею
function renderCard(cardData) {
  list.prepend(createCard(cardData));
}

//наполнить фото попап данными
function populatePhotoModal(cardData) {
  photoCaption.textContent = cardData.name;
  popupPhoto.src = cardData.link;
  popupPhoto.alt = cardData.name;
}

function openModal(modal) {
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

  inputCardName.value = '';
  inputCardLink.value = '';

};

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if(!evt.target.closest('.popup__container')) {
      closeModal(popup);
    }
  })
})

editProfileButton.addEventListener('click', function () {
  hideInputError (editModal, inputProfileName);
  hideInputError (editModal, inputProfileAbout);
  populateEditModal();
  openModal(editModal);
});

closeEditModalButton.addEventListener('click', () => closeModal(editModal));

addCardButton.addEventListener('click', () => openModal(addCardModal));

closeAddCardModalButton.addEventListener('click', () => closeModal(addCardModal));

editForm.addEventListener('submit', editProfileSubmitHandler);

addCardForm.addEventListener('submit', addCardSubmitHandler);

closePhotoModalButton.addEventListener('click', () => closeModal(photoModal));


