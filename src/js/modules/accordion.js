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
        const content = trigger.nextElementSibling;

        if (trigger) {
          this.toggle(content);
        }
      })
    })
  }

  toggle(content) {
    if (content.classList.contains('opened')) {
      content.classList.remove('opened');
      content.style.maxHeight = '0px';
    } else {
      content.classList.add('opened');
      content.style.maxHeight = (content.scrollHeight + 50) + 'px';
    }
  }
}