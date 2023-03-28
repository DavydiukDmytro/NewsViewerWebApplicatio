import { newsMarkUp, dateFormating } from './js/markup';
import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';
// функція додавання класу is-active в залежності від переданого значення від 1-3
import { setActiveLink } from './js/is-active';
// Додав функцію яка записую і повертає данні з localStorage
import { save, load } from './js/storage';
import { themeCheck } from './js/themecheck';
themeCheck();
setActiveLink(3);
const accordionEl = document.querySelector('.wrapper'); // <=Change selector
let arrayNews = [];


arrayNews = load('read');
let arrayCardNewsReadStorage = arrayNews.map(element => {
  element.read = 'read';
  return element
});

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
