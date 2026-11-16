"use strict";

// const reviewsList = document.querySelector(".reviews__list");
// const originalImage = document.querySelector(".review-card__photo");
// const imagesContainer = document.querySelector(".review-card__photos");

// reviewsList.addEventListener("click", (event) => {
//   if (event.target.classList.contains("review-card__more-photos")) {
//     const newImage = originalImage.cloneNode(true);
//     imagesContainer.appendChild(newImage);
//   }
// });

// В чем проблема?
// Вы объявили переменные originalImage и imagesContainer в самом верху через глобальный document.querySelector. Это значит, что они навсегда запомнили элементы только из самой первой карточки отзыва.
// Если пользователь кликнет на кнопку «Смотреть все фото» во второй или третьей карточке:
// Клонироваться всё равно будет картинка из первой карточки.
// Новая картинка добавится в контейнер первой карточки, а не той, на которую кликнули.
// Как исправить? (Правильный вариант)
// Нужно находить нужную картинку и контейнер внутри той карточки (.review-card), в которой произошел клик. Для этого отлично подойдет метод .closest():

const reviewsList = document.querySelector(".reviews__list");
reviewsList.addEventListener("click", (event) => {
  // Находим кнопку, по которой кликнули (или её дочерний элемент, если появится иконка)
  const button = event.target.closest(".review-card__more-photos");
  if (button) {
    // Находим карточку отзыва, которой принадлежит эта кнопка
    const reviewCard = button.closest(".review-card");
    const photoGallery = reviewCard.querySelector(".review-card__gallery");
    const photoCollection = reviewCard.querySelector(".review-card__photos");

    if (photoCollection) {
      const newCollection = photoCollection.cloneNode(true);
      photoGallery.insertBefore(newCollection, button);
      // родитель.insertBefore(чтоВставляем, передКемВставляем);
    }
  }
});
