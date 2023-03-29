import { newsMarkUp, dateFormating } from './js/markup';
import Accordion from 'accordion-js';

// функція додавання класу is-active в залежності від переданого значення від 1-3
import { setActiveLink } from './js/is-active';
// Додав функцію яка записую і повертає данні з localStorage
import { save, load } from './js/storage';
import { themeCheck } from './js/themecheck';
import { showPageNotFound, hidePageNotFound } from './js/not-found';
themeCheck();
setActiveLink(3);
const accordionEl = document.querySelector('.wrapper'); // <=Change selector
let arrayNews = [];

arrayNews = load('read');
if (arrayNews.length < 1) {
  showPageNotFound('Sorry, but there is nothing here yet!');
}
let arrayCardNewsReadStorage = arrayNews.map(element => {
  element.read = 'read';
  return element;
});
let arrayCardNewsFavorite = [];
arrayCardNewsFavorite = load('favorite');

accordionEl.innerHTML = createAccordionHeadlines(arrayCardNewsReadStorage); // <=Change argument

const containersEl = document.querySelectorAll('.accordion-container');
const accordionsArr = Array.from(containersEl);

const accordion = new Accordion(accordionsArr, {
  duration: 600,
  showMultiple: true,
});

if (arrayCardNewsReadStorage.length < 1) {
  console.log('erorr');
}
const sectionReadRefs = document.querySelector('.section-news');
sectionReadRefs.addEventListener('click', onClickInSectionNews);
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
      let array1 = arrayCardNewsReadStorage;
      arrayCardNewsReadStorage = array1.map(element => {
        element.read = "true";
        if (String(element.id) === buttonId) {
          element.favorite = "false";
        }
        return element
      });
      save('read', arrayCardNewsReadStorage);
    } else {
      const cardNewFavorite = arrayCardNewsReadStorage.find(card => String(card.id) === buttonId);
      cardNewFavorite.favorite = true;
      cardNewFavorite.read = "true";
      arrayCardNewsFavorite.push(cardNewFavorite);
      button.children[1].dataset.favorite = 'true';
      button.children[2].dataset.favorite = 'true';
      button.dataset.favorite = 'true';
      button.children[0].textContent = 'Remove from favoriet';
      save('favorite', arrayCardNewsFavorite);
      let array1 = arrayCardNewsReadStorage;
      arrayCardNewsReadStorage = array1.map(element => {
        element.read = "true";
        if (String(element.id) === buttonId) {
          element.favorite = "true";
        }
        return element
      });
      save('read', arrayCardNewsReadStorage);
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
      const indexCard = arrayCardNewsReadStorage.findIndex(card => String(card.id) === linkId);
      arrayCardNewsReadStorage[indexCard].readed_date = formattedDate;
      let array1 = arrayCardNewsReadStorage;
      arrayCardNewsFavorite = array1.map(element => {
        element.read = "true";
        return element;
      })
      save('read', arrayCardNewsReadStorage);
    }
  }
}

// function arrayFlag(array) {
//     const arr = array.map(element => element.read = 'read');
//     return arr;
// }

function createAccordionHeadlines(data) {
  return data
    .map(elem => elem.readed_date)
    .filter((date, index, array) => {
      return array.indexOf(date) === index;
    })
    .map(elem => {
      return `<div class="accordion-container">
          <div class="ac">
            <span class="ac-header">
              <button type="button" class="ac-trigger">
                ${dateFormating(elem)}
              </button>
            </span>
            <div class="ac-panel"> 
                <ul class="section-news">                      
                ${findNewsAndMarkUp(elem)}  
                </ul>            
            </div>
          </div>
        </div>`;
    })
    .join('');
}

function findNewsAndMarkUp(date) {
  const filteredNews = arrayCardNewsReadStorage.filter(obj => {
    return obj.readed_date === date;
  });
  return filteredNews
    .map(function (elem) {
      return newsMarkUp(elem); // <=== Made export from Markup file
    })
    .join('');
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

// Открытие формы поиска в мобильном меню 


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