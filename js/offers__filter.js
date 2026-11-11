const filter = document.getElementById("sortSelect");
const trigger = filter.querySelector(".offers__filter-button");
const options = filter.querySelectorAll(".offers__filter-option");
const selectedText = filter.querySelector(".offers__filter-text");

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
    selectedText.textContent = option.querySelector("span").textContent;

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

