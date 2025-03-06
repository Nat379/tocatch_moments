const backToTopButton = document.querySelector(".back-to-top-button");
const year = document.getElementById("year");
const mobileYear = document.getElementById("mobile-year");

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  });
  
  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

  const burger = document.querySelector(".burger-menu");
  const menu = document.querySelector(".menu");
  const overlay = document.querySelector(".overlay");
  const body = document.body;

  // Функція для відкриття/закриття меню
  function toggleMenu() {
    burger.classList.toggle("active");
    menu.classList.toggle("active");
    body.classList.toggle("lock"); // Заборона прокручування
  }

  // Відкриття/закриття при кліку на бургер
  burger.addEventListener("click", toggleMenu);


  // Закриття меню при кліку на посилання
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", toggleMenu);
  });


  // Ініціалізація слайдера мініатюр
  const galleryThumbs = new Swiper('.gallery-thumbs', {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 'auto',
    freeMode: true,
    watchSlidesProgress: true,
    navigation: {
      nextEl: '.swiper-button-next', // Прив'язка кнопок до нижнього слайдера
      prevEl: '.swiper-button-prev',
    },
  });

  // Ініціалізація основного слайдера
  // const galleryTop = new Swiper(".gallery-top", {
  //   spaceBetween: 10,
  //   loop: true, // Включений цикл для головного слайдера
  //   navigation: {
  //     nextEl: ".swiper-button-next", // Прив'язка кнопок до верхнього слайдера
  //     prevEl: ".swiper-button-prev",
  //   },
    // thumbs: {
    //   swiper: galleryThumbs, // Прив'язка до мініатюр
    // },
  // });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  year.textContent = new Date().getFullYear();
  mobileYear.textContent = new Date().getFullYear();
});
