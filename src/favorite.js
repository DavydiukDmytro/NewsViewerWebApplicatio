// функція додавання класу is-active в залежності від переданого значення від 1-3
import { setActiveLink } from './js/is-active';
// Додав функцію яка записую і повертає данні з localStorage
import { save, load } from './js/storage';
import { createMarkUp } from './js/markup';
import { themeCheck } from './js/themecheck';

const refsFavoriet = {
    sectionNews: document.querySelector('.section-news'),
}

let arrayCardNewsFavorite = [];

arrayCardNewsFavorite = load('favorite');
console.log(arrayCardNewsFavorite);

setActiveLink(2);

const markp2 = createMarkUp(arrayCardNewsFavorite);
refsFavoriet.sectionNews.innerHTML = markp2;


refsFavoriet.sectionNews.addEventListener('click', onClickInSectionNews);
function onClickInSectionNews(e) {
  const button = e.target.closest('button');
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
    } 
        e.target.closest('li').remove();
  }
  if (e.target.nodeName === 'A') {
    console.log('A');
  }
}

//Перемикач теми - темна/світла
themeCheck();