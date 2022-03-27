import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popupPhoto = this._popup.querySelector('.popup__photo');
    this._photoCaption = this._popup.querySelector('.popup__caption');
  }

  open(name, link) {
    this._photoCaption.textContent = name;
    this._popupPhoto.src = link;
    this._popupPhoto.alt = name;
    super.open();
  };
}


