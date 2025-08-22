import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector(".popup__img");
    this._titleElement = this._popupElement.querySelector(
      ".popup__title-image"
    );
  }

  open(imageTitle, imageSrc) {
    this._imageElement.src = imageSrc;
    this._imageElement.alt = imageTitle;
    this._titleElement.textContent = imageTitle;
    super.open();
  }
}
