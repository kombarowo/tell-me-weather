'use strict'

export default class Select {
  constructor(idSelector, options) {
    this.$el = document.getElementById(idSelector);
    this.search = options.search;
    this.data = options.data;
    this.selectedId = options.selectedId;

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
    const {type} = e.target.dataset

    switch (type) {
      case 'input': {
        if (this.selectedId) {
          this.selectItem(this.data[this.selectedId].id)
        }
        this.open()
        break
      }
      case 'item': {
        this.selectItem(e.target.dataset.id)
      }
    }
  }

  selectItem(id) {
    const items = this.$list.querySelectorAll('li')
    items[this.selectedId].classList.remove('selected')

    const selectIndex = Array.from(items).findIndex(item => item.dataset.id == id)

    const selectItem = Array.from(items)[selectIndex]
    let currentScroll = selectItem.offsetTop - this.$list.offsetHeight / 2 + selectItem.offsetHeight

    setTimeout(() => {
      currentScroll = selectItem.offsetTop - this.$list.offsetHeight / 2 + selectItem.offsetHeight
      this.$list.scrollTop = currentScroll
    }, 0);

    Array.from(items)[selectIndex].classList.add('selected')

    switch (this.$input.tagName) {
      case 'DIV': {
        this.$input.textContent = Array.from(items)[selectIndex].textContent;
        break;
      }
      case 'INPUT': {
        this.$input.value = Array.from(items)[selectIndex].textContent;
        break;
      }
    }

    this.selectedId = selectIndex

    this.close()
  }

  onInput(e) {
    this.open()
    const searchValue = e.target.value.toLowerCase()
    const items = this.$list.querySelectorAll('li')

    const searchItem = Array.from(items)
      .find(item => item.textContent.toLowerCase().startsWith(searchValue))

    if (searchItem) {
      const selectedId = this.data[searchItem.dataset.id]
      this.$list.scrollTop = searchItem.offsetTop - this.$list.offsetHeight / 2 + searchItem.offsetHeight
    }
  }

  toggle() {
    this.isOpened() ? this.close() : this.open()
  }

  open() {
    this.$list.classList.add('opened')
  }

  close() {
    this.$list.classList.remove('opened')
  }

  isOpened() {
    if (this.$list.classList.contains('opened')) {
      return true
    } else {
      return false
    }
  }

  destroy() {
    this.$el.removeEventListener('click', this.onClick)
    this.$input.removeEventListener('input', this.onInput)
    window.removeEventListener('click', this.closeByOverlay)
    this.$el.remove()
  }

  getTemplate() {
    const {data, search, selectedId} = this

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
          <div class="select-input" data-type="input">${data[selectedId].name}</div>
          <ul class="select-list">${list.join('')}</ul>
      `
    }
  }

  isSelected(id) {
    return (id === this.selectedId) ? 'selected' : '';
  }
}



