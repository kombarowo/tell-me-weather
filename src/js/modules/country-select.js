import Select from "./select";

export default class CountrySelect extends Select {
  constructor(idSelector, options) {
    super(idSelector, options);
  }

  setup() {
    this.$el.addEventListener('click', (e) => this.onClick.call(this, e));

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
    const countryId = e.target.dataset.id;
    const countryIndex = this.data.findIndex(item => item.id === countryId).toString();

    console.log(countryId, countryIndex);
  }
}