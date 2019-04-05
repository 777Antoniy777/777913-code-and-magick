'use strict';
(function () {
  // Функция получения координат с прокруткой
  function getCoords (elem) { // кроме IE8-
    var rect = elem.getBoundingClientRect();

    return {
      minLeft: rect.left + pageXOffset,
      maxLeft: rect.left + rect.width + pageXOffset,
      minTop: rect.top + pageYOffset,
      maxTop: rect.top + rect.height + pageYOffset
    };

  }
  // глобальный вызов
  window.coords = {
    // функции
    getCoords: getCoords
  };
})();
