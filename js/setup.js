'use strict';
(function () {
  var setupWrapper = document.querySelector('.setup');
  var setupSimular = setupWrapper.querySelector('.setup-similar');
  setupSimular.classList.remove('hidden');

  // Начинаем 4 задание!
  var CODE_BUTTON_ESC = 27;
  var CODE_BUTTON_ENTER = 13;

  var buttonOpen = document.querySelector('.setup-open');
  var buttonOpenKeydown = document.querySelector('.setup-open-icon');
  buttonOpenKeydown.tabIndex = 0;
  var buttonClose = setupWrapper.querySelector('.setup-close');
  buttonClose.tabIndex = 0;
  var textInput = setupWrapper.querySelector('.setup-user-name');

  var form = setupWrapper.querySelector('.setup-wizard-form');
  form.action = 'https://js.dump.academy/code-and-magick';
  form.name = 'wizard';

  // функция добавление открытия и скрытия окна
  var openWindow = function () {
    var ESCbuttonClickHandler = function (evt) {
      if (evt.keyCode === CODE_BUTTON_ESC) {
        evt.preventDefault();
        closeSetup();
      }
    };

    var openSetup = function () {
      setupWrapper.classList.remove('hidden');

      setupWrapper.style.top = 80 + 'px';
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

    // открытие с помощью клавиатуры ENTER
    buttonOpenKeydown.addEventListener('keydown', function (evt) {
      if (evt.keyCode === CODE_BUTTON_ENTER) {
        evt.preventDefault();
        openSetup();
      }
    });

    // закрытие с помощью мыши
    buttonClose.addEventListener('click', function (evt) {
      evt.preventDefault();
      closeSetup();
    });

    // закрытие с помощью клавиатуры ENTER
    buttonClose.addEventListener('keydown', function (evt) {
      if (evt.keyCode === CODE_BUTTON_ENTER) {
        evt.preventDefault();
        closeSetup();
      }
    });
  };

  openWindow();

  // функция изменения параметров по клику мыши
  var wizardCoat = setupWrapper.querySelector('.wizard-coat');
  var wizardEyes = setupWrapper.querySelector('.wizard-eyes');
  var wizardFireball = setupWrapper.querySelector('.setup-fireball-wrap');

  // добавление свойства cursor:pointer
  wizardCoat.style.cursor = 'pointer';
  wizardEyes.style.cursor = 'pointer';
  wizardFireball.style.cursor = 'pointer';
  textInput.style.cursor = 'pointer';

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

  // глобальный вызов
  window.setup = {
    // переменные
    setupWrapper: setupWrapper,
    textInput: textInput
  };
})();
