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