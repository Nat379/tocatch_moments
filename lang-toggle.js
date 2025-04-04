const uaButton = document.querySelector(".ua-lang");
const enButton = document.querySelector(".en-lang");

// Функція встановлення мови
function setLanguage(lang) {
  fetch(`./data-lang/${lang}.json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      document.querySelectorAll("[data-key]").forEach((el) => {
        el.textContent = data[el.getAttribute("data-key")];
      });

      // Оновлюємо локальне сховище
      localStorage.setItem("language", lang);

      // Оновлюємо атрибут lang у <html>
      document.documentElement.setAttribute("lang", lang);

      // Додаємо/видаляємо активний клас у кнопках мови
      uaButton.classList.toggle("inactive-lang", lang !== "ua");
      enButton.classList.toggle("inactive-lang", lang !== "en");
    })
    .catch((error) => console.error("Error loading language file:", error));
}

// Отримуємо поточну мову або встановлюємо англійську за замовчуванням
const defaultLang = localStorage.getItem("language") || "en";

// Викликаємо функцію встановлення мови при завантаженні сторінки
document.addEventListener("DOMContentLoaded", () => {
  setLanguage(defaultLang);
});

// Обробники подій для перемикання мови
uaButton.addEventListener("click", () => {
  if (localStorage.getItem("language") !== "ua") {
    setLanguage("ua");
  }
});

enButton.addEventListener("click", () => {
  if (localStorage.getItem("language") !== "en") {
    setLanguage("en");
  }
});
