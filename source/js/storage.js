/*  eslint no-var: "error"  */
/*  eslint-env es6  */

'use strict';

(function () {
  let isStorageSupport = true;
  let storageName = '';
  let storagePros = '';
  let storageCons = '';
  let storageComment = '';
  let storageRating = '';

  try {
    storageName = localStorage.getItem('userName');
    storageCons = localStorage.getItem('cons');
    storagePros = localStorage.getItem('pros');
    storageComment = localStorage.getItem('comment');
    storageRating = localStorage.getItem('rating');
  } catch (err) {
    isStorageSupport = false;
  }

  window.storage = {
    isSupport: isStorageSupport,
    name: storageName,
    cons: storageCons,
    pros: storagePros,
    comment: storageComment,
    rating: storageRating,
  };

})();
