export default class Select {
  constructor(idSelector, options) {
    this.$el = document.getElementById(idSelector);
    this.search = options.search;
    this.data = options.data;
    this.selectedIndex = (options.selectedIndex) ? options.selectedIndex : '';
    this.$status = document.querySelector(options.status);

    this.render();
    this.$list = this.$el.querySelector(options.list);
    this.$input = this.$el.querySelector(options.input);

    this.setup();
    try {
      this.selectItem(this.data[this.selectedIndex].id.toString());
    } catch (e) {
    }
  }

  render() {
    this.$el.innerHTML = this.getTemplate();
  }

  setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener('click', this.clickHandler);
    this.$input.addEventListener('input', (e) => this.onInput.call(this, e));

    window.addEventListener('click', (e) => this.closeByOverlay.call(this, e));
  }

  closeByOverlay(e) {
    if (!e.target.closest(`#${this.$el.getAttribute('id')}`)) {
      this.close();
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
        break;
      }
    }
  }

  clickHandler(e) {
    this.onClick(e);
  }

  selectItem(id) {
    const items = this.$list.querySelectorAll('li');
    const newSelectedIndex = Array.from(items).findIndex(item => item.dataset.id === id);
    this.$selectedElement = items[newSelectedIndex];

    try {
      items[this.selectedIndex].classList.remove('selected');
    } catch (e) {
    }
    this.$input.classList.remove('placeholder');
    items[newSelectedIndex].classList.add('selected');
    this.selectedIndex = newSelectedIndex.toString();

    const value = (this.selectedIndex) ? items[newSelectedIndex].textContent.trim() : 'Choose...';
    switch (this.$input.tagName) {
      case 'DIV': {
        this.$input.textContent = value;
        break;
      }
      case 'INPUT': {
        this.$input.value = value;
        break;
      }
    }

    this.selectedItem = this.data[this.selectedIndex];
    // console.log(this.selectedItem);
    this.close();
  }

  setStatus(status) {
    switch (status) {
      case 'request': {
        this.$status.classList.add('requesting');
        document.querySelector('.weather__status').classList.add('active');
        break;
      }
      case 'done': {
        this.$status.classList.remove('requesting');
        document.querySelector('.weather__status').classList.remove('active');
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

  setScroll() {
    setTimeout(() => {
      this.$list.scrollTop = this.$selectedElement.offsetTop - this.$list.offsetHeight / 2 + this.$selectedElement.offsetHeight
    }, 0);
  }

  onInput(e) {
    this.open();
    const items = this.$list.querySelectorAll('li');
    const searchValue = e.target.value.toLowerCase().trim();

    const searchItem = Array.from(items)
      .find(item => item.textContent.toLowerCase().trim().startsWith(searchValue));

    if (searchItem) {
      this.$list.scrollTop = searchItem.offsetTop - this.$list.offsetHeight / 2 + searchItem.offsetHeight;
    }
  }

  open() {
    this.$list.classList.add('opened');
  }

  close() {
    this.$list.classList.remove('opened');
  }

  destroy() {
    this.$el.removeEventListener('click', this.clickHandler);
    this.$input.removeEventListener('input', (e) => this.onInput.call(this, e));
    this.$el.innerHTML = '';

    window.removeEventListener('click', (e) => this.closeByOverlay.call(this, e));
  }

  getTemplate() {
    const {data, search} = this;

    const list = data.map((item, idx) => {
      return `
      <li class="select-item ${this.isSelected(idx)}" data-id="${item.id}" data-type="item">
        ${item.name}
      </li>
    `
    })

    if (search) {
      return `
          <input class="select-input" placeholder="Choose..." type="text" data-type="input">
          <ul class="select-list">${list.join('')}</ul>
      `
    } else {
      return `
          <div class="select-input placeholder" data-type="input">Choose...</div>
          <ul class="select-list">${list.join('')}</ul>
      `
    }
  }

  isSelected(id) {
    return (id === this.selectedIndex) ? 'selected' : '';
  }
}



