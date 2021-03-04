'use strict';

(function () {

  const ENTER_KEY = 13;
  let tabNav = document.querySelectorAll('.tabs-nav__item');
  let tabContent = document.querySelectorAll('.tabs__item');
  let tabName;

  let onTabsClick = function () {
    tabNav.forEach(item => {
      item.addEventListener('click', selectTabNav);
      item.addEventListener('keydown', function (evt) {
        tabName = this.getAttribute('data-tab-name');
        if (evt.keyCode === ENTER_KEY) selectTabNavOnEnter(tabName);
      });
    });

    function selectTabNavOnEnter() {
      tabNav.forEach(item => {
        item.dataset.tabName === tabName ? item.classList.add('tabs-nav__item--is-active') : item.classList.remove('tabs-nav__item--is-active');
      });
      selectTabContent(tabName);
    };

    function selectTabNav() {
      tabNav.forEach(item => {
        item.classList.remove('tabs-nav__item--is-active');
      });
      this.classList.add('tabs-nav__item--is-active');
      tabName = this.getAttribute('data-tab-name');
      selectTabContent(tabName);
    }

    function selectTabContent(tabName) {
      tabContent.forEach(item => {
        console.log(tabName);
        item.classList.contains(tabName) ? item.classList.add('tabs__item--is-active') : item.classList.remove('tabs__item--is-active');
      })
    }
  };

  onTabsClick();
})();