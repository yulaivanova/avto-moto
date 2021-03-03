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