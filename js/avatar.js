'use strict';
(function () {
  // расширения файлов
  var FILE_TYPES = [
    'gif',
    'jpg',
    'jpeg',
    'png',
    'webp'
  ];

  var fileChooser = window.dialog.imageHandler.querySelector('input[type="file"]');
  var preview = window.dialog.imageHandler.querySelector('.setup-user-pic');
  var test = document.querySelector('.setup-open img');

  // загружаем в инпут любой файл и проверяем его расширение
  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();
    fileChooser.value = '';

    var matches = FILE_TYPES.includes(function (elem, i, arr) {
      return fileName.endsWith(elem);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
        test.src = reader.result;
      });

      // читаем файл
      reader.readAsDataURL(file);
    } else {
      window.wizards.templateErrorWrapper.classList.remove('hidden');
      window.wizards.body.appendChild(window.wizards.templateError);
      window.wizards.templateErrorDiscription.textContent = 'Используйте файлы с расширением "jpeg", "png", "gif" или "webp"';
    }
  });
})();
