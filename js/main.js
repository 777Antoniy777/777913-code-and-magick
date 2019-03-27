'use strict';
(function () {
  // Функция рандомных чисел для меняющихся предметов
  var getRandomElement = function (array) {
    var index = Math.round(Math.random() * (array.length - 1));
    return array[index];
  };

  // глобальный вызов
  window.main = {
    // функции
    getRandomElement: getRandomElement
  };
})();
