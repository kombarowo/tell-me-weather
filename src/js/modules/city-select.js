import Select from "./select";
import Request from "../services/request";
import {getSavedCity, saveCity, getSavedCountry} from "./savedcity";

export default class CitySelect extends Select {
  constructor(idSelector, options) {
    super(idSelector, options);
    this.$status = document.querySelector(options.status);

    if (this.selectedIndex) {
      this.setCity('', this.data[this.selectedIndex].id, this.selectedIndex);
    }
  }

  onClick(e) {
    switch (e.target.dataset.type) {
      case 'input': {
        if (this.selectedIndex) {
          this.setScroll()
        }
        this.open();
        break;
      }
      case 'item': {
        this.selectItem(e.target.dataset.id.toString());
        this.setCity(e);
        break;
      }
    }
  }

  setCity(e = '', cId = '', cIndex = '') {
    const cityIsSelected = new CustomEvent('cityIsSelected', {bubbles: true, cancelable: false});
    const cityId = cId ? cId : e.target.dataset.id.toString();
    const cityIndex = cIndex ? cIndex : this.data.findIndex(item => item.id.toString() === cityId).toString();
    this.selectedCity = {
      id: cityId,
      index: cityIndex,
      name: e ? e.target.textContent.trim() : this.data[this.selectedIndex].name,
      lon: this.selectedItem.coord.lon,
      lat: this.selectedItem.coord.lat,
    };

    this.setStatus('request');
    new Request('https://api.openweathermap.org/data/2.5/onecall?' +
      `lat=${this.selectedCity.lat}` +
      `&lon=${this.selectedCity.lon}` +
      '&exclude=daily&appid=f6e1a268304df81602c77e0e849a6eba', {
      sendingMessage: 'request',
      successMessage: 'done',
      errorMessage: 'error',
    })
      .getData()
      .then(cityInfo => {
        const city = getSavedCity();
        city.index = this.selectedCity.index;
        city.id = this.selectedCity.id;
        city.name = this.selectedCity.name
        city.countryIndex = getSavedCountry().index;
        saveCity(city);
        setTimeout(() => {
          this.currentCityInfo = cityInfo;
          window.dispatchEvent(cityIsSelected);
          this.setStatus('done');
        }, 500)
      })
  }
}