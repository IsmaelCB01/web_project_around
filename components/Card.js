import api from "./Api.js";

export default class Card {
  constructor({
    name,
    link,
    cardSelector,
    handleCardClick,
    cardId,
    ownerId,
    userId,
    isLiked,
    likes,
    handleDeleteClick,
  }) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._cardId = cardId;
    this._ownerId = ownerId;
    this._userId = userId;
    this._isLiked = isLiked;
    this._likes = likes || [];
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _updateLikeView(isLiked, likesCount) {
    this._likeButtonIcon.src = isLiked
      ? "./images/cards_images/card__icon__heart-active.svg"
      : "./images/cards_images/card__icon__heart.svg";
    if (this._likeCountElem) {
      this._likeCountElem.textContent = likesCount;
    }
  }

  _handleLikeButton() {
    this._likeButton = this._element.querySelector(".card__btn-action-like");
    this._likeButtonIcon = this._likeButton.querySelector(".card__icon");
    this._likeCountElem = this._element.querySelector(".card__like-count");
    this._updateLikeView(this._isLiked, this._likes.length);

    this._likeButton.addEventListener("click", () => {
      if (!this._isLiked) {
        api
          .likeCard(this._cardId)
          .then((data) => {
            this._isLiked = true;
            this._likes = Array.isArray(data.likes) ? data.likes : [];
            this._updateLikeView(true, this._likes.length);
          })
          .catch((err) => console.log("Error al dar like:", err));
      } else {
        api
          .unlikeCard(this._cardId)
          .then((data) => {
            this._isLiked = false;
            this._likes = Array.isArray(data.likes) ? data.likes : [];
            this._updateLikeView(false, this._likes.length);
          })
          .catch((err) => console.log("Error al quitar like:", err));
      }
    });
  }

  _setEventListeners() {
    this._deleteButton = this._element.querySelector(
      ".card__btn-action-remove"
    );
    // Corregir ícono de basura
    const trashIcon = this._deleteButton.querySelector(".card__icon");
    if (trashIcon) {
      trashIcon.src = "./images/cards_images/card__icon__trash.svg";
    }
    this._deleteButton.addEventListener("click", () => {
      if (this._handleDeleteClick) {
        this._handleDeleteClick(this._cardId, this._element);
      }
    });
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
