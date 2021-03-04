'use strict';
(function () {

let navMain = document.querySelector('.site-nav');
let navToggle = document.querySelector('.site-nav__toggle');

navMain.classList.remove('site-nav--nojs');
navMain.classList.remove('site-nav--opened');
navMain.classList.add('site-nav--closed');

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('site-nav--closed')) {
    navMain.classList.remove('site-nav--closed');
    navMain.classList.add('site-nav--opened');
  } else {
    navMain.classList.add('site-nav--closed');
    navMain.classList.remove('site-nav--opened');
  }
});

})();
(function () {
    ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
      center: [59.968137, 30.316263],
      zoom: 16
    }, {
      searchControlProvider: 'yandex#search'
    }),

      // Создаём макет содержимого.
      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      ),

      myPlacemark = new ymaps.Placemark([59.968137, 30.316263], {
        balloonContent: 'Avto moto'
      }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: 'img/map-pin.png',
        // Размеры метки.
        iconImageSize: [32, 40],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-20, -45]
      });

    myMap.geoObjects
      .add(myPlacemark);
  });

})();
'use strict';
(function () {
  var galleryThumbs = new Swiper('.slider__gallery-thumbs', {
    spaceBetween: 25,
    slidesPerView: 3,
  });
  var galleryTop = new Swiper('.slider__gallery-top', {
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
'use strict';

(function () {

  const ENTER_KEY = 13;
  let tabNav = document.querySelectorAll('.tabs-nav__item');
  let tabContent = document.querySelectorAll('.tabs__item');
  let tabName;

  let onTabsClick = function () {
    tabNav.forEach(item => {
      item.addEventListener('click', selectTabNav);
      item.addEventListener('keydown', function (evt) {
        tabName = this.getAttribute('data-tab-name');
        if (evt.keyCode === ENTER_KEY) selectTabNavOnEnter(tabName);
      });
    });

    function selectTabNavOnEnter() {
      tabNav.forEach(item => {
        item.dataset.tabName === tabName ? item.classList.add('tabs-nav__item--is-active') : item.classList.remove('tabs-nav__item--is-active');
      });
      selectTabContent(tabName);
    };

    function selectTabNav() {
      tabNav.forEach(item => {
        item.classList.remove('tabs-nav__item--is-active');
      });
      this.classList.add('tabs-nav__item--is-active');
      tabName = this.getAttribute('data-tab-name');
      selectTabContent(tabName);
    }

    function selectTabContent(tabName) {
      tabContent.forEach(item => {
        console.log(tabName);
        item.classList.contains(tabName) ? item.classList.add('tabs__item--is-active') : item.classList.remove('tabs__item--is-active');
      })
    }
  };

  onTabsClick();
})();