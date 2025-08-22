export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.showModal();
    this._handleEscClose();
  }

  close() {
    this._popupElement.close();
    this._popupElement.removeEventListener("keydown", this._escHandler);
  }

  _handleEscClose() {
    this._escHandler = (event) => {
      if (event.key === "Escape") {
        this.close();
      }
    };
    this._popupElement.addEventListener("keydown", this._escHandler);
  }

  setEventListeners() {
    this._btnCloseHandler = this._popupElement.querySelector(
      ".popup__btn_type_close"
    );
    if (this._btnCloseHandler) {
      this._btnCloseHandler.addEventListener("click", () => {
        this.close();
      });
    }

    //Revisar la funcion para cerrar el exterior del popup
    this._popupElement.addEventListener("click", (event) => {
      if (event.target === this._popupElement) {
        this.close();
      }
    });
  }
}
