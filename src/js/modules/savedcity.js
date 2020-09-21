function saveCity(obj) {
  localStorage.setItem('savedCity', JSON.stringify(obj));
}

function saveCountry(index) {
  localStorage.setItem('savedCountry', JSON.stringify({index: index.toString()}));
}

function getSavedCountry() {
  if (localStorage.getItem('savedCountry')) {
    return JSON.parse(localStorage.getItem('savedCountry'));
  } else {
    return {
      index: '',
    }
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
    }
  }
}

export {getSavedCity, saveCity, saveCountry, getSavedCountry};