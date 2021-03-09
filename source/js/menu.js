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
