const uaButtons = document.querySelectorAll(".ua-lang");
const enButtons = document.querySelectorAll(".en-lang");

// ser language
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

      // local storage
      localStorage.setItem("language", lang);

      // update lang in <html>
      document.documentElement.setAttribute("lang", lang);

      // toggle active class
      uaButtons.forEach((btn) =>
        btn.classList.toggle("inactive-lang", lang !== "ua")
      );
      enButtons.forEach((btn) =>
        btn.classList.toggle("inactive-lang", lang !== "en")
      );
    })
    .catch((error) => console.error("Error loading language file:", error));
}

// default lang
const defaultLang = localStorage.getItem("language") || "en";

// set lang
document.addEventListener("DOMContentLoaded", () => {
  setLanguage(defaultLang);
});

// switch lang
uaButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (localStorage.getItem("language") !== "ua") {
      setLanguage("ua");
    }
  });
});

enButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (localStorage.getItem("language") !== "en") {
      setLanguage("en");
    }
  });
});
