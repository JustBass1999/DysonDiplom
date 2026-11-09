const burgerButton = document.querySelector(".header__burger");
const menu = document.querySelector(".header__menu");
const pageBody = document.querySelector(".page__body");

burgerButton.addEventListener("click", () => {
  menu.classList.toggle("header__menu--open");
  pageBody.classList.toggle("body__lock");
  burgerButton.classList.toggle("burger--open");
  const isOpen = menu.classList.contains("header__menu--open");
  burgerButton.setAttribute("aria-expanded", isOpen);
});

document.addEventListener("click", (event) => {
  if (
    !menu.contains(event.target) &&
    !burgerButton.contains(event.target) &&
    menu.classList.contains("header__menu--open")
  ) {
    menu.classList.remove("header__menu--open");
    burgerButton.classList.remove("burger--open");
    pageBody.classList.remove("body__lock");
    burgerButton.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("click", (event) => {
  if (event.target.closest(".header__menu a") && menu.classList.contains("header__menu--open")) {
    menu.classList.remove("header__menu--open");
    burgerButton.classList.remove("burger--open");
    pageBody.classList.remove("body__lock");
    burgerButton.setAttribute("aria-expanded", "false");
  }
});
