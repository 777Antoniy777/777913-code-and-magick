'use strict';
(function () {
  // Начинаем 5 задание!
  // функция перемещение окна с персонажами
  var imageHandler = document.querySelector('.upload');

  imageHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var isDragged = false;

    var imageMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      isDragged = true;

      var continueCoords = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      // вызов из setup.js
      window.setup.setupWrapper.style.top = (window.setup.setupWrapper.offsetTop - continueCoords.y) + 'px';
      window.setup.setupWrapper.style.left = (window.setup.setupWrapper.offsetLeft - continueCoords.x) + 'px';
      //
    };

    var imageUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', imageMoveHandler);
      document.removeEventListener('mouseup', imageUpHandler);

      if (isDragged) {
        var preventDefaultClickHandler = function (evt) {
          evt.preventDefault();
          imageHandler.removeEventListener('click', preventDefaultClickHandler);
        };
        imageHandler.addEventListener('click', preventDefaultClickHandler);
      }
    };

    document.addEventListener('mousemove', imageMoveHandler);
    document.addEventListener('mouseup', imageUpHandler);
  });
})();

