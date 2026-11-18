"use strict";

const newsSection = document.querySelector(".news__container");
let showMoreNews = null;
let angle = 0;

newsSection.addEventListener("click", (event) => {
  // Предотвращаем переход по ссылке (если это тег <a> с href="#")
  const buttonShowMore = event.target.closest(".news__more-btn");
  if (buttonShowMore) {
      event.preventDefault();
    const mainNews = document.querySelector(".news__list");
    if (!showMoreNews) {
      showMoreNews = mainNews.cloneNode(true);
      mainNews.after(showMoreNews);
      buttonShowMore.querySelector("span").textContent = "Скрыть новости";
      angle += 180;
      buttonShowMore.querySelector("img").style.transform = `rotate(${angle}deg)`;
    } else {
      showMoreNews.remove();
      showMoreNews = null;
      buttonShowMore.querySelector("span").textContent = "Показать ещё";
      angle -= 180;
      buttonShowMore.querySelector("img").style.transform = `rotate(${angle}deg)`;
    }
  }
});
