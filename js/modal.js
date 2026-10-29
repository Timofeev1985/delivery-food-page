const modal = document.querySelector(".modal-auth");

const modalDialog = document.querySelector(".modal-dialog-auth");
document.addEventListener("click", (e) => {
  console.log(e.composedPath());
  if (
    e.target.dataset.toggle == "modal-auth" ||
    e.target.parentNode.dataset.toggle == "modal-auth" ||
    (!e.composedPath().includes(modalDialog) &&
      modal.classList.contains("is-open"))
  ) {
    e.preventDefault();
    modal.classList.toggle("is-open");
  }
  if (
    e.target.dataset.toggle == "modal-cart" ||
    e.target.parentNode.dataset.toggle == "modal-cart" ||
    (!e.composedPath().includes(modalDialog) &&
      modalCart.classList.contains("is-open"))
  ) {
    e.preventDefault();
    modalCart.classList.toggle("is-open");
  }
});
document.addEventListener("keyup", (event) => {
  console.log(event.key);
  if (event.key == "Escape" && modal.classList.contains("is-open")) {
    modal.classList.toggle("is-open");
  }
});
