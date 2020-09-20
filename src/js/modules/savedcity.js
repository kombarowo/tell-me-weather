function saveCity(obj) {
  localStorage.setItem('savedCity', JSON.stringify(obj));
}

function saveCountry(obj) {
  localStorage.setItem('savedCountry', JSON.stringify(obj));
}

function getSavedCity() {
  if (localStorage.getItem('savedCity')) {
    return JSON.parse(localStorage.getItem('savedCity'));
  } else {
    return {
      name: '',
      id: '',
      index: ''
    }
  }
}

function getSavedCountry() {
  if (localStorage.getItem('savedCountry')) {
    return JSON.parse(localStorage.getItem('savedCountry'));
  } else {
    return {
      index: ''
    }
  }
}

export {getSavedCity, getSavedCountry, saveCity, saveCountry};