function init(ymaps) {
  var myMap = new ymaps.Map('map', {
    center: [59.968137, 30.316263],
    zoom: 16
  }, {
    searchControlProvider: 'yandex#search'
  }),

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
};
