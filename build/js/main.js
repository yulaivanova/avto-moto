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