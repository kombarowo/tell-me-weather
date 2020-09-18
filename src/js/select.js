'use strict'

export default class Select {
  constructor(idSelector, options) {
    this.$el = document.getElementById(idSelector);
    this.search = options.search;
    this.data = options.data;
    this.selectedIndex = options.selectedIndex;

    this.render()
    this.$list = this.$el.querySelector(options.list);
    this.$input = this.$el.querySelector(options.input);

    this.setup()
  }

  render() {
    this.$el.innerHTML = this.getTemplate();
  }

  setup() {
    this.$el.addEventListener('click', (e) => this.onClick.call(this, e));
    this.$input.addEventListener('input', (e) => this.onInput.call(this, e));

    window.addEventListener('click', (e) => this.closeByOverlay.call(this, e));
  }

  closeByOverlay(e) {
    if (!e.target.closest(`#${this.$el.getAttribute('id')}`)) {
      this.close()
    }
  }

  onClick(e) {
    switch (e.target.dataset.type) {
      case 'input': {
        if (this.selectedIndex) {
          this.selectItem(this.data[this.selectedIndex].id.toString())
        }
        this.open()
        break
      }
      case 'item': {
        this.selectItem(e.target.dataset.id.toString())
      }
    }
  }

  selectItem(id) {
    const items = this.$list.querySelectorAll('li');
    const newSelectedIndex = Array.from(items).findIndex(item => item.dataset.id === id);
    const selectItem = items[newSelectedIndex];

    items[this.selectedIndex].classList.remove('selected');
    items[newSelectedIndex].classList.add('selected');
    this.selectedIndex = newSelectedIndex;

    switch (this.$input.tagName) {
      case 'DIV': {
        this.$input.textContent = items[newSelectedIndex].textContent.trim();
        break;
      }
      case 'INPUT': {
        this.$input.value = items[newSelectedIndex].textContent.trim();
        break;
      }
    }

    this.close();

    setTimeout(() => {
      this.$list.scrollTop = selectItem.offsetTop - this.$list.offsetHeight / 2 + selectItem.offsetHeight
    }, 0);
  }

  onInput(e) {
    this.open()
    const items = this.$list.querySelectorAll('li')
    const searchValue = e.target.value.toLowerCase().trim();

    const searchItem = Array.from(items)
      .find(item => item.textContent.toLowerCase().trim().startsWith(searchValue))

    if (searchItem) {
      this.$list.scrollTop = searchItem.offsetTop - this.$list.offsetHeight / 2 + searchItem.offsetHeight
    }
  }

  // toggle() {
  //   this.isOpened() ? this.close() : this.open()
  // }

  open() {
    this.$list.classList.add('opened')
  }

  close() {
    this.$list.classList.remove('opened')
  }

  isOpened() {
    return (this.$list.classList.contains('opened')) ? true : false;
  }

  destroy() {
    this.$el.removeEventListener('click', this.onClick);
    this.$input.removeEventListener('input', this.onInput);
    this.$el.remove();
    window.removeEventListener('click', this.closeByOverlay);
  }

  getTemplate() {
    const {data, search, selectedIndex} = this

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
          <div class="select-input" data-type="input">${data[selectedIndex].name}</div>
          <ul class="select-list">${list.join('')}</ul>
      `
    }
  }

  isSelected(id) {
    return (id === this.selectedIndex) ? 'selected' : '';
  }
}



