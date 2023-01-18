/** Проверка поддержки webp, добавление класса .webp или .no-webp для HTML */
export function isWebp() {
  // Проверка поддержки webp
  function testWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }
  // добавление класса .webp или .no-webp для HTML
  testWebP(function (support) {
    if (support == true) {
      document.querySelector('html').classList.add('webp');
    } else {
      document.querySelector('html').classList.add('no-webp');
    }
  });
}

// Проверка мобильности устройства
const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

// Удаление указанных классов
export function _removeClasses([...elements], removeClass) {
  elements.forEach((element) => {
    element.classList.remove(removeClass);
  });
}

//  Actions (делегирование события click)
export function documentActions(e) {
  const targetElement = e.target;
  if (window.innerWidth > 768 && isMobile.any()) {
    if (targetElement.classList.contains('menu__arrow')) {
      targetElement.closest('.menu__item').classList.toggle('_hover');
    }
    if (
      !targetElement.classList.contains('menu__arrow') &&
      document.querySelectorAll('.menu__item._hover').length > 0
    ) {
      _removeClasses(document.querySelectorAll('.menu__item._hover'), '_hover');
    }
  }

  if (targetElement.classList.contains('search-form__icon')) {
    document.querySelector('.search-form').classList.toggle('_active');
  } else if (
    !targetElement.closest('.search-form') &&
    document.querySelector('.search-form._active')
  ) {
    document.querySelector('.search-form').classList.remove('_active');
  }
}

// Картинки
export function ibg() {
  let ibg = document.querySelectorAll('._ibg');
  for (var i = 0; i < ibg.length; i++) {
    if (ibg[i].querySelector('img')) {
      ibg[i].style.backgroundImage =
        'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
    }
  }
}