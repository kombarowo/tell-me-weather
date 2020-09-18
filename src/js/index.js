import 'custom-event-polyfill';
import 'element-closest-polyfill';
import 'whatwg-fetch';
import '../css/style.scss';
import Select from "./modules/select";
import CountrySelect from "./modules/country-select";

'use strict';

const
  apikey = 'f6e1a268304df81602c77e0e849a6eba',
  storage = localStorage,
  savedCity = (localStorage.getItem('savedCity')) ? JSON.parse(storage.getItem('savedCity')) : {};

//DOM Elements
let countrySelect, citySelect;

const
  wrapper = document.querySelector('.weather__select'),
  statusImg = document.querySelector('.status img'),
  weatherInfo = document.querySelector('.weather__info');

const renderCountries = new Promise((resolve, reject) => {
  countrySelect = new CountrySelect('country', {
    list: '.select-list',
    input: '.select-input',
    search: false,
    // selectedIndex: getSavedCityProps(savedCity).countryId,
    data: [
      { id: 'ru', name: 'Russia' },
      { id: 'ua', name: 'Ukraine' },
      { id: 'by', name: 'Belarus' },
    ]
  })

  resolve()
})

const countryIsReady = new CustomEvent('countryIsReady', { bubbles: true, cancelable: false });

renderCountries.then(() => {
  countrySelect.$list.addEventListener('click', selectCountry);
  countrySelect.$list.addEventListener('countryIsReady', () => {
    // citySelect.$list.children[getSavedCityProps(savedCity).cityNum].click();
  });

  // countrySelect.$list.children[getSavedCityProps(savedCity).countryId].click();
});

wrapper.addEventListener('click', function (e) {
  if (e.target.closest('#city') && e.target.tagName === 'LI') {
    const cityId = e.target.dataset.id
    const cityNum = citySelect.data.findIndex(item => item.id == cityId)

    selectCity(cityId, cityNum)
  }
})

function getSavedCityProps(saved) {
  if (Object.keys(saved).length <= 2) {
    return {
      cityId: 0,
      cityNum: 0,
      country: 0,
      countryId: 0,
    };
  } else {
    return saved;
  }
}

function selectCountry(e) {
  const country = e.target.dataset.id;
  const countryId = countrySelect.data.findIndex(item => item.id === country).toString();

  if (countryId != savedCity.countryId) {
    savedCity.cityNum = '0';
    savedCity.cityId = '0';
  }

  setStatus(statusImg, 'request');
  getRequest(`assets/json/city.${country.toLowerCase()}.list.json`)
    .then(list => {
      list = list.sort(sortByName);
      list = clearCityes(list);
      setTimeout(() => {
        if (citySelect) {
          citySelect.destroy()
        }
        document.querySelector('.weather__select').insertAdjacentHTML('beforeend', '<div id="city"></div>')
        citySelect = new Select('city', {
          list: '.select-list',
          input: '.select-input',
          search: true,
          // selectedIndex: getSavedCityProps(savedCity).cityNum,
          data: list
        })
        setStatus(statusImg, 'done');
        savedCity.country = country;
        savedCity.countryId = countryId;
        countrySelect.$list.dispatchEvent(countryIsReady);
      }, 500);
    })
    .catch(e => {
      return;
    })
}

function selectCity(cityId, cityNum) {
  savedCity.cityId = cityId.toString();
  savedCity.cityNum = cityNum.toString();

  setStatus(statusImg, 'request');
  getRequest(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apikey}`)
    .then(res => {
      if (!res) {
        return;
      }
      setTimeout(() => {
        setStatus(statusImg, 'done');
        weatherInfo.innerHTML = createWeatherInfo(res);

        storage.setItem('savedCity', JSON.stringify(savedCity));
      }, 500);
    })
}

function setStatus(el, status) {
  switch (status) {
    case 'request': {
      if (citySelect) {
        citySelect.$el.classList.add('hidden--op');
        weatherInfo.classList.add('hidden--op');
      }
      el.setAttribute('src', 'assets//img/spin.gif');
      break;
    }
    case 'done': {
      if (citySelect) {
        citySelect.$el.classList.remove('hidden--op');
        weatherInfo.classList.remove('hidden--op');
      }
      el.setAttribute('src', '');
      break;
    }
    case 'error': {
      const errorMessage = document.createElement('div')
      errorMessage.classList.add('error');
      errorMessage.textContent = 'Something went wrong, try again later...';
      el.parentNode.insertAdjacentElement('beforebegin', errorMessage)
      el.setAttribute('src', 'assets/img/error.webp');
      break;
    }
  }
}

async function getRequest(url) {

  const req = await fetch(url);
  if (!req.ok) {
    setStatus(statusImg, 'error');
    return;
  }
  return await req.json();
}

function sortByName(a, b) {
  if (a.name > b.name) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  return 0;
}

function clearCityes(arr) {
  const newArr = arr.filter(city => city.name != '-' && !city.name.match(/[а-я]/))
  return newArr
}

function createWeatherInfo(obj) {
  if (!obj) {
    return;
  }

  let {
    name,
    main: { temp },
    wind: { speed },
    weather: [{ main, icon }],
    sys: { sunrise, sunset }
  } = obj;

  temp = convertTemp(temp);
  speed = `${speed} m/s`;
  icon = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  sunrise = new Date(convertTimeStamp(sunrise)).toLocaleTimeString();
  sunset = new Date(convertTimeStamp(sunset)).toLocaleTimeString();

  let html = `
		<h1 class="weather__title">${name}</h1>
		<div class="weather__image">
			<img src="${icon}" alt="weather-image">
		</div>
		<div class="weather__row">
			<div class="desc">${main}</div>
			<div class="temp">${temp} &#8451;</div>
			<div class="wind">Wind speed: ${speed}</div>
			<div class="sunrise">Sunrise: ${sunrise}</div>
			<div class="sunset">Sunset: ${sunset}</div>
		</div>
	`
  return html;
}

function convertTemp(t) {
  return Math.floor(t - 273.15);
}

function convertTimeStamp(ts) {
  return ts * 1000;
}


