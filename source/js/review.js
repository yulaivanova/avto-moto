/*  eslint no-var: "error"  */
/*  eslint-env es6  */

'use strict';
(function () {
  const MAX_RAITING = 5;
  const REVIEW_LIST = document.querySelector('.reviews__list');

  const generateRating = function (raitingValue) {
    let ratingElem = '';
    for (let i = 0; i < MAX_RAITING; i++) {
      if (i < raitingValue) {
        ratingElem += `<span class="rating__active"></span>`;
      } else {
        ratingElem += `<span></span>`;
      }
    }

    if (raitingValue <= 2) {
      ratingElem += `<span>Не советует</span>`;
    } else {
      ratingElem += `<span>Cоветует</span>`;
    }

    return ratingElem;
  };

  const generateReviewCard = (data, raiting) => {
    const {name, pros, cons, comment} = data;
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
