'use strict';
(function () {
  // константы
  var WIZARDS_COUNT = 4;

  // временные моковые данные (имена, фамилии, цвета плащей, цвета глаз и цвета файрболов)
  var PERSON_NAME = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];

  var PERSON_SURNAME = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];

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

  var template = document.querySelector('#similar-wizard-template');
  var setupSimilarList = document.querySelector('.setup-similar-list');

  var createWizards = function () {
    var wizards = [];

    for (var i = 0; i < WIZARDS_COUNT; i++) {
      var newWizard = {
        name: window.main.getRandomElement(PERSON_NAME),
        surname: window.main.getRandomElement(PERSON_SURNAME),
        coat: window.main.getRandomElement(COAT_COLOR),
        eyes: window.main.getRandomElement(EYES_COLOR)
      };
      wizards.push(newWizard);
    }
    return wizards;
  };

  var WIZARDS = createWizards();

  // Функция отрисовки волшебников в меню выбора
  var copyWizards = function (arrayWizards) {
    for (var i = 0; i < arrayWizards.length; i++) {
      var setupSimilarItem = template.content.querySelector('.setup-similar-item').cloneNode(true);

      setupSimilarItem.querySelector('.setup-similar-label').textContent = arrayWizards[i].name + ' ' + arrayWizards[i].surname;
      setupSimilarItem.querySelector('.wizard-coat').style.fill = arrayWizards[i].coat;
      setupSimilarItem.querySelector('.wizard-eyes').style.fill = arrayWizards[i].eyes;

      setupSimilarList.appendChild(setupSimilarItem);
    }
  };

  copyWizards(WIZARDS);

  // глобальный вызов
  window.wizards = {
    // переменные
    COAT_COLOR: COAT_COLOR,
    EYES_COLOR: EYES_COLOR,
    FIREBALL_COLOR: FIREBALL_COLOR
  };
})();
