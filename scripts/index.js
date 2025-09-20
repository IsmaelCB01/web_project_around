// Importaciones de las clases y funciones
import Card from "../components/Card.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
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
} from "../utils/constants.js";

import api from "../components/Api.js";

// Instancia de UserInfo
const userInfo = new UserInfo({
  nameSelector: ".information__name",
  workSelector: ".information__description",
});

//Instancia de PopupWithImage
const popupWithImage = new PopupWithImage(".popup-image");
popupWithImage.setEventListeners();

// Instancia de PopupWithForm para editar perfil
const popupEditProfile = new PopupWithForm(
  ".popup-profile",
  (formData, submitButton) => {
    const originalText = submitButton.textContent;
    submitButton.textContent = "Guardando...";
    api
      .setUserInfo({ name: formData.pname, about: formData.pabout })
      .then((userData) => {
        userInfo.setUserInfo({
          name: userData.name,
          work: userData.about,
        });
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log("Error al actualizar perfil:", err);
      })
      .finally(() => {
        submitButton.textContent = originalText;
      });
  }
);
popupEditProfile.setEventListeners();

// Instancia de PopupWithForm para añadir una tarjeta
const popupAddCard = new PopupWithForm(
  ".popup-add-card",
  (formData, submitButton) => {
    const originalText = submitButton.textContent;
    submitButton.textContent = "Guardando...";
    api
      .addCard({ name: formData.name, link: formData.link })
      .then((cardData) => {
        const newCard = createCard(cardData);
        section.addItem(newCard);
        popupAddCard.close();
      })
      .catch((err) => {
        console.log("Error al añadir tarjeta:", err);
      })
      .finally(() => {
        submitButton.textContent = originalText;
      });
  }
);
popupAddCard.setEventListeners();

// Instancia de PopupWithForm para actualizar avatar
const popupAvatar = new PopupWithForm(
  ".popup-type-change-profile",
  (formData, submitButton) => {
    const originalText = submitButton.textContent;
    submitButton.textContent = "Guardando...";
    api
      .setUserAvatar({ avatar: formData.photourl })
      .then((userData) => {
        userInfo.setUserInfo({
          name: userData.name,
          work: userData.about,
        });
        // Actualiza el avatar en la interfaz si tienes un método para ello
        const avatarImg = document.querySelector(".information__avatar");
        if (avatarImg) avatarImg.src = userData.avatar;
        popupAvatar.close();
      })
      .catch((err) => {
        console.log("Error al actualizar avatar:", err);
      })
      .finally(() => {
        submitButton.textContent = originalText;
      });
  }
);
popupAvatar.setEventListeners();

let userId = null;

// Instancia de PopupWithConfirmation para eliminar tarjeta
const popupDeleteCard = new PopupWithConfirmation(
  ".popup-type-deleate-image",
  () => {
    if (popupDeleteCard.cardIdToDelete && popupDeleteCard.cardElementToDelete) {
      api
        .deleteCard(popupDeleteCard.cardIdToDelete)
        .then(() => {
          popupDeleteCard.cardElementToDelete.remove();
          popupDeleteCard.close();
        })
        .catch((err) => {
          console.log("Error al eliminar tarjeta:", err);
        });
    }
  }
);
popupDeleteCard.setEventListeners();

// Instancia de Section para manejar las tarjetas
const section = new Section(
  {
    items: [], // Se llenará después de obtener las tarjetas
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      section.addItem(cardElement);
    },
  },
  ".cards__container"
);

// Cargar datos de usuario y tarjetas desde el servidor
api
  .getAppInfo()
  .then(([userData, cards]) => {
    userInfo.setUserInfo({
      name: userData.name,
      work: userData.about,
    });
    userId = userData._id;
    // Renderizar tarjetas desde el servidor
    cards.reverse().forEach((cardData) => {
      const cardElement = createCard(cardData);
      section.addItem(cardElement);
    });
  })
  .catch((err) => {
    console.log("Error al cargar datos iniciales:", err);
  });

//Función para crear tarjetas
function createCard(data) {
  const card = new Card({
    name: data.name,
    link: data.link,
    cardSelector: "#card-template",
    handleCardClick: ({ name: imageTitle, link: imageSrc }) => {
      popupWithImage.open(imageTitle, imageSrc);
    },
    cardId: data._id,
    ownerId:
      data.owner &&
      (typeof data.owner === "object" ? data.owner._id : data.owner),
    userId: userId,
    isLiked:
      Array.isArray(data.likes) && userId
        ? data.likes.some((like) => like._id === userId)
        : false,
    likes: data.likes || [],
    handleDeleteClick: (cardId, cardElement) => {
      popupDeleteCard.cardIdToDelete = cardId;
      popupDeleteCard.cardElementToDelete = cardElement;
      popupDeleteCard.open();
    },
  });
  return card.getView();
}

//Abrir popup para editar perfil
btnOpenFormProfile.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  inputProfileName.value = userData.name;
  inputProfileOccupation.value = userData.work;
  popupEditProfile.open();
});

// El guardado de perfil ahora se maneja en PopupWithForm y la API
// Abrir popup para actualizar avatar
const profileImage = document.querySelector(".profile__image");
if (profileImage) {
  profileImage.addEventListener("click", () => {
    popupAvatar.open();
  });
}

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
