import Select from "./select";
import Request from "../services/request";

export default class CitySelect extends Select {
  constructor(idSelector, options) {
    super(idSelector, options);

    this.$statusImg = document.querySelector(options.statusImg);
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

  setCity(e) {
    const cityIsSelected = new CustomEvent('cityIsSelected', {bubbles: true, cancelable: false});
    const cityId = e.target.dataset.id.toString();
    const cityIndex = this.data.findIndex(item => item.id.toString() === cityId).toString();
    this.selectedCity = {
      id: cityId,
      index: cityIndex,
      lon: this.selectedItem.coord.lon,
      lat: this.selectedItem.coord.lat,
    };

    new Request('https://api.openweathermap.org/data/2.5/onecall?' +
      `lat=${this.selectedCity.lat}` +
      `&lon=${this.selectedCity.lon}` +
      '&exclude=hourly,daily&appid=f6e1a268304df81602c77e0e849a6eba', {
      sendingMessage: 'request',
      successMessage: 'done',
      errorMessage: 'error',
      setStatus: this.setStatus
    })
      .getData()
      .then(cityInfo => console.log(cityInfo))
  }

  setStatus(status) {
    switch (status) {
      case 'request': {
        if (citySelect) {
          citySelect.$el.classList.add('hidden--op');
          weatherInfo.classList.add('hidden--op');
        }
        this.$statusImg.setAttribute('src', 'assets//img/spin.gif');
        break;
      }
      case 'done': {
        if (citySelect) {
          citySelect.$el.classList.remove('hidden--op');
          weatherInfo.classList.remove('hidden--op');
        }
        this.$statusImg.setAttribute('src', '');
        break;
      }
      case 'error': {
        const errorMessage = document.createElement('div')
        errorMessage.classList.add('error');
        errorMessage.textContent = 'Something went wrong, try again later...';
        this.$statusImg.parentNode.insertAdjacentElement('beforebegin', errorMessage)
        this.$statusImg.setAttribute('src', 'assets/img/error.webp');
        break;
      }
    }
  }
}