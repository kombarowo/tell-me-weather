import Select from "./select";
import Request from "../services/request";
import {saveCity} from "./savedcity";

export default class CitySelect extends Select {
  constructor(idSelector, options) {
    super(idSelector, options);

    if (this.selectedIndex) {
      console.log('da')
      this.setCity('', this.data[this.selectedIndex].id, this.selectedIndex);
    }
    this.$status = document.querySelector(options.status);
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
      setStatus: this.setStatus
    })
      .getData()
      .then(cityInfo => {
        saveCity({id: this.selectedCity.id, index: this.selectedCity.index, name: this.selectedCity.name});
        window.dispatchEvent(cityIsSelected);
        setTimeout(() => {
          this.currentCityInfo = cityInfo;
          window.dispatchEvent(cityIsSelected);
          this.setStatus('done');
        }, 500)
      })
  }

  setStatus(status) {
    switch (status) {
      case 'request': {
        // if (citySelect) {
        //   citySelect.$el.classList.add('hidden--op');
        //   weatherInfo.classList.add('hidden--op');
        // }
        this.$status.classList.add('requesting');
        break;
      }
      case 'done': {
        // if (citySelect) {
        //   citySelect.$el.classList.remove('hidden--op');
        //   weatherInfo.classList.remove('hidden--op');
        // }
        this.$status.classList.remove('requesting');
        break;
      }
      case 'error': {
        const errorMessage = document.createElement('div')
        errorMessage.classList.add('error');
        errorMessage.textContent = 'Something went wrong, try again later...';
        this.$status.parentNode.insertAdjacentElement('beforebegin', errorMessage)
        this.$status.setAttribute('src', 'assets/img/error.webp');
        break;
      }
    }
  }
}