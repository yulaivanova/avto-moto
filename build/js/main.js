/*  eslint no-var: "error"  */
/*  eslint-env es6  */

'use strict';
(function () {

  const NAV_MAIN = document.querySelector('.site-nav');
  const NAV_TOGGLE = document.querySelector('.site-nav__toggle');

  NAV_MAIN.classList.remove('site-nav--nojs');
  NAV_MAIN.classList.remove('site-nav--opened');
  NAV_MAIN.classList.add('site-nav--closed');

  NAV_TOGGLE.addEventListener('click', function () {
    if (NAV_MAIN.classList.contains('site-nav--closed')) {
      NAV_MAIN.classList.remove('site-nav--closed');
      NAV_MAIN.classList.add('site-nav--opened');
    } else {
      NAV_MAIN.classList.add('site-nav--closed');
      NAV_MAIN.classList.remove('site-nav--opened');
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

/*  eslint no-var: "error"  */
/*  eslint-env es6  */

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
        if (evt.keyCode === ENTER_KEY) {
          selectTabNavOnEnter(tabName);
        }
      });
    });

    function selectTabNavOnEnter() {
      TAB_NAV.forEach(item => {
        item.dataset.tabName === tabName ? item.classList.add('tabs-nav__item--is-active') : item.classList.remove('tabs-nav__item--is-active')
      });
      selectTabContent(tabName);
    }

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
  const ENTER_KEY = 'Enter';

  const POPUP = document.querySelector('.popup');
  const FORM = document.querySelector('.popup__wrapper form');
  const USER_NAME = document.querySelector('#name');
  const COMMENT = document.querySelector('#comment');
  const PROS = document.querySelector('#pros');
  const CONS = document.querySelector('#cons');
  const RATING = document.querySelector('.fieldset__rating');
  const RATING_INPUT = document.querySelectorAll('.fieldset__rating input');
  const RATING_LABEL = document.querySelectorAll('.fieldset__rating label');
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

    let value = +window.storage.rating;

    RATING_INPUT.forEach(item => {
      if (+item.value === value) {
        item.checked = true;
      }
    });
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

  const createCheckedArray = function (array) {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
      let element = array[i];
      if (element.checked) {
        newArray.push(element.value);
      }
    }
    return newArray;
  };

  USER_NAME.addEventListener('change', function () {
    ERROR_INPUT_MSG.classList.add('fieldset__input-error--show');
    if (USER_NAME.validity.valid) {
      ERROR_INPUT_MSG.classList.remove('fieldset__input-error--show');
    }
  }, false);

  FORM.addEventListener('submit', function (evt) {
    evt.preventDefault();
    let checkedRatingElements = createCheckedArray(RATING.elements);
    let ratingValue = checkedRatingElements[0];

    if (window.storage.isSupport) {
      localStorage.setItem('userName', USER_NAME.value);
      localStorage.setItem('pros', PROS.value);
      localStorage.setItem('cons', CONS.value);
      localStorage.setItem('comment', COMMENT.value);
      localStorage.setItem('rating', ratingValue);
    }

    window.review.generate(FORM.elements, ratingValue);
    closePopup();
  });

  POPUP.addEventListener('click', onOverlayClick);
  POPUP.addEventListener('click', onToggleClick);

  RATING_LABEL.forEach(item => {
    item.addEventListener('keydown', function (evt) {
      if (evt.key === ENTER_KEY) {
        let dataRating = item.dataset.rating;

        RATING_INPUT.forEach(input => {
          if (input.id === dataRating) {
            input.checked = true;
          }
        });
      }
    });
  });

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
  let storageRating = '';

  try {
    storageName = localStorage.getItem('userName');
    storageCons = localStorage.getItem('cons');
    storagePros = localStorage.getItem('pros');
    storageComment = localStorage.getItem('comment');
    storageRating = localStorage.getItem('rating');
  } catch (err) {
    isStorageSupport = false;
  }

  window.storage = {
    isSupport: isStorageSupport,
    name: storageName,
    cons: storageCons,
    pros: storagePros,
    comment: storageComment,
    rating: storageRating,
  };

})();

/*  eslint no-var: "error"  */
/*  eslint-env es6  */

'use strict';
(function () {

  const REVIEW_LIST = document.querySelector('.reviews__list');

  const generateReviewCard = (data, rating) => {
    const {name, pros, cons, comment} = data;
    let ratingElem = window.rating.generate(rating);
    let date = new Date().toLocaleString();

    REVIEW_LIST.insertAdjacentHTML('beforeend', `
        <li class="reviews__item">
          <h2>${name.value}</h2>
          <div class="reviews__features reviews__features--pros">
            <h3>Достоинства</h3>
            <p>${pros.value}</p>
          </div>
          <div class="reviews__features reviews__features--cons">
            <h3>Недостатки</h3>
            <p>${cons.value}</p>
          </div>
          <div class="reviews__comment">
            <h3>Комментарий</h3>
            <p>${comment.value}</p>
          </div>
          <div class="reviews__rating rating">
            ${ratingElem}
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

/*  eslint no-var: "error"  */
/*  eslint-env es6  */

'use strict';

(function () {
  const MAX_RATING = 5;

  const generateRating = function (ratingValue) {
    let ratingElem = '';
    for (let i = 0; i < MAX_RATING; i++) {
      if (i < ratingValue) {
        ratingElem += `<span class="rating__active"></span>`;
      } else {
        ratingElem += `<span></span>`;
      }
    }

    if (ratingValue <= 2) {
      ratingElem += `<span>Не советует</span>`;
    } else {
      ratingElem += `<span>Cоветует</span>`;
    }

    return ratingElem;
  };

  window.rating = {
    generate: generateRating,
  };

})();
