import 'custom-event-polyfill';
import 'element-closest-polyfill';
import './polyfils/foreach';
import 'whatwg-fetch';
import '../css/style.scss';
import 'swiper/swiper-bundle.css';
import CountrySelect from "./modules/country-select";
import CitySelect from "./modules/city-select";
import Dat from "./services/data-methods";
import Menu from "./modules/menu";
import Accordion from "./modules/accordion";
import Swiper from 'swiper';
import setAnimateItems from "./modules/animate";
import {getSavedCity, getSavedCountry} from "./modules/savedcity";

window.addEventListener('DOMContentLoaded', function () {
  window.addEventListener('countryIsSelected', createCityList);
  window.addEventListener('cityIsSelected', createWeatherByCity);

  const menu = new Menu('.header__selects', {
    trigger: '.menu__button',
    triggerActiveClass: 'menu__button--open',
    activeClass: 'opened'
  });

  const countrySelect = new CountrySelect('country', {
    list: '.select-list',
    input: '.select-input',
    status: '.status',
    placeholder: 'Country...',
    data: [
      {id: 'ru', name: 'Russia'},
      {id: 'ua', name: 'Ukraine'},
      {id: 'by', name: 'Belarus'},
    ],
    search: false,
    selectedIndex: getSavedCity().countryIndex
  });

  let citySelect;
  resetWeatherStatus();

  function createCityList() {
    resetWeatherStatus();

    const savedCountryIndex = getSavedCity().countryIndex;
    const currentCountryIndex = getSavedCountry().index;
    const cityIndex = (savedCountryIndex === currentCountryIndex) ? getSavedCity().index : '';

    if (citySelect) {
      citySelect.destroy();
    }

    citySelect = new CitySelect('city', {
      list: '.select-list',
      input: '.select-input',
      status: '.status',
      placeholder: 'City...',
      search: true,
      data: countrySelect.cityListByCountry,
      selectedIndex: cityIndex,
    });
  }

  function createWeatherByCity() {
    resetWeatherStatus();

    const info = citySelect.currentCityInfo;
    const data = [];

    info.hourly.forEach(item => {
      let {dt, temp, wind_speed, weather: [{main, icon}],} = item;
      data.push({
        date: new Dat(dt).getDate(),
        temp: convertTemp(temp),
        wind: wind_speed,
        desc: main,
        icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
      });
    });

    let html = `
      <h1 class="weather__title">${citySelect.selectedCity.name}</h1>
      <div class="desc">${data[0].desc}</div>
      <div class="temp">${data[0].temp}&deg;</div>
      
      <div class="weather__days">
        ${createToday(data)}
        ${createTomorrow(data)}
      </div>
	  `

    setWeatherStatus(html);

    new Swiper('.day--today .day__bottom', {
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
        },
      },
      grabCursor: true
    });

    new Swiper('.day--tomorrow .day__bottom', {
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
        },
      },
      grabCursor: true
    });

    setTimeout(() => {
      menu.close();
    }, 500)
  }

  function createToday(data) {
    const {date: todayDate} = data[0];

    let
      todayHours = '',
      maxTemp = -100,
      minTemp = 100;

    data.forEach(({temp, icon, date}) => {
      if (todayDate.getDate() !== date.getDate()) {
        return;
      }

      minTemp = (temp < minTemp) ? temp : minTemp;
      maxTemp = (temp > maxTemp) ? temp : maxTemp;
      todayHours += createHour(date.getHours(), icon, temp, true);
    })

    return `
      <div class="day--today day">
        <div class="day__top">
          <div class="day__weekday">${weeks[calcWeekDay(todayDate) - 1]}<sub class="day__desc">Today</sub></div>
          <div class="day__max-temp">${maxTemp}&deg;<sub>max</sub></div>
          <div class="day__min-temp">${minTemp}&deg;<sub>min</sub></div>
        </div>
        <div class="day__bottom" style="max-height: 0;">
          <div class="day__bottom-wrapper">
            ${todayHours}
          </div>
        </div>
      </div>
    `
  }

  function createTomorrow(data) {
    const {date: todayDate} = data[0];

    let
      tomorrowHours = '',
      maxTemp = -100,
      minTemp = 100,
      tomorrowDate = '';

    data.forEach(({temp, icon, date}) => {
      if ((date.getDate() - todayDate.getDate()) !== 1) {
        return;
      }

      tomorrowDate = date;
      minTemp = (temp < minTemp) ? temp : minTemp;
      maxTemp = (temp > maxTemp) ? temp : maxTemp;
      tomorrowHours += createHour(date.getHours(), icon, temp, false);
    })

    return `
      <div class="day--tomorrow day">
        <div class="day__top">
          <div class="day__weekday">${weeks[calcWeekDay(tomorrowDate) - 1]}<sub class="day__desc">Tomorrow</sub></div>
          <div class="day__max-temp">${maxTemp}&deg;<sub>max</sub></div>
          <div class="day__min-temp">${minTemp}&deg;<sub>min</sub></div>
        </div>
        <div class="day__bottom" style="max-height: 0;">
          <div class="day__bottom-wrapper">
            ${tomorrowHours}
          </div>
        </div>
      </div>
    `
  }


  function createHour(hour, icon, temp, isToday) {
    if (new Date().getHours() === hour && isToday) {
      hour = 'Now';
    }
    return `
    <div class="hour">
      <div class="day__hour">${hour}</div>
      <div class="day__icon">
        <img src="${icon}" alt="icon">
      </div>
      <div class="day__temp">${temp}&deg;</div>
    </div>
    `
  }

  function calcWeekDay(date) {
    return (date.getDay() === 0) ? 7 : date.getDay();
  }

  function resetWeatherStatus() {
    if (getSavedCity().index !== '') {
      document.querySelector('.weather__info').innerHTML = '';
    } else {
      setAnimateItems();
      document.querySelector('.weather__info').innerHTML = `
      <h2 class="weather__greet">Welcome!</h2>
      <h3 class="weather__text">
        Open menu by click the button on the top right side to select your city and get you weather forecast.
      </h3>
      <h3 class="weather__author">author: Kombarov Artyom</h3>
      `
    }
  }

  function setWeatherStatus(html) {
    document.querySelector('.weather__info').innerHTML = html;
    new Accordion('.weather__days', {
      trigger: '.day__top',
      content: '.day__bottom-wrapper'
    });
    setAnimateItems();
  }

  function convertTemp(t) {
    return Math.floor(t - 273.15);
  }

  const weeks = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thurstday',
    'Friday',
    'Satturday',
    'Sunday',
  ]
});

