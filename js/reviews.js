"use strict";

let nextReviewIndex = 0;

const reviewsContainer = document.querySelector(".reviews");
reviewsContainer.addEventListener("click", (event) => {
  // Находим кнопку, по которой кликнули (или её дочерний элемент, если появится иконка)
  const openMorePhotos = event.target.closest(".review-card__more-photos");
  if (openMorePhotos) {
    // Находим карточку отзыва, которой принадлежит эта кнопка
    const reviewCard = openMorePhotos.closest(".review-card");
    const photoGallery = reviewCard.querySelector(".review-card__gallery");
    const photoCollection = reviewCard.querySelector(".review-card__photos");

    if (photoCollection) {
      const newCollection = photoCollection.cloneNode(true);
      photoGallery.insertBefore(newCollection, openMorePhotos);
      // родитель.insertBefore(чтоВставляем, передКемВставляем);

      // ОБЯЗАТЕЛЬНО: заставляем fsLightbox «увидеть» новые элементы
      if (typeof refreshFsLightbox === "function") {
        refreshFsLightbox();
      }
    }
  }
  const openMoreReviews = event.target.closest(".reviews__more-button");
  if (openMoreReviews) {
    const reviewList = document.querySelector(".reviews__list");
    const reviewCards = document.querySelectorAll(".reviews__list .review-card");

    if (reviewCards.length > 0) {
      const cardToClone = reviewCards[nextReviewIndex];
      const clonedCard = cardToClone.cloneNode(true);
      // Уникализируем атрибуты data-fslightbox для клона, чтобы лайтбокс не путал группы картинок (если в отзывах есть фото)
      const clonedLinks = clonedCard.querySelectorAll("a[data-fslightbox]");
      const uniqueGroup = "review-cloned-" + Date.now();
      clonedLinks.forEach((link) => {
        link.setAttribute("data-fslightbox", uniqueGroup);
      });
      reviewList.appendChild(clonedCard);
      // Обновляем лайтбокс, чтобы он «увидел» фотографии в новой карточке
      if (typeof refreshFsLightbox === "function") {
        refreshFsLightbox();
      }

      nextReviewIndex++;
      if (nextReviewIndex >= reviewCards.length) {
        openMoreReviews.classList.add("is-hidden")
      }
    }
  }
});
