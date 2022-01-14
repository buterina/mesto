const list = document.querySelector('.cards__gallery');
const cardTemplate = document.querySelector('.card-template').content;

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

initialCards.forEach(createCard);

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

  function toggleLike() {
    likeButton.classList.toggle('card__like-button_filled')
  }

  function populatePhotoModal() {
    popupPhoto.src = cardImage.src;
    photoCaption.textContent = cardTitle.textContent;
  }

  cardImage.addEventListener('click', function() {
    populatePhotoModal();
    toggleModal(photoModal);
  });


  deleteButton.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', toggleLike);

  list.prepend(cardElement);

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

function toggleModal(modal) {
  modal.classList.toggle('popup_opened');
}

function populateEditModal() {
  inputProfileName.value = profileName.textContent;
  inputProfileAbout.value = profileAbout.textContent;
}

function editProfileSubmitHandler(event) {
  event.preventDefault(); //чтобы не перезагружать страницу
  profileName.textContent = inputProfileName.value;
  profileAbout.textContent = inputProfileAbout.value;
  toggleModal(editModal);
}

function addCardSubmitHandler(event) {
  event.preventDefault();
  createCard({
    name: inputCardName.value,
    link: inputCardLink.value
  });
  toggleModal(addCardModal);
};



editProfileButton.addEventListener('click', function() {
  populateEditModal();
  toggleModal(editModal);
});

closeEditModalButton.addEventListener('click', () => toggleModal(editModal));

addCardButton.addEventListener('click', () => toggleModal(addCardModal));

closeAddCardModalButton.addEventListener('click', () => toggleModal(addCardModal));

editForm.addEventListener('submit', editProfileSubmitHandler);

addCardForm.addEventListener('submit', addCardSubmitHandler);

closePhotoModalButton.addEventListener('click', () => toggleModal(photoModal));


