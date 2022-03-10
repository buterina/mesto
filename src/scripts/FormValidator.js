export class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this._settings = settings;
    this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    this._buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
  }

  _showInputError = (inputElement, errorMessage) => {
    const { errorVisibleClass, inputErrorClass } = this._settings

    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorVisibleClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError = (inputElement) => {
    const { errorVisibleClass, inputErrorClass } = this._settings

    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorVisibleClass);
    errorElement.textContent = '';
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  disableSubmitButton = () => {
    const { inactiveButtonClass } = this._settings;
    this._buttonElement.classList.add(inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  }

  _enableSubmitButton = () => {
    const { inactiveButtonClass } = this._settings;
    this._buttonElement.classList.remove(inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  };

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });

  }

}
