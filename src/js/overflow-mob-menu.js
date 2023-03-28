const menuContainer = document.querySelector('.menu__container');
const bodyEl = document.querySelector('body')

menuContainer.addEventListener('click', (event) => {
  if (menuContainer.classList.contains('.is-open')) {
    bodyEl.classList.add('.is-modal');
  } else {
    bodyEl.classList.remove('.is-modal');
  }
});

