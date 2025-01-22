//variables de formulario profile
const btnOpenPopup = document.querySelector(".information__button");
const popupProfile = document.querySelector(".popup--profile");
const btnClosePopup = document.querySelectorAll(".popup__btn_type_close");
const btnSaveProfile = document.querySelector("#popup-profile-btn-save");
const profileName = document.querySelector(".information__name");
const profileOccupation = document.querySelector(".information__description");
const inputProfileName = document.querySelector("#pname");
const inputProfileOccupation = document.querySelector("#pabout");

//variables formulario para añadir cartas
const btnAddCard = document.querySelector(".profile__btn");
const popupAddCard = document.querySelector(".popup--add-card");
const inputCardName = document.querySelector("#ptitle");
const inputCardLink = document.querySelector("#plink");
const btnSaveCard = document.querySelector("#popup-add-card-btn-save");

//Variables para el contendor de tarjetas
const cardsContainer = document.querySelector(".cards");

//Variables de popup Imagen
const popupImage = document.querySelector(".popup--image");
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
  profileName.textContent = inputName.value;
  profileOccupation.textContent = inputOccupation.value;
  popupProfile.close();
});

/* function profileForSubmit(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileOccupation.textContent = inputOccupation.value;
  popupProfile.close();
} */

//Funcion para crear las tarjetas
function createCard(data) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = data.name;
  cardElement.querySelector(".card__image").src = data.link;
  cardElement.querySelector(".card__image").alt = "imagen de paisaje";

  //Eliminar Trajetas
  const btnRemoveCard = cardElement.querySelector(".card__btn-action-remove");
  btnRemoveCard.addEventListener("click", function () {
    cardElement.remove();
  });

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

/* //Es necesario tomar todos los botones despues de que se generen las tarjeta;
const btnRemoveCard = document.querySelectorAll(".card__btn-action-remove");
btnRemoveCard.forEach((btn) => {
  btn.addEventListener("click", function () {
    const cardRemove = btn.closest(".card");
    cardRemove.remove();
  });
});
 */

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
