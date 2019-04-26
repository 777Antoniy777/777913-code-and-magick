'use strict';
(function () {
  var imgStar = document.querySelector('.setup-artifacts-cell img');
  // var artifactsCeilShop = document.querySelector('.setup-artifacts-shop .setup-artifacts-cell');
  var artifactsCeils = document.querySelectorAll('.setup-artifacts div');

  // функция drag&drop для предмета инвентаря
  imgStar.addEventListener('mousedown', function (evt) {

    evt.preventDefault();

    var isDragged = false;

    imgStar.style.position = 'absolute';
    imgStar.style.zIndex = 1000;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var imgMoveHandler = function (moveEvt) {
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

      imgStar.style.top = (imgStar.offsetTop - continueCoords.y) + 'px';
      imgStar.style.left = (imgStar.offsetLeft - continueCoords.x) + 'px';
    };

    var imgUpHadler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', imgMoveHandler);
      document.removeEventListener('mouseup', imgUpHadler);

      if (isDragged) {
        var preventDefaultClickHandler = function (evt) {
          evt.preventDefault();
          imgStar.removeEventListener('click', preventDefaultClickHandler);

          for (var i = 0; i < artifactsCeils.length; i++) {
            var Coord = {
              isMinLeft: startCoords.x > window.coords.getCoords(artifactsCeils[i]).minLeft,
              isMaxLeft: startCoords.x < window.coords.getCoords(artifactsCeils[i]).maxLeft,
              isMinTop: startCoords.y > window.coords.getCoords(artifactsCeils[i]).minTop,
              isMaxTop: startCoords.y < window.coords.getCoords(artifactsCeils[i]).maxTop
            };

            if (Coord.isMinLeft && Coord.isMaxLeft && Coord.isMinTop && Coord.isMaxTop) {
              artifactsCeils[i].appendChild(imgStar);
              imgStar.style.position = 'static';
              imgStar.style.top = '';
              imgStar.style.left = '';
            }
          }
        };
        imgStar.addEventListener('click', preventDefaultClickHandler);
      }
    };

    document.addEventListener('mousemove', imgMoveHandler);
    document.addEventListener('mouseup', imgUpHadler);
  });
})();
