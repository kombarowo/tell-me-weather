"use strict";

const apikey = 'f6e1a268304df81602c77e0e849a6eba';

//DOM Elements
const selectCountries = document.querySelector('.country');
const selectCityes = document.querySelector('.city');
const statusImg = document.querySelector('.status img');
const weatherInfo = document.querySelector('.weather__info');

//Events
selectCountries.addEventListener('input', () => selectCountry(selectCountries));
selectCountry(selectCountries);

selectCityes.addEventListener('input', () => selectCity(selectCityes));

//Functions
function selectCountry(select) {
	const selectId = select.selectedIndex;
	const country = select[selectId].value;

	setStatus(statusImg, 'request');
	getRequest('city.list.min.json')
		.then(resp => filterListByCountry(resp, country))
		.then(list => {
			selectCityes.innerHTML = createCityList(list);
			setStatus(statusImg, 'done');
			selectCity(selectCityes);
		})
		.catch(e => {
			console.log(e);
		})
}

function setStatus(el, status) {
	switch (status) {
		case 'request': {
			selectCityes.classList.add('hidden');
			el.setAttribute('src', '../img/spin.gif');
			break;
		}
		case 'done': {
			selectCityes.classList.remove('hidden');
			el.setAttribute('src', '');
			break;
		}
	}
}

async function getRequest(url) {

	const req = await fetch(url);

	if (!req.ok) {
		console.log('error!');
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

function selectCity(select) {
	const selectId = select.selectedIndex;
	const cityId = select[selectId].value;

	getRequest(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apikey}`)
		.then(res => createWeatherInfo(res))
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
	speed = `${speed} м/с`;
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
			<div class="wind">Ветер: ${speed}</div>
			<div class="sunrise">Рассвет: ${sunrise}</div>
			<div class="sunset">Закат: ${sunset}</div>
		</div>
	`
	weatherInfo.innerHTML = html;
}

function convertTemp(t) {
	return Math.floor(t - 273.15);
}

function convertTimeStamp(ts) {
	return ts * 1000;
}



