const swiper = new Swiper(".swiper", {
  spaceBetween: 2,
  centeredSlides: true,
  autoHeight: true,
  loop: true,
  parallax: true,
  effect: "fade",
  pagination: {
    el: ".swiper-pagination",
  },
  autoplay: {
    delay: 5000,
  },
});
