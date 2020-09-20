export default class Menu {
  constructor(element = '', {trigger = '', activeClass = '', triggerActiveClass = ''} = {}) {
    this.$el = document.querySelector(element);
    this.$trigger = document.querySelector(trigger);
    this.activeClass = activeClass;
    this.triggerActiveClass = triggerActiveClass;

    this.setup();
  }

  setup() {
    this.toggle = this.toggle.bind(this);
    this.$trigger.addEventListener('click', this.toggle);
  }

  toggle() {
    if (this.$el.classList.contains(this.activeClass)) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.$el.classList.add(this.activeClass);
    this.$trigger.classList.add(this.triggerActiveClass);
  }

  close() {
    this.$el.classList.remove(this.activeClass);
    this.$trigger.classList.remove(this.triggerActiveClass);
  }
}