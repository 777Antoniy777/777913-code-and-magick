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

  // добавление свойства cursor:pointer
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
    textInput: textInput,

    openWindow: openWindow
  };
})();
