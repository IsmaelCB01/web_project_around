import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const formValues = {};
    const inputs = this._popupElement.querySelectorAll(".form__input");
    inputs.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  close() {
    super.close();
    this._popupElement.querySelector(".popup__form").reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
