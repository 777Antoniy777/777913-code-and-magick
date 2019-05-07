'use strict';
(function () {
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

      var Coord = {
        isMinLeft: window.coords.getCoords(window.setup.setupWrapper).minLeft < window.coords.getCoords(window.wizards.body).minLeft,
        isMaxLeft: window.coords.getCoords(window.setup.setupWrapper).maxLeft > window.coords.getCoords(window.wizards.body).maxLeft,
        isMinTop: window.coords.getCoords(window.setup.setupWrapper).minTop < window.coords.getCoords(window.wizards.body).minTop,
        isMaxTop: window.coords.getCoords(window.setup.setupWrapper).maxTop > window.coords.getCoords(window.wizards.body).maxTop
      };
      console.log(window.coords.getCoords(window.setup.setupWrapper).maxLeft, window.coords.getCoords(window.wizards.body).maxLeft);

      if (Coord.isMinLeft) {
        window.setup.setupWrapper.style.left = 0 + '%';
      } else if (Coord.isMinTop) {
        window.setup.setupWrapper.style.top = 0 + '%';
      } else if (Coord.isMaxLeft) {
        // window.setup.setupWrapper.style.right = 100 + '%';
        // window.setup.setupWrapper.style.left = 100 + '%';
        window.setup.setupWrapper.style.right = '';
        window.setup.setupWrapper.style.left = '';
      } else {
        window.setup.setupWrapper.style.top = (window.setup.setupWrapper.offsetTop - continueCoords.y) + 'px';
        window.setup.setupWrapper.style.left = (window.setup.setupWrapper.offsetLeft - continueCoords.x) + 'px';
      }

      // window.setup.setupWrapper.style.top = (window.setup.setupWrapper.offsetTop - continueCoords.y) + 'px';
      // window.setup.setupWrapper.style.left = (window.setup.setupWrapper.offsetLeft - continueCoords.x) + 'px';
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

