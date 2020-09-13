'use strict'

class Select {
  constructor(selector, options) {
    this.$el = document.getElementById(selector)
    this.options = options

    this.#render()
    this.#setup()

    this.selectedId = options.selectedId
  }

  #render() {
    const { data, selectedId, search } = this.options

    this.$el.innerHTML = getTemplate(data, selectedId, search)
  }

  #setup() {
    this.onClick = this.onClick.bind(this)
    this.onInput = this.onInput.bind(this)
    this.closeByOverlay = this.closeByOverlay.bind(this)
    this.$list = this.$el.querySelector(this.options.list)
    this.$input = this.$el.querySelector(this.options.input)

    this.$el.addEventListener('click', this.onClick)
    this.$input.addEventListener('input', this.onInput)
    window.addEventListener('click', this.closeByOverlay)
  }

  closeByOverlay(e) {
    if (!e.target.closest(`#${this.$el.getAttribute('id')}`)) {
      this.close()
    }
  }

  onClick(e) {
    const { type } = e.target.dataset

    switch (type) {
      case 'input': {
        if (this.options.selectedId) {
          this.selectItem(this.options.data[this.selectedId].id)
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
      const selectedId = this.options.data[searchItem.dataset.id]
      const currentScroll = searchItem.offsetTop - this.$list.offsetHeight / 2 + searchItem.offsetHeight
      this.$list.scrollTop = currentScroll
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
}

function getTemplate(data, selectedId = '', search) {
  const list = data.map((item, idx) => {
    return `
      <li class="select-item ${isSelected(idx, selectedId)}" data-id="${item.id}" data-type="item">${item.name}</li>
    `
  })

  let value;
  if (selectedId) {
    value = data[selectedId].name;
  } else {
    value = 'Choose...'
  }

  if (search) {
    return `<input class="select-input" value="${value}" placeholder="Choose..." type="text" data-type="input"><ul class="select-list">${list.join('')}</ul>`
  } else {
    return `<div class="select-input" data-type="input">${value}</div><ul class="select-list">${list.join('')}</ul>`
  }
}

function isSelected(id, selectedId) {
  if (id == selectedId) {
    return 'selected'
  } else {
    return ''
  }
}



