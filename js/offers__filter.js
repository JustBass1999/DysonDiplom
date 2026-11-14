const filter = document.getElementById("sortSelect");
const trigger = filter.querySelector(".offers__filter-button");
const options = filter.querySelectorAll(".offers__filter-option");
const selectedMenu = filter.querySelector(".offers__filter-text");

//

// Открытие/закрытие по клику на шапку
trigger.addEventListener("click", () => {
  filter.classList.toggle("offers__filter_open");
});

// Выбор элемента
options.forEach((option) => {
  option.addEventListener("click", () => {
    // Убираем модификатор выбранного у всех, добавляем нужному
    options.forEach((opt) => opt.classList.remove("offers__filter-option--selected"));
    option.classList.add("offers__filter-option--selected");

    // Меняем текст в шапке
    selectedMenu.textContent = option.querySelector("span").textContent;

    // Закрываем список (удаляем модификатор _open)
    filter.classList.remove("offers__filter_open");

    // Получаем значение
    const selectedValue = option.getAttribute("data-value");
    console.log("Выбрано значение:", selectedValue);
  });
});

// Закрытие при клике вне компонента
document.addEventListener("click", (e) => {
  if (!filter.contains(e.target)) {
    filter.classList.remove("offers__filter_open");
  }
});

// Логика сортировки карточек как у табов через выпадающий список

// СОРТИИРОВКА ДЕШЕВЫЕ/ДОРОГИЕ

const items = document.querySelectorAll(".offers__list-item");
const itemList = document.querySelector(".offers__list");

options.forEach((option) => {
  option.addEventListener("click", () => {
    if (option.textContent.includes("дешёвые")) {
      const itemsArray = Array.from(items);
      const sortedItems = itemsArray.sort((a, b) => {
        const priceA = Number(a.querySelector(".offers__last-price").getAttribute("data-price"));
        const priceB = Number(b.querySelector(".offers__last-price").getAttribute("data-price"));
        return priceA - priceB;
      });
      itemList.append(...sortedItems);
    } else if (option.textContent.includes("дорогие")) {
      const itemsArray = Array.from(items);
      const sortedItems = itemsArray.sort((a, b) => {
        const priceA = Number(a.querySelector(".offers__last-price").getAttribute("data-price"));
        const priceB = Number(b.querySelector(".offers__last-price").getAttribute("data-price"));
        return priceB - priceA;
      });
      itemList.append(...sortedItems);
    }
  });
});

// СОРТИРОВКА "СНАЧАЛА НОВИНКИ"/"ВЫСОКИЙ РЕЙТИНГ"
options.forEach((option) => {
  option.addEventListener("click", () => {
    if (option.textContent.toLowerCase().includes("новинки")) {
      const itemsArray = Array.from(items);
      const sortedItems = itemsArray.sort((a, b) => {
        const newnessA = Number(a.getAttribute("data-id"));
        const newnessB = Number(b.getAttribute("data-id"));
        return newnessB - newnessA;
      });
      itemList.append(...sortedItems);
    } else if (option.textContent.toLowerCase().includes("рейтинг")) {
      const itemsArray = Array.from(items);
      const sortedItems = itemsArray.sort((a, b) => {
        const ratingA = Number(a.getAttribute("data-rating"));
        const ratingB = Number(b.getAttribute("data-rating"));
        return ratingB - ratingA;
      });
      itemList.append(...sortedItems);
    } else if (option.textContent.toLowerCase().includes("популярные")) {
      const itemsArray = Array.from(items);
      itemList.append(...itemsArray);
    }
  });
});

// Функционал изменения количества товара при нажатии кнопки + или -

itemList.addEventListener("click", (event) => {
  if (event.target.classList.contains("count__btn--plus")) {
    const counter = event.target.previousElementSibling;
    counter.textContent = Number(counter.textContent) + 1;
  } else if (event.target.classList.contains("count__btn--minus")) {
    const counter = event.target.nextElementSibling;
    if (counter.textContent > 0) {
      counter.textContent = Number(counter.textContent) - 1;
    }
  }
});

// Функционал добавления товаров в корзину

// Находим родительский блок и кнопку
const cart = document.querySelector(".header__orders-button");
const plusBtn = document.querySelector(".count__btn--plus");

plusBtn.addEventListener("click", () => {
  // 1. Получаем текущее значение переменной --count у элемента (или берем 1 по умолчанию)
  const computedStyle = window.getComputedStyle(cart);
  let currentVal = parseInt(computedStyle.getPropertyValue("--count")) || 0;
  currentVal += 1;
  cart.style.setProperty("--count", currentVal);
  cart.classList.toggle("active")
});