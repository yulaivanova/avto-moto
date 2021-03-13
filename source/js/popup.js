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
  const FIELDSET_NAME = document.querySelector('.fieldset__field--name');
  const FIELDSET_COMMENT = document.querySelector('.fieldset__field--comment');
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
    let ERROR_MSG = FIELDSET_NAME.firstElementChild;
    ERROR_MSG.classList.add('fieldset__input-error--show');
    FIELDSET_NAME.classList.add('fieldset__field--invalid');
    if (USER_NAME.validity.valid) {
      ERROR_MSG.classList.remove('fieldset__input-error--show');
      FIELDSET_NAME.classList.remove('fieldset__field--invalid');
    }
  }, false);

  COMMENT.addEventListener('change', function () {
    let ERROR_MSG = FIELDSET_COMMENT.firstElementChild;
    ERROR_MSG.classList.add('fieldset__input-error--show');
    FIELDSET_COMMENT.classList.add('fieldset__field--invalid');
    if (COMMENT.validity.valid) {
      ERROR_MSG.classList.remove('fieldset__input-error--show');
      FIELDSET_COMMENT.classList.remove('fieldset__field--invalid');
    }
  }, false);

  FORM.addEventListener('submit', function (evt) {
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
    evt.preventDefault();
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
