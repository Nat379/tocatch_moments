// Get DOM elements
const backToTopButton = document.querySelector(".back-to-top-button");
const year = document.getElementById("year");
const mobileYear = document.getElementById("mobile-year");
const burger = document.querySelector(".burger-menu");
const menu = document.querySelector(".menu");
const overlay = document.querySelector(".overlay");
const body = document.body;

document.addEventListener("DOMContentLoaded", () => {
  // Fade-in effect for elements using Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  });

  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

  // Burger menu toggle
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
    .addEventListener("click", toggleMenu);

  // Initialize slider
  let galleryThumbs;

  fetch("./portfolio.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error("portfolio.json not found");
      }
      return res.json();
    })
    .then((data) => {
      if (!data.length) {
        console.warn("No portfolio data found.");
        return;
      }

      const swiperWrapper = document.querySelector(
        ".gallery-thumbs .swiper-wrapper"
      );

      if (!swiperWrapper) {
        console.error("Swiper wrapper not found in DOM.");
        return;
      }

      const fragment = document.createDocumentFragment();

      data.forEach((item) => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";
        slide.dataset.category = item.category;

        const baseName = item.src.replace(/\.\w+$/, "");

        slide.innerHTML = `
          <picture>
            <source srcset="${baseName}.webp" type="image/webp">
            <img src="${item.src}" alt="${item.alt}" width="301" height="463">
          </picture>
        `;

        fragment.appendChild(slide);
      });

      swiperWrapper.appendChild(fragment);

      // Initialize Swiper after content is added
      galleryThumbs = new Swiper(".gallery-thumbs", {
        loop: false,
        spaceBetween: 20,
        slidesPerView: "auto",
        freeMode: true,
        watchSlidesProgress: true,
        speed: 5000,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
        },
        breakpoints: {
          0: {
            spaceBetween: 10,
          },
          768: {
            spaceBetween: 20,
          },
        },
      });

      // Handle category filtering
      const navLinks = document.querySelectorAll(".portfolio-nav-link");

      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          const selectedCategory = link.dataset.category;

          navLinks.forEach((l) => {
            l.classList.remove("active", "portfolio-nav-link-active");
          });
          link.classList.add("active", "portfolio-nav-link-active");

          const slides = document.querySelectorAll(".swiper-slide");

          slides.forEach((slide) => {
            slide.classList.toggle(
              "hidden",
              slide.dataset.category !== selectedCategory
            );
          });

          galleryThumbs.update(); // Refresh Swiper layout
        });
      });
    })
    .catch((err) => {
      console.error("Error loading or processing portfolio data:", err);
    });

  // Form submission alert
  document.querySelector("form")?.addEventListener("submit", function (event) {
    setTimeout(function () {
      alert("Your booking request has been sent successfully!");
    }, 1000);
  });

  // Back to top button scroll
  backToTopButton?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Display current year
  const currentYear = new Date().getFullYear();
  if (year) year.textContent = currentYear;
  if (mobileYear) mobileYear.textContent = currentYear;
});
