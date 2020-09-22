export default function setAnimateItems() {
  const items = document.querySelectorAll('[data-animate]');
  items.forEach(item => {
    item.classList.add('animated');
  })
  console.log(items);
}
