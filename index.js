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

  document.querySelector(".open-menu-lang-toggle").addEventListener("click", () => {
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

      // add slides
      data.forEach((item) => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";
        slide.dataset.category = item.category;
        slide.innerHTML = `<img src="${item.src}" alt="${item.alt}">`;
        swiperWrapper.appendChild(slide);
      });

      // slider initialization
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

      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          const selectedCategory = link.dataset.category;

          // Перемикаємо класи
          navLinks.forEach((l) => {
            l.classList.remove("active", "portfolio-nav-link-active");
          });
          link.classList.add("active", "portfolio-nav-link-active");

          // Фільтруємо слайди
          const slides = document.querySelectorAll(".swiper-slide");

          slides.forEach((slide) => {
            const slideCategory = slide.dataset.category;
            if (slideCategory === selectedCategory) {
              slide.style.display = "flex";
            } else {
              slide.style.display = "none";
            }
          });

          galleryThumbs.update(); // оновлюємо слайдер
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
