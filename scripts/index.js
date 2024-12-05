const btnOpenPopup = document.querySelector(".information__button");
const popupProfile = document.querySelector(".popup");
const popupContener = document.querySelector(".popup__contener");
const btnClosePopup = document.querySelector(".popup__button--close");
const btnSaveProfile = document.querySelector(".popup__button--save");

const form = document.querySelector(".popup__form");
const profileName = document.querySelector(".information__name");
const profileOccupation = document.querySelector(".information__description");
const inputName = document.querySelector("#pname");
const inputOccupation = document.querySelector("#pabout");

btnOpenPopup.addEventListener("click", function () {
  popupProfile.showModal();
  inputName.value = profileName.textContent;
  inputOccupation.value = profileOccupation.textContent;
});

btnClosePopup.addEventListener("click", function () {
  popupProfile.close();
});

btnSaveProfile.addEventListener("click", profileForSubmit);

function profileForSubmit(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileOccupation.textContent = inputOccupation.value;
  popupProfile.close();
}
/*
form.addEventListener("submit", profileForSubmit, function () {
  popupProfile.close();
});
 */
