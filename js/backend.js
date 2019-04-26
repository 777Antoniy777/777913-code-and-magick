'use strict';
(function () {
  var Url = {
    GET: 'https://js.dump.academ/code-and-magick/data',
    POST: 'https://js.dump.academy/code-and-magick'
  };

  var Datacode = {
    SUCCESS: 200,
    INVALID_REQUEST: 400,
    NOT_AUTHORIZED: 401,
    NOT_FOUND: 404
  };

  var TimeoutValue = {
    GET_VALUE: 10000,
    POST_VALUE: 3000
  };

  // Функция получения данных с сервера
  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    // обработчик на загрузку данных при неуспешном запросе
    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case Datacode.SUCCESS:
          onLoad(xhr.response);
          break;

        case Datacode.INVALID_REQUEST:
          error = 'Неверный запрос';
          break;
        case Datacode.NOT_AUTHORIZED:
          error = 'Пользователь не авторизован';
          break;
        case Datacode.NOT_FOUND:
          error = 'Ничего не найдено';
          break;

        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    // обработчик на данные при ошибке соединения
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    // обработчик на данные при превышении длительности ожидания
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TimeoutValue.GET_VALUE;

    // открытие и отправка xhr
    xhr.open('GET', Url.GET);
    xhr.send();
  };

  // Функция отправки данных на сервер
  // var save = function (data, onLoad, onError) {
  //   var xhr = new XMLHttpRequest();
  //   xhr.responseType = 'json';

  //   xhr.addEventListener('load', function () {
  //     if (xhr.status === Datacode.SUCCESS) {
  //       onLoad(xhr.response);
  //     } else {
  //       onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
  //     }
  //   });

  //   xhr.addEventListener('error', function () {
  //     onError('Произошла ошибка соединения');
  //   });

  //   xhr.addEventListener('timeout', function () {
  //     onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
  //   });

  //   xhr.timeout = TimeoutValue.POST_VALUE;

  //   xhr.open('POST', Url.POST);
  //   xhr.send(data);
  // };

  // глобальный вызов
  window.backend = {
    // функции
    load: load
    // save: save
  };
})();
