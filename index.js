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
  burger.classList.toggle('active');
  menu.classList.toggle('active');
  overlay.classList.toggle('active');
  body.classList.toggle('lock');
}

burger.addEventListener('click', toggleMenu);

overlay.addEventListener('click', toggleMenu);

menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', toggleMenu);
});

  // slider
  const galleryThumbs = new Swiper(".gallery-thumbs", {
    loop: true,
    spaceBetween: 10,
    slidesPerView: "auto",
    freeMode: true,
    watchSlidesProgress: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
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
