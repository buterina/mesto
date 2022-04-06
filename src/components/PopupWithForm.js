import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popup, submitFormHandler) {
    super(popup);
    this._form = this._popup.querySelector('.popup__form');
    this._submitFormHandler = submitFormHandler;
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._buttonElement = this._form.querySelector('.popup__button');
  }

  _getInputValues = () => {
    this._inputValues = {};
    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;

  }

  setInputValues = (data) => {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
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

  renderLoading(isLoading, buttonText = 'Сохранение...') {
    if (isLoading) {
      this._buttonElement.textContent = buttonText;
    } else {
      this._buttonElement.textContent = 'Сохранить'
    }
  }

};
