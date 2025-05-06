/* export default class Card {
  constructor(name, link, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleLikeButton() {
    this._likeButton = this._element.querySelector(".card__btn-action-like");
    this._likeButtonIcon = this._likeButton.querySelector(".card__icon");
    this._likeButton.addEventListener("click", () => {
      this._currentSrc = this._likeButtonIcon.src;
      this._likeButtonIcon.src = this._currentSrc.includes("heart.svg")
        ? "/images/cards_images/card__icon__heart-active.svg"
        : "/images/cards_images/card__icon__heart.svg";
    });
  }

  _setEventListeners() {
    this._deleteButton = this._element.querySelector(
      ".card__btn-action-remove"
    );
    this._deleteButton.addEventListener("click", this._handleDeleteCard());
  }

  getView() {
    this._element = this._getTemplate();
    this._titleCard = this._element.querySelector(".card__title");
    this._imageCard = this._element.querySelector(".card__image");
    this._altImageCard = this._element.querySelector(".card__image");

    this._titleCard.textContent = this._name;
    this._imageCard.src = this._link;
    this._imageCard = this._name;

    return this._element;
  }


  // Ver imagen de tarjeta en grande
cardsContainer.addEventListener("click", function (event) {
    const clickedElement = event.target;
  
    if (clickedElement.classList.contains("card__image")) {
      const imgSrc = clickedElement.getAttribute("src"); // Obtiene el src original de la imagen de la tarjeta
      const imgTitle = clickedElement
        .closest(".card")
        .querySelector(".card__title").textContent; // Obtiene el título de la imagen
  
      popupImageContent.src = imgSrc; // Asigna el src al popup de la imagen
      popupImageContent.alt = clickedElement.alt; // Asigna el alt al popup
      popupImageTitle.textContent = imgTitle; // Asigna el título al popup
      popupImage.showModal(); // Muestra el popup
    }
  });
   */
/* 
export default class Card {
  constructor(
    name,
    link,
    cardSelector,
    popupImageContent,
    popupImageTitle,
    popupImage
  ) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;

    // popup elementos
    this._popupImageContent = popupImageContent;
    this._popupImageTitle = popupImageTitle;
    this._popupImage = popupImage;
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

  _handleLikeButton = () => {
    this._likeButtonIcon.src = this._likeButtonIcon.src.includes("heart.svg")
      ? "/images/cards_images/card__icon__heart-active.svg"
      : "/images/cards_images/card__icon__heart.svg";
  };

  _handleImageClick = () => {
    this._popupImageContent.src = this._link;
    this._popupImageContent.alt = this._name;
    this._popupImageTitle.textContent = this._name;
    this._popupImage.showModal();
  };

  _setEventListeners() {
    this._deleteButton = this._element.querySelector(
      ".card__btn-action-remove"
    );
    this._deleteButton.addEventListener("click", this._handleDeleteCard);

    this._likeButton = this._element.querySelector(".card__btn-action-like");
    this._likeButtonIcon = this._likeButton.querySelector(".card__icon");
    this._likeButton.addEventListener("click", this._handleLikeButton);

    this._imageCard.addEventListener("click", this._handleImageClick);
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
 */

export default class Card {
  constructor(name, link, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
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
    this._handleLikeButton(); // Activar like también
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
