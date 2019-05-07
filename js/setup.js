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

  // функции для отправки данных на сервер
  // функция успешной отправки данных
  var onload = function (data) {
    window.wizards.templateErrorWrapper.classList.remove('hidden');
    setupWrapper.classList.add('hidden');
    window.wizards.body.appendChild(window.wizards.templateError);
    window.wizards.templateErrorDiscription.textContent = 'Ваши данные успешно отправлены!';
  };

  // функция показа ошибки в шаблоне
  var onError = function (error) {
    window.wizards.templateErrorWrapper.classList.remove('hidden');
    setupWrapper.classList.add('hidden');
    window.wizards.body.appendChild(window.wizards.templateError);
    window.wizards.templateErrorDiscription.textContent = 'Упс! Что-то пошло не так! Повторите позже';
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    // вызов функции отправки данных на сервер
    window.backend.save(new FormData(form), onload, onError);
  });

  // глобальный вызов
  window.setup = {
    // переменные
    setupWrapper: setupWrapper,
    textInput: textInput
  };
})();
