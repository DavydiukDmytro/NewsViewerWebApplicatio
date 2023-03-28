import { newsMarkUp, dateFormating } from './markup';
import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

const accordionEl = document.querySelector('.wrapper'); // <=Change selector

accordionEl.innerHTML = createAccordionHeadlines(ARRAY); // <=Change argument

const containersEl = document.querySelectorAll('.accordion-container');
const accordionsArr = Array.from(containersEl);

const Accordion = new Accordion(accordionsArr, {
  duration: 600,
  showMultiple: true,
  onOpen: function (currentElement) {
    console.log('ON OPEN');
    console.log(currentElement);
  },
});

function createAccordionHeadlines(data) {
  return data
    .map(elem => elem.readed_date)
    .filter((date, index, array) => array.indexOf(date) === index)
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
  const filteredNews = parsedArray.filter(obj => obj.readed_date === date);
  console.log(filteredNews);
  return filteredNews
    .map(function (elem) {
      return newsMarkUp(elem); // <=== Made export from Markup file
    })
    .join('');
}
