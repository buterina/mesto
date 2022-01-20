const list = document.querySelector('.cards__gallery');
const cardTemplate = document.querySelector('.card-template').content;

initialCards.forEach(renderCard);

//удалить карточку
function deleteCard(evt) {
  evt.target.closest('.card').remove();
};

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

  likeButton.addEventListener('click', () => { likeButton.classList.toggle('card__like-button_filled') });
  deleteButton.addEventListener('click', deleteCard);

  //клик по фотографии
  cardImage.addEventListener('click', function () {
    populatePhotoModal(cardData);
    openModal(photoModal);
  });

  return cardElement;
}

//функция лайка
function toggleLike() {
  likeButton.classList.toggle('card__like-button_filled')
}

//добавить карточки в галерею
function renderCard(cardData) {
  const card = createCard(cardData)
  list.prepend(card);
}

//наполнить фото попап данными
function populatePhotoModal(cardData) {
  photoCaption.textContent = cardData.name;
  popupPhoto.src = cardData.link;
  popupPhoto.alt = cardData.name;
}


//модалки
const editModal = document.querySelector('.popup_type_edit');
const addCardModal = document.querySelector('.popup_type_add-card');
const photoModal = document.querySelector('.popup_type_photo');

const popupPhoto = document.querySelector('.popup__photo');
const photoCaption = document.querySelector('.popup__caption');

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

function openModal(modal) {
  modal.classList.add('popup_opened');
}

function closeModal(modal) {
  modal.classList.remove('popup_opened');
}

function populateEditModal() {
  inputProfileName.value = profileName.textContent;
  inputProfileAbout.value = profileAbout.textContent;
}

function editProfileSubmitHandler(event) {
  event.preventDefault(); //чтобы не перезагружать страницу
  profileName.textContent = inputProfileName.value;
  profileAbout.textContent = inputProfileAbout.value;
  closeModal(editModal);
}

function addCardSubmitHandler(event) {
  event.preventDefault();
  createCard({
    name: inputCardName.value,
    link: inputCardLink.value
  });
  closeModal(addCardModal);

  inputCardName.value = inputCardName.defaultValue;
  inputCardLink.value = inputCardLink.defaultValue;

};



editProfileButton.addEventListener('click', function () {
  populateEditModal();
  openModal(editModal);
});

closeEditModalButton.addEventListener('click', () => closeModal(editModal));

addCardButton.addEventListener('click', () => openModal(addCardModal));

closeAddCardModalButton.addEventListener('click', () => closeModal(addCardModal));

editForm.addEventListener('submit', editProfileSubmitHandler);

addCardForm.addEventListener('submit', addCardSubmitHandler);

closePhotoModalButton.addEventListener('click', () => closeModal(photoModal));


