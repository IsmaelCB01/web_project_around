export function closePopupWithEsc(event) {
  if (event.key === "Escape") {
    const openPopup = document.querySelector("dialog[open]");
    if (openPopup) {
      openPopup.close();
    }
  }
}

export function closePopupOnClickOutside(event) {
  if (event.target === event.currentTarget) {
    event.target.close();
  }
}
