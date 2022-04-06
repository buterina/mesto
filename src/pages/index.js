import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  profileName, profileAvatar, profileAbout, cardListSelector, editProfileButton, editAvatarButton, changeAvatarForm,
  addCardButton, addCardModal, editModal, photoModal, editForm, addCardForm, confirmDeleteModal, changeAvatarModal, config
} from "../utils/constants.js";
import "./index.css";
import { api } from "../components/Api.js"

let userId;

Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([userData, cardListData]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    cardGallery.renderItems(cardListData);
  })
  .catch((err) => {
    console.log(err);
  });


//попапы
export const profilePopup = new PopupWithForm(editModal, handleSubmitProfile);
const popupWithImage = new PopupWithImage(photoModal);
const addCardPopup = new PopupWithForm(addCardModal, handleSubmitCard);
const confirmPopup = new PopupWithConfirmation(confirmDeleteModal);
const avatarPopup = new PopupWithForm(changeAvatarModal, handleSubmitAvatar)

//добавить новую карточку
function handleSubmitCard(data) {
  addCardPopup.renderLoading(true)

  api.addCard(data.place, data.link)
    .then(res => {
      console.log('res', res)
      cardGallery.addItem(createCard(res))
      addCardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addCardPopup.renderLoading(false);
    });
};

//обновить аватар
function handleSubmitAvatar(data) {
  const { avatar } = data;
  avatarPopup.renderLoading(true);

  api.updateAvatar(avatar)
    .then(res => {
      userInfo.setUserInfo(res);
      avatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarPopup.renderLoading(false);
    })
}


//обновить профиль
function handleSubmitProfile(data) {
  const { name, about } = data;
  profilePopup.renderLoading(true);

  api.editProfile(name, about)
    .then(res => {
      userInfo.setUserInfo(res);
      profilePopup.close()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profilePopup.renderLoading(false);
    })

}

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

//создать карточку
function createCard(data) {
  const card = new Card(
    {
      name: data.name,
      link: data.link,
      likes: data.likes,
      id: data._id,
      userId: userId,
      ownerId: data.owner._id
    },
    '#card-template-photo',
    handleCardClick,
    (id) => {
      confirmPopup.open();
      confirmPopup.changeSubmitFormHandler(() => {
        api.deleteCard(id)
          .then(() => {
            card.deleteCard();
            confirmPopup.close();
          })
          .catch((err) => {
            console.log(err);
          })
      })
    },
    (id) => {
      if (card.isLiked()) {
        api.deleteLike(id)
          .then((res) => {
            card.setLikes(res.likes)
          })
          .catch((err) => {
            console.log(err);
          })
      } else {
        api.addLike(id)
          .then((res) => {
            card.setLikes(res.likes)
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }
  );

  const cardElement = card.getCardElement();
  return cardElement;

}

//создать галерею
const cardGallery = new Section({
  renderer: (cardData) => {
    cardGallery.addItem(createCard(cardData));
  },
  container: cardListSelector
});

//Профиль
const userInfo = new UserInfo({
  profileName: profileName,
  profileAbout: profileAbout,
  profileAvatar: profileAvatar
});

//Редактировать профиль
editProfileButton.addEventListener('click', function () {
  editFormValidator.resetValidation();
  profilePopup.setInputValues(userInfo.getUserInfo());
  profilePopup.open();
});

editAvatarButton.addEventListener('click', function () {
  changeAvatarValidator.resetValidation();
  avatarPopup.open();
});


//валидирование форм



const editFormValidator = new FormValidator(config, editForm);
export const addCardFormValidator = new FormValidator(config, addCardForm);
const changeAvatarValidator = new FormValidator(config, changeAvatarForm);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
changeAvatarValidator.enableValidation();

//слушатели
addCardPopup.setEventListeners();
profilePopup.setEventListeners();
popupWithImage.setEventListeners();
confirmPopup.setEventListeners();
addCardButton.addEventListener('click', () => {
  addCardFormValidator.resetValidation();
  addCardPopup.open()
});
avatarPopup.setEventListeners();



