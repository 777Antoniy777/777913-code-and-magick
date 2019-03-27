'use strict';
(function () {
  // функция валидации инпута
  var validateInput = function () {
    window.setup.textInput.minLength = 2;
    window.setup.textInput.required = 'required';

    window.setup.textInput.addEventListener('invalid', function () {
      if (window.setup.textInput.validity.tooShort) {
        window.setup.textInput.setCustomValidity('Ваше имя слишком короткое');
      } else if (window.setup.textInput.validity.tooLong) {
        window.setup.textInput.setCustomValidity('Слишком длинное имя');
      } else if (window.setup.textInput.validity.valueMissing) {
        window.setup.textInput.setCustomValidity('Введите имя персонажа');
      } else {
        window.setup.textInput.setCustomValidity('');
      }
    });

    window.setup.textInput.addEventListener('input', function (evt) {
      var target = evt.target;
      if (target.value.length < 2) {
        target.setCustomValidity('Ваше имя слишком короткое');
      } else {
        target.setCustomValidity('');
      }
    });
  };

  validateInput();
})();
