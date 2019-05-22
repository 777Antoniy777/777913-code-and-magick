'use strict';
(function () {
  var TimeoutValue = {
    WIZARDS: 500 // ms
  };

  var lastTimeout;
  window.debounce = function (updateCb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    // debounce для смены цвета плаща
    lastTimeout = window.setTimeout(updateCb, TimeoutValue.WIZARDS);
  };

  // window.debounce = function (updateCb) {
  //   var lastTimeout = null;

  //   return function () {
  //     var parameters = arguments;
  //     if (lastTimeout) {
  //       window.clearTimeout(lastTimeout);
  //     }

  //     // debounce для смены цвета плаща
  //     lastTimeout = window.setTimeout(function () {
  //       updateCb.apply(null, parameters);
  //     }, TimeoutValue.WIZARDS);
  //   };
  // };
})();
