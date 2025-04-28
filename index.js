const backToTopButton = document.querySelector(".back-to-top-button");
const year = document.getElementById("year");
const mobileYear = document.getElementById("mobile-year");
const burger = document.querySelector(".burger-menu");
const menu = document.querySelector(".menu");
const overlay = document.querySelector(".overlay");
const body = document.body;

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  });

  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

  // burger menu
  function toggleMenu() {
    burger.classList.toggle("active");
    menu.classList.toggle("active");
    overlay.classList.toggle("active");
    body.classList.toggle("lock");
  }

  burger.addEventListener("click", toggleMenu);

  overlay.addEventListener("click", toggleMenu);

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", toggleMenu);
  });

  document
    .querySelector(".open-menu-lang-toggle")
    .addEventListener("click", () => {
      toggleMenu();
    });

  // slider
  let galleryThumbs;

  fetch("./portfolio.json")
    .then((res) => res.json())
    .then((data) => {
      const swiperWrapper = document.querySelector(
        ".gallery-thumbs .swiper-wrapper"
      );

      // Створення фрагмента для слайдів
      const fragment = document.createDocumentFragment();

      data.forEach((item) => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";
        slide.dataset.category = item.category;

        const baseName = item.src.replace(/\.\w+$/, "");

        slide.innerHTML = `
        <picture>
          <source srcset="${baseName}.webp" type="image/webp">
          <img src="${item.src}" alt="${item.alt}" loading="lazy" width="301" height="463">
        </picture>
      `;

        // Додаємо слайд до фрагменту
        fragment.appendChild(slide);
      });

      // Додаємо всі слайди у DOM за один раз
      swiperWrapper.appendChild(fragment);

      // ініціалізація слайдера
      galleryThumbs = new Swiper(".gallery-thumbs", {
        loop: true,
        spaceBetween: 20,
        slidesPerView: "auto",
        freeMode: true,
        watchSlidesProgress: true,
        speed: 5000,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
        },
      });

      const navLinks = document.querySelectorAll(".portfolio-nav-link");

      // Обробник для фільтрації слайдів
      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          const selectedCategory = link.dataset.category;

          // Зміна активного класу
          navLinks.forEach((l) => {
            l.classList.remove("active", "portfolio-nav-link-active");
          });
          link.classList.add("active", "portfolio-nav-link-active");

          // Фільтруємо слайди за категорією
          const slides = document.querySelectorAll(".swiper-slide");

          slides.forEach((slide) => {
            // Використовуємо клас hidden для фільтрації
            slide.classList.toggle(
              "hidden",
              slide.dataset.category !== selectedCategory
            );
          });

          // Оновлюємо Swiper після фільтрації
          galleryThumbs.update();
        });
      });
    });

  // submit form
  let submitted = false;
  window.onload = function () {
    document.querySelector("form").addEventListener("submit", function (event) {
      submitted = true;
      setTimeout(function () {
        if (submitted) {
          alert("Your booking request has been sent successfully!");
        }
      }, 1000);
    });
  };

  // Back to top button
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Year
  year.textContent = new Date().getFullYear();
  mobileYear.textContent = new Date().getFullYear();
});
