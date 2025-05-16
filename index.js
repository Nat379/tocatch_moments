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
  // let galleryThumbs;

  // fetch("./portfolio.json")
  //   .then((res) => {
  //     if (!res.ok) {
  //       throw new Error("portfolio.json not found");
  //     }
  //     return res.json();
  //   })
  //   .then((data) => {
  //     if (!data.length) {
  //       console.warn("No portfolio data found.");
  //       return;
  //     }

  //     const swiperWrapper = document.querySelector(
  //       ".gallery-thumbs .swiper-wrapper"
  //     );

  //     if (!swiperWrapper) {
  //       console.error("Swiper wrapper not found in DOM.");
  //       return;
  //     }

  //     const fragment = document.createDocumentFragment();

  //     data.forEach((item) => {
  //       const slide = document.createElement("div");
  //       slide.className = "swiper-slide";
  //       slide.dataset.category = item.category;

  //       const baseName = item.src.replace(/\.\w+$/, "");

  //       slide.innerHTML = `
  //         <picture>
  //           <source srcset="${baseName}.webp" type="image/webp">
  //           <img src="${item.src}" loading="lazy" class="swiper-lazy" alt="${item.alt}" width="301" height="463">
  //         </picture>
  //          <div class="swiper-lazy-preloader"></div>
  //       `;

  //       fragment.appendChild(slide);
  //     });

  //     swiperWrapper.appendChild(fragment);

  //     // Initialize Swiper after content is added
  //     galleryThumbs = new Swiper(".gallery-thumbs", {
  //       loop: false,
  //       spaceBetween: 20,
  //       slidesPerView: "auto",
  //       freeMode: true,
  //       watchSlidesProgress: true,
  //       speed: 5000,
  //       autoplay: {
  //         delay: 0,
  //         disableOnInteraction: false,
  //       },
  //       lazy: {
  //         loadOnTransitionStart: true,
  //         loadPrevNext: true,
  //         loadPrevNextAmount: 4,
  //       },
  //       breakpoints: {
  //         0: {
  //           spaceBetween: 10,
  //         },
  //         768: {
  //           spaceBetween: 20,
  //         },
  //       },
  //     });

  //     galleryThumbs.on("lazyImageReady", () => {
  //       galleryThumbs.update();
  //     });


  //     // Handle category filtering
  //     const navLinks = document.querySelectorAll(".portfolio-nav-link");

  //     navLinks.forEach((link) => {
  //       link.addEventListener("click", () => {
  //         const selectedCategory = link.dataset.category;

  //         navLinks.forEach((l) => {
  //           l.classList.remove("active", "portfolio-nav-link-active");
  //         });
  //         link.classList.add("active", "portfolio-nav-link-active");

  //         const slides = document.querySelectorAll(".swiper-slide");

  //         slides.forEach((slide) => {
  //           slide.classList.toggle(
  //             "hidden",
  //             slide.dataset.category !== selectedCategory
  //           );
  //         });

  //         galleryThumbs.update(); // Refresh Swiper layout
  //       });
  //     });
  //   })
  //   .catch((err) => {
  //     console.error("Error loading or processing portfolio data:", err);
  //   });

let allSlides = [];
let animationId;
let scrollOffset = 0;
let isDragging = false;
let dragStartX = 0;
let dragStartScroll = 0;
let velocity = 0.5;

fetch("./portfolio.json")
  .then((res) => res.json())
  .then((data) => {
    allSlides = data;
    const defaultCategory =
      document.querySelector(".portfolio-nav-link.active")?.dataset.category ||
      data[0].category;

    renderSlides(filterByCategory(defaultCategory));
    setupCategoryFilter();
    lazyLoadImages();
    enableDragScroll();
    startAutoScroll();
  });

function filterByCategory(category) {
  return allSlides.filter((item) => item.category === category);
}

function renderSlides(data) {
  const wrapper = document.querySelector(".gallery-thumbs .swiper-wrapper");
  wrapper.innerHTML = "";

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 2; i++) {
    data.forEach((item) => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";
      slide.dataset.category = item.category;

      const picture = document.createElement("picture");

      const sourceWebp = document.createElement("source");
      sourceWebp.type = "image/webp";
      sourceWebp.dataset.srcset = item.src
        .replace(/^\.\//, "")
        .replace(/\.jpg$/, ".webp");

      const img = document.createElement("img");
      img.dataset.src = item.src.replace(/^\.\//, "");
      img.alt = item.alt;
      img.width = 301;
      img.height = 463;
      img.classList.add("lazy-img");

      picture.appendChild(sourceWebp);
      picture.appendChild(img);
      slide.appendChild(picture);

      fragment.appendChild(slide);
    });
  }

  wrapper.appendChild(fragment);
}

function setupCategoryFilter() {
  const links = document.querySelectorAll(".portfolio-nav-link");

  links.forEach((link) => {
    link.addEventListener("click", () => {
      if (link.classList.contains("active")) return;

      const category = link.dataset.category;

      links.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      cancelAnimationFrame(animationId);
      scrollOffset = 0;

      renderSlides(filterByCategory(category));
      lazyLoadImages();
      startAutoScroll();
    });
  });
}

function lazyLoadImages() {
  const lazyImages = document.querySelectorAll(
    "img.lazy-img, source[data-srcset]"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;

          if (img.tagName === "IMG") {
            img.src = img.dataset.src;
            img.classList.remove("lazy-img");
          } else if (img.tagName === "SOURCE") {
            img.srcset = img.dataset.srcset;
          }

          obs.unobserve(img);
        }
      });
    });

    lazyImages.forEach((el) => observer.observe(el));
  } else {
    lazyImages.forEach((el) => {
      if (el.tagName === "IMG") {
        el.src = el.dataset.src;
        el.classList.remove("lazy-img");
      } else if (el.tagName === "SOURCE") {
        el.srcset = el.dataset.srcset;
      }
    });
  }
}

function startAutoScroll() {
  const wrapper = document.querySelector(".gallery-thumbs .swiper-wrapper");

  cancelAnimationFrame(animationId);
  let lastTime = performance.now();

  function animate(currentTime) {
    if (!isDragging) {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      const distance = velocity * deltaTime * 60;
      scrollOffset -= distance;

      const maxScroll = wrapper.scrollWidth / 2;
      if (Math.abs(scrollOffset) >= maxScroll) {
        scrollOffset = 0;
      }

      wrapper.style.transform = `translateX(${scrollOffset}px)`;
    } else {
      lastTime = currentTime;
    }

    animationId = requestAnimationFrame(animate);
  }

  animationId = requestAnimationFrame(animate);
}

function enableDragScroll() {
  const wrapper = document.querySelector(".gallery-thumbs .swiper-wrapper");

  function onPointerDown(e) {
    isDragging = true;
    cancelAnimationFrame(animationId);
    dragStartX = e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
    dragStartScroll = scrollOffset;
    wrapper.classList.add("dragging");
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    const currentX = e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
    const delta = currentX - dragStartX;
    scrollOffset = dragStartScroll + delta;
    wrapper.style.transform = `translateX(${scrollOffset}px)`;
  }

  function onPointerUp() {
    isDragging = false;
    wrapper.classList.remove("dragging");
    startAutoScroll(); 
  }

  wrapper.addEventListener("mousedown", onPointerDown);
  wrapper.addEventListener("mousemove", onPointerMove);
  window.addEventListener("mouseup", onPointerUp);

  wrapper.addEventListener("touchstart", onPointerDown);
  wrapper.addEventListener("touchmove", onPointerMove);
  window.addEventListener("touchend", onPointerUp);
}


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
