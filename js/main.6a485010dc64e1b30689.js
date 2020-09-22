/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/css/style.scss":
/*!****************************!*\
  !*** ./src/css/style.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var custom_event_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! custom-event-polyfill */ "./node_modules/custom-event-polyfill/polyfill.js");
/* harmony import */ var custom_event_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(custom_event_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var element_closest_polyfill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! element-closest-polyfill */ "./node_modules/element-closest-polyfill/index.js");
/* harmony import */ var element_closest_polyfill__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(element_closest_polyfill__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _polyfils_foreach__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./polyfils/foreach */ "./src/js/polyfils/foreach.js");
/* harmony import */ var _polyfils_foreach__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_polyfils_foreach__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var whatwg_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! whatwg-fetch */ "./node_modules/whatwg-fetch/fetch.js");
/* harmony import */ var _css_style_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../css/style.scss */ "./src/css/style.scss");
/* harmony import */ var _css_style_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_css_style_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var swiper_swiper_bundle_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! swiper/swiper-bundle.css */ "./node_modules/swiper/swiper-bundle.css");
/* harmony import */ var swiper_swiper_bundle_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(swiper_swiper_bundle_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _modules_country_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/country-select */ "./src/js/modules/country-select.js");
/* harmony import */ var _modules_city_select__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/city-select */ "./src/js/modules/city-select.js");
/* harmony import */ var _services_data_methods__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./services/data-methods */ "./src/js/services/data-methods.js");
/* harmony import */ var _modules_menu__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/menu */ "./src/js/modules/menu.js");
/* harmony import */ var _modules_accordion__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./modules/accordion */ "./src/js/modules/accordion.js");
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! swiper */ "./node_modules/swiper/swiper.esm.js");
/* harmony import */ var _modules_animate__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./modules/animate */ "./src/js/modules/animate.js");
/* harmony import */ var _modules_savedcity__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./modules/savedcity */ "./src/js/modules/savedcity.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }















window.addEventListener('DOMContentLoaded', function () {
  window.addEventListener('countryIsSelected', createCityList);
  window.addEventListener('cityIsSelected', createWeatherByCity);
  var menu = new _modules_menu__WEBPACK_IMPORTED_MODULE_9__["default"]('.header__selects', {
    trigger: '.menu__button',
    triggerActiveClass: 'menu__button--open',
    activeClass: 'opened'
  });
  var countrySelect = new _modules_country_select__WEBPACK_IMPORTED_MODULE_6__["default"]('country', {
    list: '.select-list',
    input: '.select-input',
    status: '.status',
    placeholder: 'Country...',
    data: [{
      id: 'ru',
      name: 'Russia'
    }, {
      id: 'ua',
      name: 'Ukraine'
    }, {
      id: 'by',
      name: 'Belarus'
    }],
    search: false,
    selectedIndex: Object(_modules_savedcity__WEBPACK_IMPORTED_MODULE_13__["getSavedCity"])().countryIndex
  });
  var citySelect;
  resetWeatherStatus();

  function createCityList() {
    resetWeatherStatus();
    var savedCountryIndex = Object(_modules_savedcity__WEBPACK_IMPORTED_MODULE_13__["getSavedCity"])().countryIndex;
    var currentCountryIndex = Object(_modules_savedcity__WEBPACK_IMPORTED_MODULE_13__["getSavedCountry"])().index;
    var cityIndex = savedCountryIndex === currentCountryIndex ? Object(_modules_savedcity__WEBPACK_IMPORTED_MODULE_13__["getSavedCity"])().index : '';

    if (citySelect) {
      citySelect.destroy();
    }

    citySelect = new _modules_city_select__WEBPACK_IMPORTED_MODULE_7__["default"]('city', {
      list: '.select-list',
      input: '.select-input',
      status: '.status',
      placeholder: 'City...',
      search: true,
      data: countrySelect.cityListByCountry,
      selectedIndex: cityIndex
    });
  }

  function createWeatherByCity() {
    resetWeatherStatus();
    var info = citySelect.currentCityInfo;
    var data = [];
    info.hourly.forEach(function (item) {
      var dt = item.dt,
          temp = item.temp,
          wind_speed = item.wind_speed,
          _item$weather = _slicedToArray(item.weather, 1),
          _item$weather$ = _item$weather[0],
          main = _item$weather$.main,
          icon = _item$weather$.icon;

      data.push({
        date: new _services_data_methods__WEBPACK_IMPORTED_MODULE_8__["default"](dt).getDate(),
        temp: convertTemp(temp),
        wind: wind_speed,
        desc: main,
        icon: "https://openweathermap.org/img/wn/".concat(icon, "@2x.png")
      });
    });
    var html = "\n      <h1 class=\"weather__title\">".concat(citySelect.selectedCity.name, "</h1>\n      <div class=\"desc\">").concat(data[0].desc, "</div>\n      <div class=\"temp\">").concat(data[0].temp, "&deg;</div>\n      \n      <div class=\"weather__days\">\n        ").concat(createToday(data), "\n        ").concat(createTomorrow(data), "\n      </div>\n\t  ");
    setWeatherStatus(html);
    new swiper__WEBPACK_IMPORTED_MODULE_11__["default"]('.day--today .day__bottom', {
      wrapperClass: 'day__bottom-wrapper',
      slideClass: 'hour',
      slidesPerView: 5,
      slidesPerGroup: 3,
      breakpoints: {
        500: {
          slidesPerView: 6
        },
        600: {
          slidesPerView: 7
        },
        700: {
          slidesPerView: 8
        }
      },
      grabCursor: true
    });
    new swiper__WEBPACK_IMPORTED_MODULE_11__["default"]('.day--tomorrow .day__bottom', {
      wrapperClass: 'day__bottom-wrapper',
      slideClass: 'hour',
      slidesPerView: 5,
      slidesPerGroup: 3,
      breakpoints: {
        500: {
          slidesPerView: 6
        },
        600: {
          slidesPerView: 7
        },
        700: {
          slidesPerView: 8
        }
      },
      grabCursor: true
    });
    setTimeout(function () {
      menu.close();
    }, 500);
  }

  function createToday(data) {
    var todayDate = data[0].date;
    var todayHours = '',
        maxTemp = -100,
        minTemp = 100;
    data.forEach(function (_ref) {
      var temp = _ref.temp,
          icon = _ref.icon,
          date = _ref.date;

      if (todayDate.getDate() !== date.getDate()) {
        return;
      }

      minTemp = temp < minTemp ? temp : minTemp;
      maxTemp = temp > maxTemp ? temp : maxTemp;
      todayHours += createHour(date.getHours(), icon, temp, true);
    });
    return "\n      <div class=\"day--today day\">\n        <div class=\"day__top\">\n          <div class=\"day__weekday\">".concat(weeks[calcWeekDay(todayDate) - 1], "<sub class=\"day__desc\">Today</sub></div>\n          <div class=\"day__max-temp\">").concat(maxTemp, "&deg;<sub>max</sub></div>\n          <div class=\"day__min-temp\">").concat(minTemp, "&deg;<sub>min</sub></div>\n        </div>\n        <div class=\"day__bottom\" style=\"max-height: 0;\">\n          <div class=\"day__bottom-wrapper\">\n            ").concat(todayHours, "\n          </div>\n        </div>\n      </div>\n    ");
  }

  function createTomorrow(data) {
    var todayDate = data[0].date;
    var tomorrowHours = '',
        maxTemp = -100,
        minTemp = 100,
        tomorrowDate = '';
    data.forEach(function (_ref2) {
      var temp = _ref2.temp,
          icon = _ref2.icon,
          date = _ref2.date;

      if (date.getDate() - todayDate.getDate() !== 1) {
        return;
      }

      tomorrowDate = date;
      minTemp = temp < minTemp ? temp : minTemp;
      maxTemp = temp > maxTemp ? temp : maxTemp;
      tomorrowHours += createHour(date.getHours(), icon, temp, false);
    });
    return "\n      <div class=\"day--tomorrow day\">\n        <div class=\"day__top\">\n          <div class=\"day__weekday\">".concat(weeks[calcWeekDay(tomorrowDate) - 1], "<sub class=\"day__desc\">Tomorrow</sub></div>\n          <div class=\"day__max-temp\">").concat(maxTemp, "&deg;<sub>max</sub></div>\n          <div class=\"day__min-temp\">").concat(minTemp, "&deg;<sub>min</sub></div>\n        </div>\n        <div class=\"day__bottom\" style=\"max-height: 0;\">\n          <div class=\"day__bottom-wrapper\">\n            ").concat(tomorrowHours, "\n          </div>\n        </div>\n      </div>\n    ");
  }

  function createHour(hour, icon, temp, isToday) {
    if (new Date().getHours() === hour && isToday) {
      hour = 'Now';
    }

    return "\n    <div class=\"hour\">\n      <div class=\"day__hour\">".concat(hour, "</div>\n      <div class=\"day__icon\">\n        <img src=\"").concat(icon, "\" alt=\"icon\">\n      </div>\n      <div class=\"day__temp\">").concat(temp, "&deg;</div>\n    </div>\n    ");
  }

  function calcWeekDay(date) {
    return date.getDay() === 0 ? 7 : date.getDay();
  }

  function resetWeatherStatus() {
    if (Object(_modules_savedcity__WEBPACK_IMPORTED_MODULE_13__["getSavedCity"])().index !== '') {
      document.querySelector('.weather__info').innerHTML = '';
    } else {
      Object(_modules_animate__WEBPACK_IMPORTED_MODULE_12__["default"])();
      document.querySelector('.weather__info').innerHTML = "\n      <h2 class=\"weather__greet\">Welcome!</h2>\n      <h3 class=\"weather__text\">\n        Open menu by click the button on the top right side to select your city and get you weather forecast.\n      </h3>\n      <h3 class=\"weather__author\">author: Kombarov Artyom</h3>\n      ";
    }
  }

  function setWeatherStatus(html) {
    document.querySelector('.weather__info').innerHTML = html;
    new _modules_accordion__WEBPACK_IMPORTED_MODULE_10__["default"]('.weather__days', {
      trigger: '.day__top',
      content: '.day__bottom-wrapper'
    });
    Object(_modules_animate__WEBPACK_IMPORTED_MODULE_12__["default"])();
  }

  function convertTemp(t) {
    return Math.floor(t - 273.15);
  }

  var weeks = ['Monday', 'Tuesday', 'Wednesday', 'Thurstday', 'Friday', 'Satturday', 'Sunday'];
});

/***/ }),

/***/ "./src/js/modules/accordion.js":
/*!*************************************!*\
  !*** ./src/js/modules/accordion.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Accordion; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Accordion = /*#__PURE__*/function () {
  function Accordion() {
    var wrapper = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$trigger = _ref.trigger,
        trigger = _ref$trigger === void 0 ? '' : _ref$trigger,
        _ref$content = _ref.content,
        content = _ref$content === void 0 ? '' : _ref$content;

    _classCallCheck(this, Accordion);

    this.$wrappers = document.querySelectorAll(wrapper);
    this.trigger = trigger;
    this.content = content;
    this.setup();
  }

  _createClass(Accordion, [{
    key: "setup",
    value: function setup() {
      var _this = this;

      this.$wrappers.forEach(function (item) {
        item.addEventListener('click', function (e) {
          var trigger = e.target.closest(_this.trigger) ? e.target.closest(_this.trigger) : '';
          var wrapper = trigger.nextElementSibling ? trigger.nextElementSibling : '';

          if (trigger) {
            _this.toggle(wrapper);
          }
        });
      });
    }
  }, {
    key: "toggle",
    value: function toggle(content) {
      if (content.classList.contains('opened')) {
        content.classList.remove('opened');
        content.style.maxHeight = '0';
      } else {
        content.classList.add('opened');
        content.style.maxHeight = content.scrollHeight + 50 + 'px';
      }
    }
  }]);

  return Accordion;
}();



/***/ }),

/***/ "./src/js/modules/animate.js":
/*!***********************************!*\
  !*** ./src/js/modules/animate.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setAnimateItems; });
function setAnimateItems() {
  var items = document.querySelectorAll('[data-animate]');
  items.forEach(function (item) {
    item.classList.add('animated');
  });
}

/***/ }),

/***/ "./src/js/modules/city-select.js":
/*!***************************************!*\
  !*** ./src/js/modules/city-select.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CitySelect; });
/* harmony import */ var _select__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./select */ "./src/js/modules/select.js");
/* harmony import */ var _services_request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/request */ "./src/js/services/request.js");
/* harmony import */ var _savedcity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./savedcity */ "./src/js/modules/savedcity.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





var CitySelect = /*#__PURE__*/function (_Select) {
  _inherits(CitySelect, _Select);

  var _super = _createSuper(CitySelect);

  function CitySelect(idSelector, options) {
    var _this;

    _classCallCheck(this, CitySelect);

    _this = _super.call(this, idSelector, options);
    _this.$status = document.querySelector(options.status);

    if (_this.selectedIndex) {
      _this.setCity('', _this.data[_this.selectedIndex].id, _this.selectedIndex);
    }

    return _this;
  }

  _createClass(CitySelect, [{
    key: "onClick",
    value: function onClick(e) {
      switch (e.target.dataset.type) {
        case 'input':
          {
            if (this.selectedIndex) {
              this.setScroll();
            }

            this.open();
            break;
          }

        case 'item':
          {
            this.selectItem(e.target.dataset.id.toString());
            this.setCity(e);
            break;
          }
      }
    }
  }, {
    key: "setCity",
    value: function setCity() {
      var _this2 = this;

      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var cId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var cIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var cityIsSelected = new CustomEvent('cityIsSelected', {
        bubbles: true,
        cancelable: false
      });
      var cityId = cId ? cId : e.target.dataset.id.toString();
      var cityIndex = cIndex ? cIndex : this.data.findIndex(function (item) {
        return item.id.toString() === cityId;
      }).toString();
      this.selectedCity = {
        id: cityId,
        index: cityIndex,
        name: e ? e.target.textContent.trim() : this.data[this.selectedIndex].name,
        lon: this.selectedItem.coord.lon,
        lat: this.selectedItem.coord.lat
      };
      this.setStatus('request');
      new _services_request__WEBPACK_IMPORTED_MODULE_1__["default"]('https://api.openweathermap.org/data/2.5/onecall?' + "lat=".concat(this.selectedCity.lat) + "&lon=".concat(this.selectedCity.lon) + '&exclude=daily&appid=f6e1a268304df81602c77e0e849a6eba', {
        sendingMessage: 'request',
        successMessage: 'done',
        errorMessage: 'error'
      }).getData().then(function (cityInfo) {
        var city = Object(_savedcity__WEBPACK_IMPORTED_MODULE_2__["getSavedCity"])();
        city.index = _this2.selectedCity.index;
        city.id = _this2.selectedCity.id;
        city.name = _this2.selectedCity.name;
        city.countryIndex = Object(_savedcity__WEBPACK_IMPORTED_MODULE_2__["getSavedCountry"])().index;
        Object(_savedcity__WEBPACK_IMPORTED_MODULE_2__["saveCity"])(city);
        setTimeout(function () {
          _this2.currentCityInfo = cityInfo;
          window.dispatchEvent(cityIsSelected);

          _this2.setStatus('done');
        }, 500);
      });
    }
  }]);

  return CitySelect;
}(_select__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/js/modules/country-select.js":
/*!******************************************!*\
  !*** ./src/js/modules/country-select.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CountrySelect; });
/* harmony import */ var _select__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./select */ "./src/js/modules/select.js");
/* harmony import */ var _services_request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/request */ "./src/js/services/request.js");
/* harmony import */ var _savedcity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./savedcity */ "./src/js/modules/savedcity.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





var CountrySelect = /*#__PURE__*/function (_Select) {
  _inherits(CountrySelect, _Select);

  var _super = _createSuper(CountrySelect);

  function CountrySelect(idSelector, options) {
    _classCallCheck(this, CountrySelect);

    return _super.call(this, idSelector, options);
  }

  _createClass(CountrySelect, [{
    key: "setup",
    value: function setup() {
      var _this = this;

      this.clickHandler = this.clickHandler.bind(this);
      this.$el.addEventListener('click', this.clickHandler);

      if (this.selectedIndex) {
        this.setCountry('', this.data[this.selectedIndex].id, this.selectedIndex);
      }

      window.addEventListener('click', function (e) {
        return _this.closeByOverlay.call(_this, e);
      });
    }
  }, {
    key: "onClick",
    value: function onClick(e) {
      switch (e.target.dataset.type) {
        case 'input':
          {
            if (this.selectedIndex) {
              this.setScroll();
            }

            this.open();
            break;
          }

        case 'item':
          {
            this.selectItem(e.target.dataset.id.toString());
            this.setCountry(e);
            break;
          }
      }
    }
  }, {
    key: "setCountry",
    value: function setCountry() {
      var _this2 = this;

      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var cntryId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var cntryIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var countryIsSelected = new CustomEvent('countryIsSelected', {
        bubbles: true,
        cancelable: false
      });
      var countryId = cntryId ? cntryId : e.target.dataset.id;
      var countryIndex = cntryIndex ? cntryIndex : this.data.findIndex(function (item) {
        return item.id === countryId;
      }).toString();
      this.selectedCountry = {
        id: countryId,
        index: countryIndex
      };
      this.setStatus('request');
      new _services_request__WEBPACK_IMPORTED_MODULE_1__["default"]("assets/json/city.".concat(countryId.toLowerCase(), ".list.json"), {
        sendingMessage: 'request',
        successMessage: 'done',
        errorMessage: 'error'
      }).getData().then(function (unSortCityList) {
        return unSortCityList.sort(_this2.sortByName);
      }).then(function (sortCityList) {
        return _this2.clearCities(sortCityList);
      }).then(function (clearSortCityList) {
        setTimeout(function () {
          Object(_savedcity__WEBPACK_IMPORTED_MODULE_2__["saveCountry"])(countryIndex);
          _this2.cityListByCountry = clearSortCityList;

          _this2.setStatus('done');

          window.dispatchEvent(countryIsSelected);
        }, 500);
      }).catch(function (e) {
        _this2.setStatus('error');
      });
    }
  }, {
    key: "sortByName",
    value: function sortByName(a, b) {
      if (a.name > b.name) {
        return 1;
      }

      if (a.name < b.name) {
        return -1;
      }

      return 0;
    }
  }, {
    key: "clearCities",
    value: function clearCities(arr) {
      return arr.filter(function (city) {
        return city.name !== '-' && !city.name.match(/[а-я]/);
      });
    }
  }]);

  return CountrySelect;
}(_select__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/js/modules/menu.js":
/*!********************************!*\
  !*** ./src/js/modules/menu.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Menu; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Menu = /*#__PURE__*/function () {
  function Menu() {
    var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$trigger = _ref.trigger,
        trigger = _ref$trigger === void 0 ? '' : _ref$trigger,
        _ref$activeClass = _ref.activeClass,
        activeClass = _ref$activeClass === void 0 ? '' : _ref$activeClass,
        _ref$triggerActiveCla = _ref.triggerActiveClass,
        triggerActiveClass = _ref$triggerActiveCla === void 0 ? '' : _ref$triggerActiveCla;

    _classCallCheck(this, Menu);

    this.$el = document.querySelector(element);
    this.$trigger = document.querySelector(trigger);
    this.activeClass = activeClass;
    this.triggerActiveClass = triggerActiveClass;
    this.setup();
  }

  _createClass(Menu, [{
    key: "setup",
    value: function setup() {
      this.toggle = this.toggle.bind(this);
      this.$trigger.addEventListener('click', this.toggle);
    }
  }, {
    key: "toggle",
    value: function toggle() {
      if (this.$el.classList.contains(this.activeClass)) {
        this.close();
      } else {
        this.open();
      }
    }
  }, {
    key: "open",
    value: function open() {
      this.$el.classList.add(this.activeClass);
      this.$trigger.classList.add(this.triggerActiveClass);
    }
  }, {
    key: "close",
    value: function close() {
      this.$el.classList.remove(this.activeClass);
      this.$trigger.classList.remove(this.triggerActiveClass);
    }
  }]);

  return Menu;
}();



/***/ }),

/***/ "./src/js/modules/savedcity.js":
/*!*************************************!*\
  !*** ./src/js/modules/savedcity.js ***!
  \*************************************/
/*! exports provided: getSavedCity, saveCity, saveCountry, getSavedCountry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSavedCity", function() { return getSavedCity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveCity", function() { return saveCity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveCountry", function() { return saveCountry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSavedCountry", function() { return getSavedCountry; });
function saveCity(obj) {
  localStorage.setItem('savedCity', JSON.stringify(obj));
}

function saveCountry(index) {
  localStorage.setItem('savedCountry', JSON.stringify({
    index: index.toString()
  }));
}

function getSavedCountry() {
  if (localStorage.getItem('savedCountry')) {
    return JSON.parse(localStorage.getItem('savedCountry'));
  } else {
    return {
      index: ''
    };
  }
}

function getSavedCity() {
  if (localStorage.getItem('savedCity')) {
    return JSON.parse(localStorage.getItem('savedCity'));
  } else {
    return {
      name: '',
      id: '',
      index: '',
      countryIndex: ''
    };
  }
}



/***/ }),

/***/ "./src/js/modules/select.js":
/*!**********************************!*\
  !*** ./src/js/modules/select.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Select; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Select = /*#__PURE__*/function () {
  function Select(idSelector, options) {
    _classCallCheck(this, Select);

    this.$el = document.getElementById(idSelector);
    this.search = options.search;
    this.data = options.data;
    this.selectedIndex = options.selectedIndex ? options.selectedIndex : '';
    this.$status = document.querySelector(options.status);
    this.placeholder = options.placeholder ? options.placeholder : 'Choose...';
    this.render();
    this.$list = this.$el.querySelector(options.list);
    this.$input = this.$el.querySelector(options.input);
    this.setup();

    try {
      this.selectItem(this.data[this.selectedIndex].id.toString());
    } catch (e) {}
  }

  _createClass(Select, [{
    key: "render",
    value: function render() {
      this.$el.innerHTML = this.getTemplate();
    }
  }, {
    key: "setup",
    value: function setup() {
      var _this = this;

      this.clickHandler = this.clickHandler.bind(this);
      this.$el.addEventListener('click', this.clickHandler);
      this.$input.addEventListener('input', function (e) {
        return _this.onInput.call(_this, e);
      });
      window.addEventListener('click', function (e) {
        return _this.closeByOverlay.call(_this, e);
      });
    }
  }, {
    key: "closeByOverlay",
    value: function closeByOverlay(e) {
      if (!e.target.closest("#".concat(this.$el.getAttribute('id')))) {
        this.close();
      }
    }
  }, {
    key: "onClick",
    value: function onClick(e) {
      switch (e.target.dataset.type) {
        case 'input':
          {
            if (this.selectedIndex) {
              this.setScroll();
            }

            this.open();
            break;
          }

        case 'item':
          {
            this.selectItem(e.target.dataset.id.toString());
            break;
          }
      }
    }
  }, {
    key: "clickHandler",
    value: function clickHandler(e) {
      this.onClick(e);
    }
  }, {
    key: "selectItem",
    value: function selectItem(id) {
      var items = this.$list.querySelectorAll('li');
      var newSelectedIndex = Array.from(items).findIndex(function (item) {
        return item.dataset.id === id;
      });
      this.$selectedElement = items[newSelectedIndex];

      try {
        items[this.selectedIndex].classList.remove('selected');
      } catch (e) {}

      this.$input.classList.remove('placeholder');
      items[newSelectedIndex].classList.add('selected');
      this.selectedIndex = newSelectedIndex.toString();
      var value = this.selectedIndex ? items[newSelectedIndex].textContent.trim() : 'Choose...';

      switch (this.$input.tagName) {
        case 'DIV':
          {
            this.$input.textContent = value;
            break;
          }

        case 'INPUT':
          {
            this.$input.value = value;
            break;
          }
      }

      this.selectedItem = this.data[this.selectedIndex]; // console.log(this.selectedItem);

      this.close();
    }
  }, {
    key: "setStatus",
    value: function setStatus(status) {
      switch (status) {
        case 'request':
          {
            this.$status.classList.add('requesting');
            document.querySelector('.weather__status').classList.add('active');
            break;
          }

        case 'done':
          {
            this.$status.classList.remove('requesting');
            document.querySelector('.weather__status').classList.remove('active');
            break;
          }

        case 'error':
          {
            document.querySelector('.error-wrapper').innerHTML = "\n        <div class=\"error\">Something went wrong, try again later...</div>\n        ";
            document.querySelector('.weather__status').classList.remove('active');
            this.$status.classList.remove('requesting');
            this.$input.classList.add('input--error');
            break;
          }
      }
    }
  }, {
    key: "setScroll",
    value: function setScroll() {
      var _this2 = this;

      setTimeout(function () {
        _this2.$list.scrollTop = _this2.$selectedElement.offsetTop - _this2.$list.offsetHeight / 2 + _this2.$selectedElement.offsetHeight;
      }, 0);
    }
  }, {
    key: "onInput",
    value: function onInput(e) {
      this.open();
      var items = this.$list.querySelectorAll('li');
      var searchValue = e.target.value.toLowerCase().trim();
      var searchItem = Array.from(items).find(function (item) {
        return item.textContent.toLowerCase().trim().startsWith(searchValue);
      });

      if (searchItem) {
        this.$list.scrollTop = searchItem.offsetTop - this.$list.offsetHeight / 2 + searchItem.offsetHeight;
      }
    }
  }, {
    key: "open",
    value: function open() {
      this.$list.classList.add('opened');
    }
  }, {
    key: "close",
    value: function close() {
      this.$list.classList.remove('opened');
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this3 = this;

      this.$el.removeEventListener('click', this.clickHandler);
      this.$input.removeEventListener('input', function (e) {
        return _this3.onInput.call(_this3, e);
      });
      this.$el.innerHTML = '';
      window.removeEventListener('click', function (e) {
        return _this3.closeByOverlay.call(_this3, e);
      });
    }
  }, {
    key: "getTemplate",
    value: function getTemplate() {
      var _this4 = this;

      var data = this.data,
          search = this.search;
      var list = data.map(function (item, idx) {
        return "\n      <li class=\"select-item ".concat(_this4.isSelected(idx), "\" data-id=\"").concat(item.id, "\" data-type=\"item\">\n        ").concat(item.name, "\n      </li>\n    ");
      });

      if (search) {
        return "\n          <input class=\"select-input\" placeholder=\"".concat(this.placeholder, "\" type=\"text\" data-type=\"input\">\n          <ul class=\"select-list\">").concat(list.join(''), "</ul>\n      ");
      } else {
        return "\n          <div class=\"select-input placeholder\" data-type=\"input\">".concat(this.placeholder, "</div>\n          <ul class=\"select-list\">").concat(list.join(''), "</ul>\n      ");
      }
    }
  }, {
    key: "isSelected",
    value: function isSelected(id) {
      return id === this.selectedIndex ? 'selected' : '';
    }
  }]);

  return Select;
}();



/***/ }),

/***/ "./src/js/polyfils/foreach.js":
/*!************************************!*\
  !*** ./src/js/polyfils/foreach.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

if ('NodeList' in window && !NodeList.prototype.forEach) {
  console.info('polyfill for IE11');

  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;

    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

/***/ }),

/***/ "./src/js/services/data-methods.js":
/*!*****************************************!*\
  !*** ./src/js/services/data-methods.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DataMethods; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DataMethods = /*#__PURE__*/function () {
  function DataMethods(timestamp) {
    _classCallCheck(this, DataMethods);

    this.timestamp = timestamp;
  }

  _createClass(DataMethods, [{
    key: "convertFromUnix",
    value: function convertFromUnix(stamp) {
      return stamp * 1000;
    }
  }, {
    key: "getDate",
    value: function getDate() {
      return new Date(this.convertFromUnix(this.timestamp));
    }
  }]);

  return DataMethods;
}();



/***/ }),

/***/ "./src/js/services/request.js":
/*!************************************!*\
  !*** ./src/js/services/request.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Request; });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Request = /*#__PURE__*/function () {
  function Request(url, options) {
    _classCallCheck(this, Request);

    this.url = url;
    this.sendingMessage = options.sendingMessage;
    this.successMessage = options.successMessage;
    this.errorMessage = options.errorMessage;
  }

  _createClass(Request, [{
    key: "getData",
    value: function () {
      var _getData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var req;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch(this.url);

              case 2:
                req = _context.sent;

                if (req.ok) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return");

              case 5:
                _context.next = 7;
                return req.json();

              case 7:
                return _context.abrupt("return", _context.sent);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getData() {
        return _getData.apply(this, arguments);
      }

      return getData;
    }()
  }]);

  return Request;
}();



/***/ }),

/***/ 0:
/*!***********************************************!*\
  !*** multi @babel/polyfill ./src/js/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! @babel/polyfill */"./node_modules/@babel/polyfill/lib/index.js");
module.exports = __webpack_require__(/*! ./src/js/index.js */"./src/js/index.js");


/***/ })

/******/ });
//# sourceMappingURL=main.6a485010dc64e1b30689.js.map