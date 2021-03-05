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
  const TAB_NAV = document.querySelectorAll('.tabs-nav__item');
  const TABS = document.querySelector('.tabs');
  const TAB_CONTENT = document.querySelectorAll('.tabs__item');
  let tabName;

  TABS.classList.remove('tabs--nojs');

  const onTabsClick = function () {
    TAB_NAV.forEach(item => {
      item.addEventListener('click', selectTabNav);
      item.addEventListener('keydown', function (evt) {
        tabName = this.getAttribute('data-tab-name');
        if (evt.keyCode === ENTER_KEY) selectTabNavOnEnter(tabName);
      });
    });

    function selectTabNavOnEnter() {
      TAB_NAV.forEach(item => {
        item.dataset.tabName === tabName ? item.classList.add('tabs-nav__item--is-active') : item.classList.remove('tabs-nav__item--is-active');
      });
      selectTabContent(tabName);
    };

    function selectTabNav() {
      TAB_NAV.forEach(item => {
        item.classList.remove('tabs-nav__item--is-active');
      });
      this.classList.add('tabs-nav__item--is-active');
      tabName = this.getAttribute('data-tab-name');
      selectTabContent(tabName);
    }

    function selectTabContent(tabName) {
      TAB_CONTENT.forEach(item => {
        item.classList.contains(tabName) ? item.classList.add('tabs__item--is-active') : item.classList.remove('tabs__item--is-active');
      })
    }
  };

  onTabsClick();
})();
/*  eslint no-var: "error"  */
/*  eslint-env es6  */

'use strict';

(function () {
  const ESC_KEY = 'Escape';

  const POPUP = document.querySelector('.popup');
  const FORM = document.querySelector('.popup__wrapper form');
  const USER_NAME = document.querySelector('#name');
  const COMMENT = document.querySelector('#comment');
  const PROS = document.querySelector('#pros');
  const CONS = document.querySelector('#cons');
  const RATING = document.querySelector('.fieldset__rating');
  const REVIEWS_BTN = document.querySelector('.reviews__button');
  const ERROR_INPUT_MSG = document.querySelector('.fieldset__input-error');

  const closePopup = function () {
    POPUP.classList.remove('popup--opened');
    document.body.style.overflow = 'scroll';

    if (ERROR_INPUT_MSG.classList.contains('fieldset__input-error--show')) {
      ERROR_INPUT_MSG.classList.remove('fieldset__input-error--show');
    }
  };

  const openPopup = function () {
    POPUP.classList.add('popup--opened');
    document.body.style.overflow = 'hidden';

    if (USER_NAME) {
      USER_NAME.focus();
      USER_NAME.value = window.storage.name;
    }

    if (CONS) {
      CONS.value = window.storage.cons;
    }

    if (PROS) {
      PROS.value = window.storage.pros;
    }

    if (COMMENT) {
      COMMENT.value = window.storage.comment;
    }
  };

  const onEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      closePopup();
    }
  };

  const onOverlayClick = function (event) {
    const target = event.target;
    if (target.classList.contains('popup--opened')) {
      closePopup();
      document.removeEventListener('keydown', onEscPress);
    }
  };

  const onToggleClick = function (event) {
    const target = event.target;
    if (target.classList.contains('popup__toggle')) {
      closePopup();
      document.removeEventListener('keydown', onEscPress);
    }
  };

  USER_NAME.addEventListener('change', function () {
    ERROR_INPUT_MSG.classList.add('fieldset__input-error--show');
    if (USER_NAME.validity.valid) {
      ERROR_INPUT_MSG.classList.remove('fieldset__input-error--show');
    }
  }, false);

  var createCheckedArray = function (array) {
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
      var element = array[i];
      if (element.checked) {
        newArray.push(element.value);
      }
    }
    return newArray;
  };

  FORM.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (window.storage.isSupport) {
      localStorage.setItem('userName', USER_NAME.value);
      localStorage.setItem('pros', PROS.value);
      localStorage.setItem('cons', CONS.value);
      localStorage.setItem('comment', COMMENT.value);
    }

    let checkedRaitingElements = createCheckedArray(RATING.elements);
    let ratingValue = checkedRaitingElements[0];

    window.review.generate(FORM.elements, ratingValue);
    closePopup();
  });

  POPUP.addEventListener('click', onOverlayClick);
  POPUP.addEventListener('click', onToggleClick);

  REVIEWS_BTN.addEventListener('click', function (evt) {
    evt.preventDefault();
    openPopup();
    document.addEventListener('keydown', onEscPress);
  });
})();

/*  eslint no-var: "error"  */
/*  eslint-env es6  */

'use strict';

(function () {
  let isStorageSupport = true;
  let storageName = '';
  let storagePros = '';
  let storageCons = '';
  let storageComment = '';

  try {
    storageName = localStorage.getItem('userName');
    storageCons = localStorage.getItem('cons');
    storagePros = localStorage.getItem('pros');
    storageComment = localStorage.getItem('comment');
  } catch (err) {
    isStorageSupport = false;
  }

  window.storage = {
    isSupport: isStorageSupport,
    name: storageName,
    cons: storageCons,
    pros: storagePros,
    comment: storageComment,
  };

})();

'use strict';
(function () {
  const MAX_RAITING = 5;
  const REVIEW_LIST = document.querySelector('.reviews__list');

  const generateRating = function (raitingValue) {
    let ratingElem = '';
    for (var i = 0; i < MAX_RAITING; i++) {
      if (i < raitingValue) {
        ratingElem += `<span class="rating__active"></span>`
      } else {
        ratingElem += `<span></span>`;
      };
    };

    if (raitingValue <= 2) {
      ratingElem += `<span>Не советует</span>`;
    } else {
      ratingElem += `<span>Cоветует</span>`
    }

    return ratingElem;
  };


  const generateReviewCard = (data, raiting) => {
    const { name, pros, cons, comment } = data;
    let raitingElem = generateRating(raiting);
    let date = new Date().toLocaleString();

    REVIEW_LIST.insertAdjacentHTML('beforeend', `
        <li class="reviews__item">
          <h2>${name.value}</h2>
          <div class="reviews__features">
            <h3 class="reviews__title reviews__title--pros">Достоинства</h3>
            <p>${pros.value}</p>
          </div>
          <div class="reviews__features">
            <h3 class="reviews__title reviews__title--cons">Недостатки</h3>
            <p>${cons.value}</p>
          </div>
          <div class="reviews__comment">
            <h3 class="reviews__title">Комментарий</h3>
            <p>${comment.value}</p>
          </div>
          <div class="reviews__rating rating">
            ${raitingElem}
          </div>
          <div class="reviews__date">
            <p>${date}</p>
            <a href="#" class="reviews__answer">Ответить</a>
          </div>
        </li>
      `);
  };

  window.review = {
    generate: generateReviewCard,
  };
})();