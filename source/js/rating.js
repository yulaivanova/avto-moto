/*  eslint no-var: "error"  */
/*  eslint-env es6  */

'use strict';

(function () {
  const MAX_RAITING = 5;

  const generateRating = function (ratingValue) {
    let ratingElem = '';
    for (let i = 0; i < MAX_RAITING; i++) {
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
