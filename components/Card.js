export default class Card {
  constructor(name, link, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _handleDeleteCard = () => {
    this._element.remove();
  };

  _handleLikeButton() {
    this._likeButton = this._element.querySelector(".card__btn-action-like");
    this._likeButtonIcon = this._likeButton.querySelector(".card__icon");

    this._likeButton.addEventListener("click", () => {
      const isLiked = this._likeButtonIcon.src.includes("heart-active.svg");
      this._likeButtonIcon.src = isLiked
        ? "/images/cards_images/card__icon__heart.svg"
        : "/images/cards_images/card__icon__heart-active.svg";
    });
  }

  _setEventListeners() {
    this._deleteButton = this._element.querySelector(
      ".card__btn-action-remove"
    );
    this._deleteButton.addEventListener("click", this._handleDeleteCard);
    this._handleLikeButton();

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleCardClick({ name: this._name, link: this._link });
      });
  }

  getView() {
    this._element = this._getTemplate();
    this._titleCard = this._element.querySelector(".card__title");
    this._imageCard = this._element.querySelector(".card__image");

    this._titleCard.textContent = this._name;
    this._imageCard.src = this._link;
    this._imageCard.alt = this._name;

    this._setEventListeners();

    return this._element;
  }
}
