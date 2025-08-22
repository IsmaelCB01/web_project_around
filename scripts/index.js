// Importaciones de las clases y funciones
import Card from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Sections.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { settings } from "../components/FormValidator.js";

import {
  btnOpenFormProfile,
  btnAddCard,
  inputProfileName,
  inputProfileOccupation,
  initialCards,
  btnSaveProfile,
} from "../utils/constants.js";

// Instancia de UserInfo
const userInfo = new UserInfo({
  nameSelector: ".information__name",
  workSelector: ".information__description",
});

userInfo.setUserInfo({
  name: "Ismael CB",
  work: "Desarrollador Microsoft CRM 365",
});

//Instancia de PopupWithImage
const popupWithImage = new PopupWithImage(".popup-image");
popupWithImage.setEventListeners();

// **3. Instancia de PopupWithForm para editar perfil**
const popupEditProfile = new PopupWithForm(".popup-profile", (formData) => {
  userInfo.setUserInfo({
    name: formData.name,
    work: formData.work,
  });
  popupEditProfile.close();
});
popupEditProfile.setEventListeners();

//Instancia de PopupWithForm para añadir una tarjeta
const popupAddCard = new PopupWithForm(".popup-add-card", (formData) => {
  console.log("Datos del formulario:", formData); // Depura los datos del formulario
  const newCard = createCard({ name: formData.name, link: formData.link });
  section.addItem(newCard); // Añade la nueva tarjeta al contenedor
  popupAddCard.close();
});
popupAddCard.setEventListeners();

//Instancia de Section para manejar las tarjetas
const section = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      section.addItem(cardElement);
    },
  },
  ".cards__container"
);
section.renderer(); // Renderiza las tarjetas iniciales

//Función para crear tarjetas
function createCard(data) {
  const card = new Card(
    data.name,
    data.link,
    "#card-template",
    ({ name: imageTitle, link: imageSrc }) => {
      console.log("imageSrc:", imageSrc); // Depura el valor de imageSrc
      console.log("imageTitle:", imageTitle); // Depura el valor de imageTitle
      popupWithImage.open(imageTitle, imageSrc);
    }
  );
  return card.getView();
}

//Abrir popup para editar perfil
btnOpenFormProfile.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  inputProfileName.value = userData.name;
  inputProfileOccupation.value = userData.work;
  popupEditProfile.open();
});

//Guardar cambios de perfil
btnSaveProfile.addEventListener("click", (event) => {
  event.preventDefault();
  // Actualiza la información del usuario utilizando UserInfo
  userInfo.setUserInfo({
    name: inputProfileName.value,
    work: inputProfileOccupation.value,
  });
  // Cierra el popup
  popupEditProfile.close();
});

//Abrir popup para añadir tarjeta
btnAddCard.addEventListener("click", () => {
  popupAddCard.open();
});

//Inicializar la validación de formularios
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
