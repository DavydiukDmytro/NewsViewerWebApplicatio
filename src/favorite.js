// функція додавання класу is-active в залежності від переданого значення від 1-3
import { setActiveLink } from './js/is-active';
// Додав функцію яка записую і повертає данні з localStorage
import { save, load } from './js/storage';
import { createMarkUp } from './js/markup';
import { themeCheck } from './js/themecheck';
//import функції відображання помилки та її зникнення
import { showPageNotFound, hidePageNotFound } from './js/not-found';

themeCheck();

const refsFavoriet = {
    sectionNews: document.querySelector('.section-news'),
}

let arrayCardNewsFavorite = [];
let arrayCardNewsRead = [];

arrayCardNewsFavorite = load('favorite');
arrayCardNewsRead = load('read');

if (arrayCardNewsFavorite.length < 1) {
  showPageNotFound('Sorry, but there is nothing here yet!');
}

setActiveLink(2);

const markp2 = createMarkUp(arrayCardNewsFavorite);
refsFavoriet.sectionNews.innerHTML = markp2;


refsFavoriet.sectionNews.addEventListener('click', onClickInSectionNews);
function onClickInSectionNews(e) {
  const button = e.target.closest('button');
  const li = e.target.closest('li');
    if (button) {
    const buttonId = button.dataset.id;
    const buttonDataAttribute = button.dataset.favorite;
    if (buttonDataAttribute === 'true') {
      const indexCard = arrayCardNewsFavorite.findIndex(card => String(card.id) === buttonId);
      arrayCardNewsFavorite.splice(indexCard, 1);
      button.children[1].dataset.favorite = 'false';
      button.children[2].dataset.favorite = 'false';
      button.dataset.favorite = 'false';
      button.children[0].textContent = 'Add to favorite';
      save('favorite', arrayCardNewsFavorite);
      let array1 = arrayCardNewsRead;
      arrayCardNewsRead = array1.map(element => {
        if (String(element.id) === buttonId) {
          element.favorite = "false";
        }
        return element
      });
      save('read', arrayCardNewsRead);
    } 
      e.target.closest('li').remove();
      if (arrayCardNewsFavorite.length < 1){
        showPageNotFound('Sorry, but there is nothing here yet!');
      }
  }
  if (e.target.nodeName === 'A') {
    const linkId = e.target.dataset.ida;
    const linkDataAttribute = e.target.dataset.read;
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    if (linkDataAttribute === 'true') {
      const indexCard = arrayCardNewsRead.findIndex(card => String(card.id) === linkId);
      arrayCardNewsRead[indexCard].readed_date = formattedDate;
      save('read', arrayCardNewsRead);
    } else {
      const cardNewRead = arrayCardNewsFavorite.find(card => String(card.id) === linkId);
      cardNewRead.read = true;

      let array2 = arrayCardNewsFavorite;
      arrayCardNewsFavorite = array2.map(element => {
        if (String(element.id) === linkId) {
          element.read = "true";
        }
        return element
      });
      save('favorite', arrayCardNewsFavorite);

      cardNewRead.readed_date = formattedDate;
      e.target.dataset.read = 'true';
      arrayCardNewsRead.push(cardNewRead);
      li.dataset.read = 'true';
      save('read', arrayCardNewsRead);
    }
  }
}

//Открытие мобильного меню 

(() => {
const btnMenu = document.querySelector("[data-menu-button]");
  const menuContainer = document.querySelector("[data-menu]");
  const body1 = document.querySelector('body');
  

btnMenu.addEventListener("click", () => {
const expanded =
btnMenu.getAttribute("aria-expanded") === "true" || false;

btnMenu.classList.toggle("is-open");
btnMenu.setAttribute("aria-expanded", !expanded);

  menuContainer.classList.toggle("is-open");
  body1.classList.toggle('scroll');
});
})();

//запрет скролла при открытии моб меню 

const menuContainer = document.querySelector('.menu__container');
const bodyEl = document.querySelector('body')

menuContainer.addEventListener('click', (event) => {
if (menuContainer.classList.contains('.is-open')) {
bodyEl.classList.add('.is-modal');
} else {
bodyEl.classList.remove('.is-modal');
}
});