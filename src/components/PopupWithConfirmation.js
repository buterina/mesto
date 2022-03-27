import { Popup } from "./Popup";

export class PopupWithConfirmation extends Popup {
  constructor(popup) {
    super(popup);
    this._form = this._popup.querySelector('.popup__form');
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

