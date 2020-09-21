import Select from "./select";
import Request from "../services/request";
import {saveCountry} from "./savedcity";

export default class CountrySelect extends Select {
  constructor(idSelector, options) {
    super(idSelector, options);
  }

  setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener('click', this.clickHandler);

    if (this.selectedIndex) {
      this.setCountry('', this.data[this.selectedIndex].id, this.selectedIndex);
    }

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

  setCountry(e = '', cntryId = '', cntryIndex = '') {
    const countryIsSelected = new CustomEvent('countryIsSelected', {bubbles: true, cancelable: false});
    const countryId = cntryId ? cntryId : e.target.dataset.id;
    const countryIndex = cntryIndex ? cntryIndex : this.data.findIndex(item => item.id === countryId).toString();
    this.selectedCountry = {id: countryId, index: countryIndex};

    this.setStatus('request');
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
        setTimeout(() => {
          saveCountry(countryIndex);
          this.cityListByCountry = clearSortCityList;
          this.setStatus('done');
          window.dispatchEvent(countryIsSelected);
        }, 500)
      })
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