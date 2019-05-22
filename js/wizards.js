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

  var body = document.querySelector('body');
  var templateSimilar = document.querySelector('#similar-wizard-template');
  var setupSimilarList = document.querySelector('.setup-similar-list');
  var templateError = document.querySelector('#template-message').content;
  var templateErrorWrapper = templateError.querySelector('.setup-error');
  var templateErrorDiscription = templateError.querySelector('.setup-discription');

  // стили на окно с ошибкой
  templateErrorWrapper.style.width = 700 + 'px';
  templateErrorWrapper.style.height = 300 + 'px';
  templateErrorWrapper.style.position = 'fixed';
  templateErrorWrapper.style.left = 50 + '%';
  templateErrorWrapper.style.top = 50 + '%';
  templateErrorWrapper.style.zIndex = 10;
  templateErrorWrapper.style.backgroundColor = 'red';
  templateErrorWrapper.style.transform = 'translate(-50%, -50%)';
  templateErrorWrapper.style.boxShadow = '15px 15px rgba(0, 0, 0, 0.8)';
  templateErrorWrapper.style.padding = 50 + 'px';
  templateErrorDiscription.style.width = 500 + 'px';
  templateErrorDiscription.style.textAlign = 'center';
  templateErrorDiscription.style.textTransform = 'uppercase';
  templateErrorDiscription.style.position = 'absolute';
  templateErrorDiscription.style.left = 50 + '%';
  templateErrorDiscription.style.top = 50 + '%';
  templateErrorDiscription.style.transform = 'translate(-50%, -50%)';

  var wizardCoat = document.querySelector('.wizard-coat');
  var wizardEyes = document.querySelector('.wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');

  // добавление свойства cursor:pointer
  wizardCoat.style.cursor = 'pointer';
  wizardEyes.style.cursor = 'pointer';
  wizardFireball.style.cursor = 'pointer';

  // функция удаления первоначальных волшебников
  var removeWizards = function () {
    var setupSimilarItem = setupSimilarList.querySelectorAll('.setup-similar-item');

    setupSimilarItem.forEach(function (elem, i, arr) {
      setupSimilarList.removeChild(elem);
    });
  };

  // функция отрисовки волшебников в меню выбора
  var renderWizards = function (wizards) {
    removeWizards();

    for (var i = 0; i < WIZARDS_COUNT; i++) {
      var setupSimilarItem = templateSimilar.content.querySelector('.setup-similar-item').cloneNode(true);

      setupSimilarItem.querySelector('.setup-similar-label').textContent = wizards[i].name;
      setupSimilarItem.querySelector('.wizard-coat').style.fill = wizards[i].colorCoat;
      setupSimilarItem.querySelector('.wizard-eyes').style.fill = wizards[i].colorEyes;

      setupSimilarList.appendChild(setupSimilarItem);
    }
  };

  // данные с сервера, записанные в переменную, чтобы не качались заново (dataWizards)
  var dataWizards = [];
  var onLoad = function (data) {
    dataWizards = data;
    renderWizards(dataWizards);
  };

  // функция показа ошибки в шаблоне
  var onError = function (error) {
    body.appendChild(templateError);
    templateErrorDiscription.textContent = error;
  };

  // вызов функции отрисовки волшебников и показа ошибок
  window.backend.load(onLoad, onError);

  // функция изменения внешних данных персонажа (цвет плаща, глаз, файрбола)
  var setFilterColor = function () {
    var coatColor;
    var eyesColor;

    var getRank = function (wizard) {
      var rank = 0;

      if (wizard.colorCoat === coatColor) {
        rank += 2;
      }
      if (wizard.colorEyes === eyesColor) {
        rank += 1;
      }

      return rank;
    };

    var updateWizards = function () {
      renderWizards(dataWizards.sort(function (left, right) {
        return getRank(right) - getRank(left);
      }));
    };

    var indexCoat = 0;
    wizardCoat.addEventListener('click', function () {
      if (indexCoat === COAT_COLOR.length - 1) {
        indexCoat = 0;
      } else {
        indexCoat++;
      }
      this.style.fill = COAT_COLOR[indexCoat];
      // запоминаем цвет для фильтра
      coatColor = COAT_COLOR[indexCoat];

      // debounce для смены цвета плаща
      window.debounce(updateWizards);

      // window.debounce(function () {
      //   // запоминаем цвет для фильтра
      //   coatColor = COAT_COLOR[indexCoat];
      //   updateWizards();
      // });
    });

    var indexEyes = 0;
    wizardEyes.addEventListener('click', function () {
      if (indexEyes === EYES_COLOR.length - 1) {
        indexEyes = 0;
      } else {
        indexEyes++;
      }
      this.style.fill = EYES_COLOR[indexEyes];
      // запоминаем цвет для фильтра
      eyesColor = EYES_COLOR[indexEyes];

      // debounce для смены цвета глаз
      window.debounce(updateWizards);
    });

    var indexFireball = 0;
    wizardFireball.addEventListener('click', function () {
      if (indexFireball === FIREBALL_COLOR.length - 1) {
        indexFireball = 0;
      } else {
        indexFireball++;
      }
      this.style.backgroundColor = FIREBALL_COLOR[indexFireball];
    });
  };

  setFilterColor();

  // обработчики на скрытие попаса с сообщением
  var openMessage = function () {

    // обработчик на click
    var isClickEvent = function () {
      templateErrorWrapper.classList.add('hidden');
    };

    window.addEventListener('click', isClickEvent);

    // обработчик на ESC
    var ESCbuttonClickHandler = function (evt) {
      window.openClose.isEscEvent(evt, closeMessage);
    };

    var closeMessage = function () {
      templateErrorWrapper.classList.add('hidden');
      document.removeEventListener('keydown', ESCbuttonClickHandler);
    };

    window.addEventListener('keydown', ESCbuttonClickHandler);
  };

  openMessage();

  // глобальный вызов
  window.wizards = {
    // переменные
    COAT_COLOR: COAT_COLOR,
    EYES_COLOR: EYES_COLOR,
    FIREBALL_COLOR: FIREBALL_COLOR,
    body: body,
    templateError: templateError,
    templateErrorWrapper: templateErrorWrapper,
    templateErrorDiscription: templateErrorDiscription
  };
})();
