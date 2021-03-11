/*  eslint no-var: "error"  */
/*  eslint-env es6  */

'use strict';

(function () {
  let isStorageSupport = true;
  let storageName = '';
  let storagePros = '';
  let storageCons = '';
  let storageComment = '';
  let storageRaitng = '';

  try {
    storageName = localStorage.getItem('userName');
    storageCons = localStorage.getItem('cons');
    storagePros = localStorage.getItem('pros');
    storageComment = localStorage.getItem('comment');
    storageRaitng = localStorage.getItem('raitingValue');
  } catch (err) {
    isStorageSupport = false;
  }

  window.storage = {
    isSupport: isStorageSupport,
    name: storageName,
    cons: storageCons,
    pros: storagePros,
    comment: storageComment,
    raiting: storageRaitng,
  };

})();
