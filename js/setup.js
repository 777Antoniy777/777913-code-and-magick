'use strict';
(function () {
  var setupWrapper = document.querySelector('.setup');
  var setupSimular = setupWrapper.querySelector('.setup-similar');
  setupSimular.classList.remove('hidden');
  var buttonOpen = document.querySelector('.setup-open');
  var buttonOpenKeydown = document.querySelector('.setup-open-icon');
  buttonOpenKeydown.tabIndex = 0;
  var buttonClose = setupWrapper.querySelector('.setup-close');
  buttonClose.tabIndex = 0;
  var textInput = setupWrapper.querySelector('.setup-user-name');
  var form = setupWrapper.querySelector('.setup-wizard-form');
  form.action = 'https://js.dump.academy/code-and-magick';
  form.name = 'wizard';

  var wizardCoat = setupWrapper.querySelector('.wizard-coat');
  var wizardEyes = setupWrapper.querySelector('.wizard-eyes');
  var wizardFireball = setupWrapper.querySelector('.setup-fireball-wrap');
  var imgStar = document.querySelector('.setup-artifacts-cell img');
  var artifactsCeilShop = document.querySelector('.setup-artifacts-shop .setup-artifacts-cell');
  var artifactsCeils = document.querySelectorAll('.setup-artifacts div');

  // добавление свойства cursor:pointer
  wizardCoat.style.cursor = 'pointer';
  wizardEyes.style.cursor = 'pointer';
  wizardFireball.style.cursor = 'pointer';
  textInput.style.cursor = 'pointer';

  // функция добавление открытия и скрытия окна
  var openWindow = function () {
    var ESCbuttonClickHandler = function (evt) {
      window.openClose.isEscEvent(evt, closeSetup);
    };

    var openSetup = function () {
      setupWrapper.classList.remove('hidden');

      setupWrapper.style.top = 0 + 'px';
      setupWrapper.style.left = 50 + '%';

      textInput.focus();
      document.addEventListener('keydown', ESCbuttonClickHandler);
    };

    var closeSetup = function () {
      setupWrapper.classList.add('hidden');
      document.removeEventListener('keydown', ESCbuttonClickHandler);
    };

    // открытие с помощью мыши
    buttonOpen.addEventListener('click', function (evt) {
      evt.preventDefault();
      openSetup();
    });

    // открытие с помощью клавиши ENTER
    buttonOpenKeydown.addEventListener('keydown', function (evt) {
      window.openClose.isEnterEvent(evt, openSetup);
    });

    // закрытие с помощью мыши
    buttonClose.addEventListener('click', function (evt) {
      evt.preventDefault();
      closeSetup();
    });

    // закрытие с помощью клавиши ENTER
    buttonClose.addEventListener('keydown', function (evt) {
      window.openClose.isEnterEvent(evt, closeSetup);
    });
  };

  openWindow();

  // функция изменения внешних данных персонажа (цвет плаща, глаз, файрбола)
  var setRandomColor = function () {

    var indexCoat = 0;
    wizardCoat.addEventListener('click', function () {
      if (indexCoat === window.wizards.COAT_COLOR.length - 1) {
        indexCoat = 0;
      } else {
        indexCoat++;
      }
      wizardCoat.style.fill = window.wizards.COAT_COLOR[indexCoat];
    });

    var indexEyes = 0;
    wizardEyes.addEventListener('click', function () {
      if (indexEyes === window.wizards.EYES_COLOR.length - 1) {
        indexEyes = 0;
      } else {
        indexEyes++;
      }
      wizardEyes.style.fill = window.wizards.EYES_COLOR[indexEyes];
    });

    var indexFireball = 0;
    wizardFireball.addEventListener('click', function () {
      if (indexFireball === window.wizards.FIREBALL_COLOR.length - 1) {
        indexFireball = 0;
      } else {
        indexFireball++;
      }
      wizardFireball.style.backgroundColor = window.wizards.FIREBALL_COLOR[indexFireball];
    });
  };

  setRandomColor();

  // функция drag&drop для предмета инвентаря
  imgStar.addEventListener('mousedown', function (evt) {

    var ceil = document.querySelectorAll('.setup-artifacts div');

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

              // imgStar.style.top = (-window.coords.getCoords(artifactsCeils[i]).minTop) + 'px';
              // imgStar.style.left = (-window.coords.getCoords(artifactsCeils[i]).minLeft) + 'px';
            }
            // else if (i === 0) {
            //   artifactsCeilShop.appendChild(imgStar);
            //   imgStar.style.position = 'static';
            // } else {
            //   artifactsCeils[i-1].appendChild(imgStar);
            //   imgStar.style.position = 'static';
            // }
          }
        };
        imgStar.addEventListener('click', preventDefaultClickHandler);
      }
    };

    document.addEventListener('mousemove', imgMoveHandler);
    document.addEventListener('mouseup', imgUpHadler);
  });

  // глобальный вызов
  window.setup = {
    // переменные
    setupWrapper: setupWrapper,
    textInput: textInput
  };
})();
