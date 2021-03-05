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
