export default class Accordion {
  constructor(wrapper = '', {trigger = '', content = ''} = {}) {
    this.$wrappers = document.querySelectorAll(wrapper);
    this.$triggers = document.querySelectorAll(trigger);
    this.trigger = trigger;
    this.content = content;

    this.setup();
  }

  setup() {
    this.closeAll = this.closeAll.bind(this);

    this.$wrappers.forEach(item => {
      item.addEventListener('click', (e) => {
        const trigger = e.target.closest(this.trigger) ? e.target.closest(this.trigger) : '';
        const content = trigger.nextElementSibling;
        if (trigger) {
          this.closeAll();
          content.classList.toggle('opened');
          content.style.maxHeight = (content.scrollHeight + 50) + 'px';
        }
      })
    })
  }

  closeAll() {
    this.$triggers.forEach(item => {
      const content = item.nextElementSibling;
      content.classList.remove('opened');
      content.style.maxHeight = '';
    })
  }
}