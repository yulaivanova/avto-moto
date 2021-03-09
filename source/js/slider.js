'use strict';
(function () {
  const SLIDER = document.querySelector('.slider');

  SLIDER.classList.remove('slider--nojs');

  let galleryThumbs = new Swiper('.slider__gallery-thumbs', {
    spaceBetween: 25,
    slidesPerView: 3,
  });
  let galleryTop = new Swiper('.slider__gallery-top', {
    spaceBetween: 10,
    navigation: {
      nextEl: '.slider__button--next',
      prevEl: '.slider__button--prev',
    },
    breakpoints: {
      1024: {
        allowTouchMove: false,
      },
    },
  });

})();
