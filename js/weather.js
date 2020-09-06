"use strict";

const apikey = 'f6e1a268304df81602c77e0e849a6eba',
	storage = localStorage,
	savedCity = JSON.parse(storage.getItem('savedCity'));

//DOM Elements
const selectCountries = document.querySelector('.country');
const selectCityes = document.querySelector('.city');
const statusImg = document.querySelector('.status img');
const weatherInfo = document.querySelector('.weather__info');

//Events
selectCountries.addEventListener('input', () => selectCountry(selectCountries));

if (Object.keys(savedCity).length > 0) {
	setSavedCity(savedCity);
} else {
	selectCountry(selectCountries);
}

selectCityes.addEventListener('input', () => selectCity(selectCityes));

// Functions
async function setSavedCity(saved) {
	selectCountry(selectCountries, saved);
}

function selectCountry(select, saved = '') {
	let selectId = select.selectedIndex;
	let country = select[selectId].value;

	if (saved) {
		select.selectedIndex = saved.countryId;
		country = saved.country;
	} else {
		savedCity.country = country;
		savedCity.countryId = selectId;
	}

	setStatus(statusImg, 'request');
	getRequest(`/json/city.${country.toLowerCase()}.list.json`)
		.then(resp => filterListByCountry(resp, country))
		.then(list => {
			setTimeout(() => {
				selectCityes.innerHTML = createCityList(list);
				setStatus(statusImg, 'done');
				selectCity(selectCityes, saved);
			}, 500);
		})
		.catch(e => {
			return;
		})
}

function setStatus(el, status) {
	switch (status) {
		case 'request': {
			selectCountries.setAttribute('disabled', '');
			selectCityes.classList.add('hidden');
			weatherInfo.classList.add('hidden');
			el.setAttribute('src', '../img/spin.gif');
			break;
		}
		case 'done': {
			selectCountries.removeAttribute('disabled');
			selectCityes.classList.remove('hidden');
			weatherInfo.classList.remove('hidden');
			el.setAttribute('src', '');
			break;
		}
		case 'error': {
			const errorMessage = document.createElement('div')
			errorMessage.classList.add('error');
			errorMessage.textContent = 'Something went wrong, try again later...';
			el.parentNode.insertAdjacentElement('beforebegin', errorMessage)
			el.setAttribute('src', '../img/error.webp');
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

function filterListByCountry(list, country) {

	return list.filter(city => {
		return city.country === country;
	})

}

function createCityList(list) {

	let html = '';

	let sortlist = list.sort(sortCity);

	sortlist.forEach(city => {

		if (city.name === '-') {
			return;
		}

		const cityHtml = `
		<option value=${city.id}>${city.name}</option>
		`

		html += cityHtml;
	});

	return html;

	function sortCity(a, b) {
		if (a.name > b.name) {
			return 1;
		}
		if (a.name < b.name) {
			return -1;
		}
		return 0;
	}

}

function selectCity(select, saved = '') {
	let selectId = select.selectedIndex;
	let cityId = select[selectId].value;

	if (saved) {
		select.selectedIndex = saved.cityNum;
		selectId = select.selectedIndex;
		cityId = select[selectId].value;
	} else {
		savedCity.cityNum = selectId;
		savedCity.cityId = cityId;
		storage.setItem('savedCity', JSON.stringify(savedCity));
	}

	setStatus(statusImg, 'request');
	getRequest(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apikey}`)
		.then(res => {
			setTimeout(() => {
				setStatus(statusImg, 'done');
				return weatherInfo.innerHTML = createWeatherInfo(res);
			}, 500);
		})
}

function createWeatherInfo(obj) {
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



