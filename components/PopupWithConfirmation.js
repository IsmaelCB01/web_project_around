import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);
    this._handleConfirm = handleConfirm;
  }

  setEventListeners() {
    super.setEventListeners();
    const confirmBtn = this._popupElement.querySelector(
      ".popup__btn-type-confirm"
    );
    if (confirmBtn) {
      confirmBtn.addEventListener("click", (event) => {
        event.preventDefault();
        this._handleConfirm();
      });
    }
  }
}
