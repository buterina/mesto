import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  inputCardName, inputCardLink, profileName, profileAvatar, profileAbout, cardListSelector, initialCards, editProfileButton, editAvatarButton, changeAvatarForm,
  addCardButton, addCardModal, editModal, photoModal, inputProfileName, inputProfileAbout, editForm, addCardForm, confirmDeleteModal, changeAvatarModal, config
} from "../utils/constants.js";
import "./index.css";
import { api } from "../components/Api.js"

let userId;

Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([userData, cardListData]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData.name, userData.about, userData.avatar);
    cardListData.forEach(data => {
      const cardElement = createCard({
        name: data.name,
        link: data.link,
        likes: data.likes,
        id: data._id,
        userId: userId,
        ownerId: data.owner._id
      })
      cardGallery.addItem(cardElement);
    });
  });

// api.getProfile()
//   .then(res => {
//     console.log('ответ', res)
//     userInfo.setUserInfo(res.name, res.about, res.avatar);

//     userId = res._id;
//   })

// api.getInitialCards()
//   .then(cardList => {
//     cardList.forEach(data => {
//       const cardElement = createCard({
//         name: data.name,
//         link: data.link,
//         likes: data.likes,
//         id: data._id,
//         userId: userId,
//         ownerId: data.owner._id
//       })
//       cardGallery.addItem(cardElement);
//     })
//   })



//попапы
export const profilePopup = new PopupWithForm(editModal, profilePopupSubmitHandler);
const popupWithImage = new PopupWithImage(photoModal);
const addCardPopup = new PopupWithForm(addCardModal, addCardSubmitHandler);
const confirmPopup = new PopupWithConfirmation(confirmDeleteModal);

const avatarPopup = new PopupWithForm(changeAvatarModal, (data) => {

  const { name, about, avatar } = data;
  avatarPopup.renderLoading(true);

  api.updateAvatar(avatar)
    .then(res => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
      avatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarPopup.renderLoading(false);
    })
})


//обновить профиль
function profilePopupSubmitHandler(data) {
  const { name, about, avatar } = data;
  profilePopup.renderLoading(true);

  api.editProfile(name, about, avatar)
    .then(res => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
      profilePopup.close()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profilePopup.renderLoading(false);
    })

}

//добавить новую карточку
export function addCardSubmitHandler() {

  addCardPopup.renderLoading(true)

  api.addCard(inputCardName.value, inputCardLink.value)
    .then(res => {
      console.log('res', res)
      const cardElement = createCard({
        name: res.name,
        link: res.link,
        likes: res.likes,
        id: res._id,
        userId: userId,
        ownerId: res.owner._id
      });
      cardGallery.addItem(cardElement)
      addCardPopup.close();
      addCardFormValidator.disableSubmitButton();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addCardPopup.renderLoading(false);
    })

};


function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

//создать карточку
function createCard(item) {
  const card = new Card(item, '#card-template-photo', handleCardClick,
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
      } else {
        api.addLike(id)
          .then((res) => {
            card.setLikes(res.likes)
          })
      }
    }
  );

  const cardElement = card.getCardElement();
  return cardElement;

}

// function handleDeleteClick(id)

//добавить изначальные карточки в галерею
const cardGallery = new Section({
  items: [],
  renderer: (item) => {
    const cardElement = createCard(item);
    cardGallery.addItem(cardElement);
  }
}, cardListSelector);

cardGallery.renderItems();

//Профиль

const userInfo = new UserInfo({
  profileNameSelector: profileName,
  profileAboutSelector: profileAbout,
  profileAvatarSelector: profileAvatar
});

//Редактировать профиль

editProfileButton.addEventListener('click', function () {
  const { name, about } = userInfo.getUserInfo();
  editFormValidator.resetValidation();
  inputProfileName.value = name;
  inputProfileAbout.value = about;
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
addCardButton.addEventListener('click', () => { addCardFormValidator.resetValidation(), addCardPopup.open() });
avatarPopup.setEventListeners();



