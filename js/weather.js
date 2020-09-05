"use strict";

getRequest('city.list.json').then(resp => console.log(filterListByCountry(resp, 'RU')));

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

