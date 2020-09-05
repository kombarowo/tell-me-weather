"use strict";

//DOM Elements
const selectCountries = document.querySelector('.country');
const selectCyties = document.querySelector('.city');

//Events
selectCountries.addEventListener('input', () => selectCountry(selectCountries));
selectCountry(selectCountries);

function selectCountry(select) {
	const selected = select.selectedIndex;
	const country = select[selected].value;

	getRequest('city.list.json')
		.then(resp => filterListByCountry(resp, country))
		.then(list => {
			selectCyties.classList.remove('hidden');
			selectCyties.innerHTML = createCityList(list);
		})
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

	list.forEach(city => {
		const cityHtml = `
		<option value=${city.id}>${city.name}</option>
		`

		html += cityHtml;
	});

	return html;

}

