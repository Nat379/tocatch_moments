document.addEventListener('DOMContentLoaded', () => {
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
  const galleryTop = new Swiper('.gallery-top', {
    spaceBetween: 10,
    loop: true, // Включений цикл для головного слайдера
    navigation: {
      nextEl: '.swiper-button-next', // Прив'язка кнопок до верхнього слайдера
      prevEl: '.swiper-button-prev',
    },
    thumbs: {
      swiper: galleryThumbs, // Прив'язка до мініатюр
    },
  });
  
  
})




// const scrollContainer = document.querySelector('.scroll-container');
// const scrollContent = document.querySelector('.scroll-content');

// // Клонування зображень для плавного скролу
// const images = Array.from(scrollContent.children);
// images.forEach((img) => {
//   const clone = img.cloneNode(true);
//   scrollContent.appendChild(clone);
// });
// images.forEach((img) => {
//   const clone = img.cloneNode(true);
//   scrollContent.appendChild(clone);
// }); // Дублюємо двічі для плавності

// let scrollSpeed = 0.5; // Швидкість скролу
// let scrollPosition = 0;

// // Оновлення скролу
// function animateScroll() {
//   scrollPosition += scrollSpeed;

//   // Якщо скрол перевищує початкову довжину, повертаємося на початок
//   if (scrollPosition >= scrollContent.scrollWidth / 3) {
//     scrollPosition = 0; // Скидання позиції
//   }

//   scrollContent.style.transform = `translateX(-${scrollPosition}px)`;
//   requestAnimationFrame(animateScroll);
// }

// // Запуск анімації
// animateScroll();
