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
  
  document.getElementById("year").textContent = new Date().getFullYear();
})
