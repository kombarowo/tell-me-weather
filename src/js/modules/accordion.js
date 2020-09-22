export default class Accordion {
  constructor(wrapper = '', {trigger = '', content = ''} = {}) {
    this.$wrappers = document.querySelectorAll(wrapper);
    this.trigger = trigger;
    this.content = content;

    this.setup();
  }

  setup() {
    this.$wrappers.forEach(item => {
      item.addEventListener('click', (e) => {
        const trigger = e.target.closest(this.trigger) ? e.target.closest(this.trigger) : '';
        const wrapper = trigger.nextElementSibling ? trigger.nextElementSibling : '';

        if (trigger) {
          this.toggle(wrapper);
        }
      })
    })
  }

  toggle(content) {
    if (content.classList.contains('opened')) {
      content.classList.remove('opened');
      content.style.maxHeight = '0';
    } else {
      content.classList.add('opened');
      content.style.maxHeight = (content.scrollHeight + 50) + 'px';
    }
  }
}