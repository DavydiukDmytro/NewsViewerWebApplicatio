import { category } from "./category";
import customSelect from 'custom-select';// кастомний Select https://github.com/custom-select/custom-select

export function setupNewsSection() {

  const NEWS_ITEMS_COUNT = { desktop: 6, tablet: 3, }; //створюємо об'єкт з кількістю item для desktop та tablet
  const availableCategories = category.slice(); //створюємо копію масиву category
  let randomIndex = ``; //створюємо змінну в яку потім запишемо рандомний індекс

  const sectionList = document.querySelector('.section-categories__list');
  const selectList = document.querySelector(`#mySelect`);

  if (!selectList && !sectionList) {
    return; 
  } //робимо перевірку для уникнення помилки

  function mathRandomIndex(array) {
      return Math.floor(Math.random() * array.length);
    } //функція повертає рандомне число від 0 до останнього в масиві

  function categoryRandomDisplayName(array) {
      randomIndex = mathRandomIndex(availableCategories);
      return array[randomIndex].display_name;
    } //функція записує а randomIndex рандомне число та повертає значення display_name

  function addNewsItems(num) {  
      for (let i = 0; i < num; i++) {
        const li = document.createElement('li');
        li.classList.add('news-section__item');
        sectionList.prepend(li);
          li.innerHTML = `<button>${categoryRandomDisplayName(availableCategories)}</button>`;
          availableCategories.splice(randomIndex, 1);
    }
  } //функція створює елемент та додає в item значення display_name та видаляє обьєкт з display_name з масиву availableCategories

  function addSelects(array) {
      for (let i = 0; i < array.length; i++) {
        const option = document.createElement('option');
        option.classList.add('news-section__selects');
        selectList.prepend(option);
          option.innerHTML = `<option value="${array[i].display_name}" >${array[i].display_name}</option>`;    
    }
} //функція створює елементи та додає в option значення всіх display_name які залишились в масиву availableCategories

  if (window.innerWidth >= 1280) {
    addNewsItems(NEWS_ITEMS_COUNT.desktop);
    addSelects(availableCategories); 
  } else if (window.innerWidth >= 768) {
    addNewsItems(NEWS_ITEMS_COUNT.tablet);
    addSelects(availableCategories); 
  } else if (window.innerWidth < 767) {
    let selectEl = document.querySelector('#mySelect option[value="others"]');
    selectEl.textContent = 'Categories';
    addSelects(availableCategories);
  } // умова перевіряє розмір вікна та викликає функції для створення елементів з відповідними умовами
}
