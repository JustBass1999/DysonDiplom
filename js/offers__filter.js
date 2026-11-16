const filter = document.getElementById("sortSelect");
const trigger = filter.querySelector(".offers__filter-button");
const options = filter.querySelectorAll(".offers__filter-option");
const selectedMenu = filter.querySelector(".offers__filter-text");
const cart = document.querySelector(".header__orders-button");
const items = document.querySelectorAll(".offers__list-item");
const itemList = document.querySelector(".offers__list");
const nextButton = document.querySelector(".select-page__next-page");
const prevButton = document.querySelector(".select-page__previous-page");
const pageNumber = document.querySelector(".select-page__page-number");

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

// СОРТИРОВКА ДЕШЕВЫЕ/ДОРОГИЕ

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

// Функционал изменения количества товара при нажатии кнопки + или - и добавления товаров в корзину

let cartCount = 0;

itemList.addEventListener("click", (event) => {
  if (event.target.classList.contains("count__btn--plus")) {
    cart.classList.add("active");
    const counter = event.target.previousElementSibling;
    counter.textContent = Number(counter.textContent) + 1;
    cartCount += 1;
    cart.style.setProperty("--count", `"${cartCount}"`);
  } else if (event.target.classList.contains("count__btn--minus")) {
    const counter = event.target.nextElementSibling;
    if (counter.textContent > 0) {
      counter.textContent = Number(counter.textContent) - 1;
      if (cartCount > 0) {
        cartCount -= 1;
        cart.style.setProperty("--count", `"${cartCount}"`);

        if (cartCount === 0) {
          cart.classList.remove("active");
        }
      }
    }
  }
});

// Вспомогательная функция, чтобы не дублировать код изменения текста
const updateAvailability = (selector, text) => {
  itemList.querySelectorAll(selector).forEach((item) => {
    item.textContent = text;
  });
};

// Кнопка "Вперед"

nextButton.addEventListener("click", () => {
  if (itemList.classList.contains("offers__list-first--page")) {
    itemList.classList.replace("offers__list-first--page", "offers__list-second--page");
    updateAvailability(
      ".offers__list-item:nth-child(n + 4) .offers__availability",
      "Нет в наличии",
    );
    pageNumber.textContent = "2 из 3";
  } else if (itemList.classList.contains("offers__list-second--page")) {
    itemList.classList.replace("offers__list-second--page", "offers__list-third--page");
    updateAvailability(
      ".offers__list-item:nth-child(-n + 3) .offers__availability",
      "Нет в наличии",
    );
    pageNumber.textContent = "3 из 3";
  }
});

// Кнопка "Назад"

prevButton.addEventListener("click", () => {
  if (itemList.classList.contains("offers__list-third--page")) {
    itemList.classList.replace("offers__list-third--page", "offers__list-second--page");

    updateAvailability(".offers__list-item:nth-child(-n + 3) .offers__availability", "В наличии");
    pageNumber.textContent = "2 из 3";
  } else if (itemList.classList.contains("offers__list-second--page")) {
    itemList.classList.replace("offers__list-second--page", "offers__list-first--page");
    updateAvailability(".offers__list-item:nth-child(n + 4) .offers__availability", "В наличии");
    pageNumber.textContent = "1 из 3";
  }
});
