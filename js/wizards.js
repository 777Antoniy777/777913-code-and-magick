'use strict';
(function () {
  // константы
  var WIZARDS_COUNT = 4;

  // данные (имена, фамилии, цвета плащей, цвета глаз и цвета файрболов)
  var COAT_COLOR = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var EYES_COLOR = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  var FIREBALL_COLOR = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var templateSimilar = document.querySelector('#similar-wizard-template');
  var setupSimilarList = document.querySelector('.setup-similar-list');
  var templateError = document.querySelector('#message-error').content;
  var templateErrorWrapper = templateError.querySelector('.setup-error');
  var templateErrorDiscription = templateError.querySelector('.setup-discription');
  templateErrorWrapper.style.width = 50 + '%';
  templateErrorWrapper.style.height = 50 + '%';
  templateErrorWrapper.style.position = 'absolute';
  templateErrorWrapper.style.left = 50 + '%';
  templateErrorWrapper.style.top = 50 + '%';
  templateErrorWrapper.style.zIndex = 10;
  templateErrorWrapper.style.backgroundColor = 'green';
  templateErrorWrapper.style.transform = 'translate(' + '-' + 50 + '%,' + '-' + 50 + '%)';
  // перенеси в dialog.js
  var body = document.querySelector('body');

  // функция отрисовки волшебников в меню выбора
  var onLoad = function (data) {
    for (var i = 0; i < WIZARDS_COUNT; i++) {
      var objIndex = window.main.getRandomElement(data);
      var setupSimilarItem = templateSimilar.content.querySelector('.setup-similar-item').cloneNode(true);

      setupSimilarItem.querySelector('.setup-similar-label').textContent = objIndex.name;
      setupSimilarItem.querySelector('.wizard-coat').style.fill = objIndex.colorCoat;
      setupSimilarItem.querySelector('.wizard-eyes').style.fill = objIndex.colorEyes;

      setupSimilarList.appendChild(setupSimilarItem);
    }
  };

  var onError = function (error) {
    // console.error(error);
    body.appendChild(templateError);
    templateErrorDiscription.textContent = error;
  };

  // вызов функции отрисовки волшебников и показа ошибок
  window.backend.load(onLoad, onError);

  // глобальный вызов
  window.wizards = {
    // переменные
    COAT_COLOR: COAT_COLOR,
    EYES_COLOR: EYES_COLOR,
    FIREBALL_COLOR: FIREBALL_COLOR
  };
})();
