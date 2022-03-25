import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormHandler) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._submitFormHandler = submitFormHandler;
  }

  _getInputValues = () => {
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._inputValues = {};
    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;

  }

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFormHandler(this._getInputValues());
    });
  }

  close = () => {
    super.close();
    this._form.reset();
  }
};
