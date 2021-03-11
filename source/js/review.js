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
