'use strict';
(function () {
  // функция валидации инпута
  var validateInput = function () {
    var InputValue = {
      MIN_LENGTH: 2,
      MAX_LENGTH: 25,
    };

    window.setup.textInput.minLength = InputValue.MIN_LENGTH;
    window.setup.textInput.maxLength = InputValue.MAX_LENGTH;
    window.setup.textInput.required = 'required';

    window.setup.textInput.addEventListener('invalid', function (evt) {
      var target = evt.target;
      if (target.validity.tooShort) {
        target.setCustomValidity('Ваше имя слишком короткое');
      } else if (target.validity.tooLong) {
        target.setCustomValidity('Слишком длинное имя');
      } else if (target.validity.valueMissing) {
        target.setCustomValidity('Введите имя персонажа');
      } else if (!target.value.match(/[а-яА-ЯёЁa-zA-Z]/g)) {
        target.setCustomValidity('Требуется как минимум 1 буква');
      } else {
        target.setCustomValidity('');
      }
    });

    window.setup.textInput.addEventListener('input', function (evt) {
      var target = evt.target;
      if (target.value.length < InputValue.MIN_LENGTH) {
        target.setCustomValidity('Ваше имя слишком короткое');
      } else if (target.value.length > InputValue.MAX_LENGTH) {
        target.setCustomValidity('Слишком длинное имя');
      } else if (!target.value.match(/[а-яА-ЯёЁa-zA-Z]/g)) {
        target.setCustomValidity('Требуется как минимум 1 буква');
      } else {
        target.setCustomValidity('');
      }
    });
  };

  validateInput();
})();
