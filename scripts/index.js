/* import { settings } from "./validate.js";

//variables de formulario profile
const btnOpenPopup = document.querySelector(".information__button");
const popupProfile = document.querySelector(".popup-profile");
const btnClosePopup = document.querySelectorAll(".popup__btn_type_close");
const btnSaveProfile = document.querySelector("#popup-profile-btn-save");
const profileName = document.querySelector(".information__name");
const profileOccupation = document.querySelector(".information__description");
const inputProfileName = document.querySelector("#input-name");
const inputProfileOccupation = document.querySelector("#input-about");

//variables formulario para añadir cartas
const btnAddCard = document.querySelector("#btn-add-card");
const popupAddCard = document.querySelector(".popup-add-card");
const inputCardName = document.querySelector("#input-place");
const inputCardLink = document.querySelector("#input-url");
const btnSaveCard = document.querySelector("#popup-add-card-btn-save");

//Variables para el contendor de tarjetas
const cardsContainer = document.querySelector(".cards");

//Variables de popup Imagen
const popupImage = document.querySelector(".popup-image");
const popupImageContent = document.querySelector(".popup__img");
const popupImageTitle = document.querySelector(".popup__title-image");

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

let userCards = [];

//Abrir formulario de informacion de perfil
btnOpenPopup.addEventListener("click", function () {
  popupProfile.showModal();
  inputProfileName.value = profileName.textContent;
  inputProfileOccupation.value = profileOccupation.textContent; 
});

//Cerrar los formularios
btnClosePopup.forEach((btn) => {
  btn.addEventListener("click", function () {
    popupProfile.close();
    popupAddCard.close();
    popupImage.close();
  });
});

//Guardar informacion de perfil
btnSaveProfile.addEventListener("click", function (event) {
  event.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileOccupation.textContent = inputProfileOccupation.value;
  popupProfile.close();
});

//Funcion para crear las tarjetas
function createCard(data) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = data.name;
  cardElement.querySelector(".card__image").src = data.link;
  cardElement.querySelector(".card__image").alt = data.name;

  //Eliminar Tarjetas
  const btnRemoveCard = cardElement.querySelector(".card__btn-action-remove");
  btnRemoveCard.addEventListener("click", function () {
    cardElement.remove();
  });

  //Darle me gusta a una tarjeta
  const likeButton = cardElement.querySelector(".card__btn-action-like");
  const likeIcon = likeButton.querySelector(".card__icon");
  likeButton.addEventListener("click", function () {
    const currentSrc = likeIcon.src;
    likeIcon.src = currentSrc.includes("heart.svg")
      ? "/images/cards_images/card__icon__heart-active.svg"
      : "/images/cards_images/card__icon__heart.svg";
  });

  return cardElement;
}

//Generar tarjetas
initialCards.forEach((card) => {
  cardsContainer.append(createCard(card));
});

//Abrir formulario de agregar tarjetas
btnAddCard.addEventListener("click", function () {
  popupAddCard.showModal();
});

//Generar tarjeta nueva a partir de formulario anadir tarjeta
btnSaveCard.addEventListener("click", function (event) {
  event.preventDefault();
  const title = inputCardName.value;
  const link = inputCardLink.value;

  if (title && link) {
    const newCard = { name: title, link: link };
    userCards.push(newCard); // Añadir al array existente
    cardsContainer.prepend(createCard(newCard)); // Añadir al DOM
    inputCardName.value = ""; // Limpiar el campo de entrada
    inputCardLink.value = ""; // Limpiar el campo de entrada
  } else {
    alert("Por favor, complete ambos campos.");
  }
  popupAddCard.close();
});

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

// Función para cerrar popup cuando se presiona la tecla Escape
function closePopupWithEsc(event) {
  if (event.key === "Escape") {
    const openPopup = document.querySelector("dialog[open]");
    if (openPopup) {
      openPopup.close();
    }
  }
}

// Función para cerrar popup al hacer clic fuera del contenido
function closePopupOnClickOutside(event) {
  if (event.target === event.currentTarget) {
    event.target.close();
  }
}

// Agregar eventos globales
document.addEventListener("keydown", closePopupWithEsc);

// Seleccionar todos los popups y agregar eventos
const popups = document.querySelectorAll("dialog");
popups.forEach((popup) => {
  popup.addEventListener("click", closePopupOnClickOutside);
}); */

// Importaciones de las clases y funciones
import Card from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { closePopupWithEsc, closePopupOnClickOutside } from "./utils.js";
import { settings } from "./FormValidator.js";

// Variables de formulario de perfil
const btnOpenPopup = document.querySelector(".information__button");
const popupProfile = document.querySelector(".popup-profile");
const btnClosePopup = document.querySelectorAll(".popup__btn_type_close");
const btnSaveProfile = document.querySelector("#popup-profile-btn-save");
const profileName = document.querySelector(".information__name");
const profileOccupation = document.querySelector(".information__description");
const inputProfileName = document.querySelector("#input-name");
const inputProfileOccupation = document.querySelector("#input-about");

// Variables formulario para añadir cartas
const btnAddCard = document.querySelector("#btn-add-card");
const popupAddCard = document.querySelector(".popup-add-card");
const inputCardName = document.querySelector("#input-place");
const inputCardLink = document.querySelector("#input-url");
const btnSaveCard = document.querySelector("#popup-add-card-btn-save");

// Variables para el contenedor de tarjetas
const cardsContainer = document.querySelector(".cards");

// Variables de popup de imagen
const popupImage = document.querySelector(".popup-image");
const popupImageContent = document.querySelector(".popup__img");
const popupImageTitle = document.querySelector(".popup__title-image");

// Inicializar las tarjetas predeterminadas
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

// Función para crear nuevas tarjetas
function createCard(data) {
  const card = new Card(
    data.name,
    data.link,
    "#card-template",
    popupImageContent,
    popupImageTitle,
    popupImage
  );
  return card.getView();
}

// Generar tarjetas iniciales
initialCards.forEach((cardData) => {
  cardsContainer.append(createCard(cardData));
});

// Abrir popup para editar perfil
btnOpenPopup.addEventListener("click", () => {
  popupProfile.showModal();
  inputProfileName.value = profileName.textContent;
  inputProfileOccupation.value = profileOccupation.textContent;
});

// Cerrar formularios
btnClosePopup.forEach((btn) => {
  btn.addEventListener("click", () => {
    popupProfile.close();
    popupAddCard.close();
    popupImage.close();
  });
});

// Guardar cambios de perfil
btnSaveProfile.addEventListener("click", (event) => {
  event.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileOccupation.textContent = inputProfileOccupation.value;
  popupProfile.close();
});

//Abrir formulario de lugares
btnAddCard.addEventListener("click", () => {
  popupAddCard.showModal();
  inputCardName.value = "";
  inputCardLink.value = "";
});

// Función para generar nueva tarjeta a partir del formulario
btnSaveCard.addEventListener("click", (event) => {
  event.preventDefault();
  const title = inputCardName.value;
  const link = inputCardLink.value;

  if (title && link) {
    const newCardData = { name: title, link: link };
    cardsContainer.prepend(createCard(newCardData)); // Añadir la nueva tarjeta al DOM
    inputCardName.value = "";
    inputCardLink.value = "";
  } else {
    alert("Por favor, complete ambos campos.");
  }
  popupAddCard.close();
});

// Ver imagen de tarjeta en grande
cardsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("card__image")) {
    const clickedImage = event.target;
    const imgSrc = clickedImage.getAttribute("src");
    const imgTitle = clickedImage
      .closest(".card")
      .querySelector(".card__title").textContent;

    popupImageContent.src = imgSrc;
    popupImageContent.alt = imgTitle;
    popupImageTitle.textContent = imgTitle;
    popupImage.showModal();
  }
});

// Agregar eventos globales para cerrar popups
document.addEventListener("keydown", closePopupWithEsc);
document.querySelectorAll("dialog").forEach((popup) => {
  popup.addEventListener("click", closePopupOnClickOutside);
});

// Inicializar la validación de formularios
document.addEventListener("DOMContentLoaded", () => {
  const formProfileValidator = new FormValidator(
    settings,
    document.querySelector("#form-profile")
  );
  const formPlaceValidator = new FormValidator(
    settings,
    document.querySelector("#form-place")
  );
  formProfileValidator.enableValidation();
  formPlaceValidator.enableValidation();
});
