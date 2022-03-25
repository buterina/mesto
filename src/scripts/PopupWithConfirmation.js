import { Popup } from "./Popup";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    // this._submitFormHandler = submitFormHandler;
  }

  changeSubmitFormHandler = (newSubmitFormHandler) => {
    this._submitFormHandler = newSubmitFormHandler;
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFormHandler();
    });
  }
};

// //подтвердить удаление
// function confirmDelete() {
//   // console.log('delete!!');
//   api.deleteCard(id)
//   .then(res => {
//     console.log('res', res)
//   })
//   confirmPopup.close();
// }
