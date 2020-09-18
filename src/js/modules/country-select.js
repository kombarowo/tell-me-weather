import Select from "./select";
import Request from "../services/request";
import CitySelect from "./city-select";

export default class CountrySelect extends Select {
  constructor(idSelector, options) {
    super(idSelector, options);

    this.$statusImg = document.querySelector(options.statusImg);
  }

  setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener('click', this.clickHandler);

    window.addEventListener('click', (e) => this.closeByOverlay.call(this, e));
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
        this.setCountry(e);
        break;
      }
    }
  }

  setCountry(e) {
    const countryIsSelected = new CustomEvent('countryIsSelected', { bubbles: true, cancelable: false });
    const countryId = e.target.dataset.id;
    const countryIndex = this.data.findIndex(item => item.id === countryId).toString();
    this.selectedCountry = {id: countryId, index: countryIndex};

    new Request(`assets/json/city.${countryId.toLowerCase()}.list.json`, {
      sendingMessage: 'request',
      successMessage: 'done',
      errorMessage: 'error',
      setStatus: this.setStatus
    })
      .getData()
      .then(unSortCityList => unSortCityList.sort(this.sortByName))
      .then(sortCityList => this.clearCities(sortCityList))
      .then(clearSortCityList => {
        this.cityListByCountry = clearSortCityList;
        window.dispatchEvent(countryIsSelected);
      })
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

  sortByName(a, b) {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  }

  clearCities(arr) {
    return arr.filter(city => city.name !== '-' && !city.name.match(/[а-я]/));
  }
}