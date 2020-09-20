import 'custom-event-polyfill';
import 'element-closest-polyfill';
import 'whatwg-fetch';
import '../css/style.scss';
import CountrySelect from "./modules/country-select";
import CitySelect from "./modules/city-select";
import Dat from "./services/data-methods";
import {getSavedCountry, getSavedCity} from "./modules/savedcity";

window.addEventListener('DOMContentLoaded', function () {


  const countrySelect = new CountrySelect('country', {
    list: '.select-list',
    input: '.select-input',
    search: false,
    status: '.status',
    data: [
      {id: 'ru', name: 'Russia'},
      {id: 'ua', name: 'Ukraine'},
      {id: 'by', name: 'Belarus'},
    ],
    selectedIndex: getSavedCountry().index
  });

  window.addEventListener('countryIsSelected', createCityList);
  window.addEventListener('cityIsSelected', createWeatherByCity);

  let citySelect;
  function createCityList() {
    if (citySelect) {
      citySelect.destroy();
    }
    citySelect = new CitySelect('city', {
      list: '.select-list',
      input: '.select-input',
      search: true,
      status: '.status',
      data: countrySelect.cityListByCountry,
      selectedIndex: getSavedCity().index,
    })
  }

  function convertTemp(t) {
    return Math.floor(t - 273.15);
  }

  function createWeatherByCity() {
    console.log('da')
    const info = citySelect.currentCityInfo;
    if (!info) {
      return;
    }

    let {current: {sunrise, sunset}, timezone_offset} = info;
    const timezoneOffset = timezone_offset / 3600;
    sunrise = new Dat(sunrise).getDate().toLocaleTimeString();
    sunset = new Dat(sunset).getDate().toLocaleTimeString();
    let data = [];
    info.hourly.forEach(item => {
      let {dt, temp, wind_speed, weather: [{main, icon}],} = item;
      data.push({
        date: new Dat(dt).getDate().toLocaleString(),
        temp: convertTemp(temp),
        wind: wind_speed,
        desc: main,
        icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
      })
    })
  }
});


// const countryIsReady = new CustomEvent('countryIsReady', { bubbles: true, cancelable: false });

// renderCountries.then(() => {
//   countrySelect.$list.addEventListener('click', selectCountry);
//   countrySelect.$list.addEventListener('countryIsReady', () => {
//     citySelect.$list.children[getSavedCityProps(savedCity).cityNum].click();
//   });
//
//   countrySelect.$list.children[getSavedCityProps(savedCity).countryId].click();
// });

// wrapper.addEventListener('click', function (e) {
//   if (e.target.closest('#city') && e.target.tagName === 'LI') {
//     const cityId = e.target.dataset.id
//     const cityNum = citySelect.data.findIndex(item => item.id == cityId)
//
//     selectCity(cityId, cityNum)
//   }
// })

// function getSavedCityProps(saved) {
//   if (Object.keys(saved).length <= 2) {
//     return {
//       cityId: 0,
//       cityNum: 0,
//       country: 0,
//       countryId: 0,
//     };
//   } else {
//     return saved;
//   }
// }

// function selectCountry(e) {
//   const country = e.target.dataset.id;
//   const countryId = countrySelect.data.findIndex(item => item.id === country).toString();
//
//   if (countryId != savedCity.countryId) {
//     savedCity.cityNum = '0';
//     savedCity.cityId = '0';
//   }
//
//   setStatus(statusImg, 'request');
//   getRequest(`assets/json/city.${country.toLowerCase()}.list.json`)
//     .then(list => {
//       list = list.sort(sortByName);
//       list = clearCityes(list);
//       setTimeout(() => {
//         if (citySelect) {
//           citySelect.destroy()
//         }
//         document.querySelector('.weather__select').insertAdjacentHTML('beforeend', '<div id="city"></div>')
//         citySelect = new Select('city', {
//           list: '.select-list',
//           input: '.select-input',
//           search: true,
//           // selectedIndex: getSavedCityProps(savedCity).cityNum,
//           data: list
//         })
//         setStatus(statusImg, 'done');
//         savedCity.country = country;
//         savedCity.countryId = countryId;
//         countrySelect.$list.dispatchEvent(countryIsReady);
//       }, 500);
//     })
//     .catch(e => {
//       return;
//     })
// }

// function selectCity(cityId, cityNum) {
//   savedCity.cityId = cityId.toString();
//   savedCity.cityNum = cityNum.toString();
//
//   setStatus(statusImg, 'request');
//   getRequest(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apikey}`)
//     .then(res => {
//       if (!res) {
//         return;
//       }
//       setTimeout(() => {
//         setStatus(statusImg, 'done');
//         weatherInfo.innerHTML = createWeatherInfo(res);
//
//         storage.setItem('savedCity', JSON.stringify(savedCity));
//       }, 500);
//     })
// }

// function setStatus(el, status) {
//   switch (status) {
//     case 'request': {
//       if (citySelect) {
//         citySelect.$el.classList.add('hidden--op');
//         weatherInfo.classList.add('hidden--op');
//       }
//       el.setAttribute('src', 'assets//img/spin.gif');
//       break;
//     }
//     case 'done': {
//       if (citySelect) {
//         citySelect.$el.classList.remove('hidden--op');
//         weatherInfo.classList.remove('hidden--op');
//       }
//       el.setAttribute('src', '');
//       break;
//     }
//     case 'error': {
//       const errorMessage = document.createElement('div')
//       errorMessage.classList.add('error');
//       errorMessage.textContent = 'Something went wrong, try again later...';
//       el.parentNode.insertAdjacentElement('beforebegin', errorMessage)
//       el.setAttribute('src', 'assets/img/error.webp');
//       break;
//     }
//   }
// }

// async function getRequest(url) {
//
//   const req = await fetch(url);
//   if (!req.ok) {
//     setStatus(statusImg, 'error');
//     return;
//   }
//   return await req.json();
// }


