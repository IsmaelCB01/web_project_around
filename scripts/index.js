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
