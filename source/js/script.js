'use strict';

(function () {
  const header = document.querySelector('.header');
  const main = document.querySelector('.main');
  const headerHeight = header.offsetHeight;

  window.addEventListener('scroll', () => {
    let scrollDistance = window.scrollY;
  
    header.classList.add('header--fixed');
    main.style.marginTop = `${headerHeight}px`;  
     
    if (scrollDistance === 0) {
      header.classList.remove('header--fixed');
      main.style.marginTop = null;
    }

  });

  var menu = document.querySelector('.menu');
  var menuToggle = document.querySelector('.main-nav__toggle');

  menu.classList.remove('menu--nojs');

  if (menuToggle) {
    menuToggle.addEventListener('click', function (evt) {
      if (menu) {
        evt.currentTarget.classList.toggle('main-nav__toggle--active');
        menu.classList.toggle('menu--opened');
      }
    });
  }

  if (window.$) {
    var $ = window.$;

    var noticeSlider = $('.notice__slider');
    noticeSlider.slick({
      dots: true,
      arrows: true
    });

    $(window).on('load resize', function(e){
        var initLib = $('.objects__slider').data('init-slider');
      
        if(window.innerWidth < 768){
          
          if(initLib != 1){            
            $('.objects__slider').slick({
              arrows: false,
              dots: false,
              slidesToShow: 1,
              slidesToScroll: 1,
              // centerMode: true,
              variableWidth: true              
            }).data({'init-slider': 1});
          }
        }
        
        else {          
          if(initLib == 1){            
            $('.objects__slider').slick('unslick').data({'init-slider': 0});
          }
        }
      })
  }  

  var newsSlider = $('.news__slider');
    newsSlider.slick({
      slidesToShow: 3,
      slidesToScroll: 3,
      dots: false,
      arrows: true,
      responsive: [{
        breakpoint: 1190,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }]
    });

    var minMoving = false;
    var maxMoving = false;

    document.addEventListener('mouseup', function (evt) {
        minMoving = false;
        maxMoving = false;
        if (!evt.target.closest('.custom-select')) {
          closeAllSelects();
        }
    });

    var selectButtons = document.querySelectorAll('.custom-select__title');
      selectButtons.forEach(function (button) {
        button.addEventListener('click', function (evt) {
          var select = evt.target.closest('.custom-select');
          if (select.classList.contains('select-opened')) {
            select.classList.remove('select-opened');
          } else {
            select.classList.add('select-opened');
          }
        });
      });  

    var selectOptions = document.querySelectorAll('.custom-select li');
        selectOptions.forEach(function (option) {
            option.addEventListener('click', function (evt) {
            var select = evt.target.closest('.custom-select');
            select.classList.remove('select-opened');
            var selectedValue = evt.target.getAttribute('data-value');
            var hidden = document.querySelector('#' + select.id + ' input[type=hidden]');
            hidden.value = selectedValue;

            var button = document.querySelector('#' + select.id + ' .custom-select__title');
            button.innerHTML = selectedValue;

            var lis = document.querySelectorAll('#' + select.id + ' li');
            lis.forEach(function (li) {
                li.classList.remove('selected');
            });
            evt.target.classList.add('selected');
            });
    });

    var selects = document.querySelectorAll('.custom-select');

    function closeAllSelects() {
        selects.forEach(function (select) {
        select.classList.remove('select-opened');
        });
    }

    document.onkeydown = function (evt) {
        evt = evt || window.event;
        if (evt.keyCode === 27) {
        closeAllSelects();
        }
    };

    if ('NodeList' in window && !NodeList.prototype.forEach) {
      console.info('polyfill for IE11');
      NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
          callback.call(thisArg, this[i], i, this);
        }
      };
    }
  
    var answersToggles = document.querySelectorAll('.answers__accordeon-container button');
    var answersSections = document.querySelectorAll('.answers__section div');
  
    answersToggles.forEach(function (toggle) {
      toggle.addEventListener('click', onToggleClicked);
    });
  
    function onToggleClicked(e) {
      var section = e.target.closest('.answers__accordeon-container').parentElement;
      if (section.classList.contains('answers__accordeon-container--opened')) {
        section.classList.remove('answers__accordeon-container--opened');
      } else {
          answersSections.forEach(function (section) {
              section.classList.remove('answers__accordeon-container--opened');
        });
        section.classList.add('answers__accordeon-container--opened');
      }
    }

    let center = [59.909829, 30.522930];

    function init() {
        let map = new ymaps.Map('map', {
            center: center,
            zoom: 17
        });
    
        let placemark = new ymaps.Placemark(center, {}, {
            iconLayout: 'default#image',
            iconImageHref: '../img/icon-map.svg',
            iconImageSize: [24.98, 32.63],
            iconImageOffset: [-30, -20]
        });
    
        map.controls.remove('geolocationControl'); // удаляем геолокацию
      map.controls.remove('searchControl'); // удаляем поиск
      map.controls.remove('trafficControl'); // удаляем контроль трафика
      map.controls.remove('typeSelector'); // удаляем тип
      map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
      map.controls.remove('zoomControl'); // удаляем контрол зуммирования
      map.controls.remove('rulerControl'); // удаляем контрол правил
      // map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
    
        map.geoObjects.add(placemark);
    }
    
    ymaps.ready(init);

})();
