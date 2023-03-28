import { category } from './js/category';
import { Requests } from './js/requests';
import { requestsWeatherPosition, fetchWeather } from './js/weather';
<<<<<<< Updated upstream
=======
//імпорт функції для нормалізації об'єктів та функції яка генерує розмітку
import { concatNewsAndWeather, createMarkUp } from './js/markup';
//import очищає секцію новин
import { clearNewsSection } from './js/clear-news-section';
//import функції відображання помилки та її зникнення
import { showPageNotFound, hidePageNotFound } from './js/not-found';
//import функції яка повертає значення вибраної категорії
// import { selectedCategory } from './js/selected-category';
//Лодаш троттле
import throttle from 'lodash.throttle';
// Додав функцію яка записую і повертає данні з localStorage
import { save, load } from './js/storage';

import { flatpickr } from './js/calendar';
// функція додавання класу is-active в залежності від переданого значення від 1-3
import { setActiveLink } from './js/is-active';
import { themeCheck } from './js/themecheck';

selectedCategory();
>>>>>>> Stashed changes

const API_URL_NEWS = 'https://api.nytimes.com/svc';
const KEY_NEWS = '1XlCr4gRqRG4oQXZ0w6Bhmx7Lrq32aXd';



const refs = {
  btnSearch: document.querySelector('.search-button'),
};

export let weather = {};

let arraySearchArticleNews = [];
let arrayPopuralNews = [];
let arrayCardNews = [];
let arrayCardNewsFavorite = [];
let arrayCardNewsRead = [];

//створює обєкт для запитів
const requestsNews = new Requests(API_URL_NEWS, KEY_NEWS);

init();

//Робить запит на популярні новини та на погоду і верстає карточки
async function init() {
  await fetchWeather();
  await navigator.geolocation.getCurrentPosition(requestsWeatherPosition);
  await searchPopular();
  //arrayCardNews = function(arrayPopuralNews, погода)
}

//Функція для пошуку популярних новин
async function searchPopular() {
  try {
    const newsPopular = requestsNews.getRequests(
      requestsNews.createTrendingNewsQueryUrl()
    );
    await newsPopular.then(value => (arrayPopuralNews = value.results));
    //тимчасово видалить потом 
    console.log(arrayPopuralNews);
  } catch (error) {
    console.log(error.message);
  }
}

// Функція для пошуку за словом
async function searchArticle(searchValue) {
  try {
    const { response } = await requestsNews.getRequests(
      requestsNews.createSearchQueryUrl(searchValue)
    );
    arraySearchArticleNews = response.docs;
    console.log(arraySearchArticleNews);
    //arrayCardNews = function(arraySearchArticleNews, погода)
  } catch (error) {
    console.error(error);
  }
}

//Тимчасова функція для перевірки виводу новин по ключовому слову
refs.btnSearch.addEventListener('click', onClickSearchBtn);

function onClickSearchBtn(e) {
  searchArticle(encodeURIComponent('The New York Times'));
}

//Перемикач теми - темна/світла
<<<<<<< Updated upstream
const LOCALSTORAGE_KEY = 'theme';
let themeLight = true;
const selectTheme = document.querySelector('#theme-clicker');
const element = document.querySelector('body');
selectTheme.addEventListener("change", setTheme);

if (localStorage.getItem(LOCALSTORAGE_KEY) !== null) {
  themeLight = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
};

if (!themeLight) {
  element.classList.add("dark");
  selectTheme.checked = true;
}
else {
  selectTheme.checked = false;
}

function setTheme () {
  element.classList.toggle("dark");
  themeLight = !themeLight;
  localStorage.setItem(LOCALSTORAGE_KEY, themeLight);
=======
themeCheck();

// категорії
function selectedCategory() {
  const selectName = document.querySelector('.news-section__select');
  selectName.addEventListener('change', async function () {
    await searchCategorie(selectName.value);
    arrayCardNews = concatNewsAndWeather(
      arrayCardNewsCategorie,
      arrayCardNewsFavorite,
      arrayCardNewsRead,
      weather
    );
    console.log('Concated arr category:', arrayCardNews);
    //відправка масиву відредагованого
    pagination(arrayCardNews);
  });
  // повертає значення категорії з селекта
  const categoryName2 = document.querySelector('.section-categories__list');
  categoryName2.addEventListener('click', async function (e) {
    if (e.target.nodeName === 'BUTTON') {
      await searchCategorie(e.target.textContent);
      arrayCardNews = concatNewsAndWeather(
        arrayCardNewsCategorie,
        arrayCardNewsFavorite,
        arrayCardNewsRead,
        weather
      );
      console.log('Concated arr category:', arrayCardNews);
      //відправка масиву відредагованого
      pagination(arrayCardNews);
    }
  });
  //повертає значення категорії
}

//
// async function searchCategorie(categorie) {
//   try {
//     const encodedCategorie = encodeURIComponent(categorie);
//     const { response } = await requestsNews.getRequests(
//       requestsNews.createUrlCategoryName(encodedCategorie)
//     );
//     arrayCardNewsCategorie = response.docs;
//     // console.log('Search news: ', arraySearchArticleNews);
//   } catch (error) {
//     console.error(error);
//   }
// }

// запит версії 3
async function searchCategorie(categorie) {
  try {
    const encodedCategorie = encodeURIComponent(categorie.toLowerCase());
    const newsCategorie = requestsNews.getRequests(
      requestsNews.createUrlCategoryName(encodedCategorie)
    );
    await newsCategorie.then(value => {
      console.log(value.results);
      arrayCardNewsCategorie = value.results;
    });
    // arrayCardNewsCategorie = response.results;
    // console.log('Search news: ', arraySearchArticleNews);
  } catch (error) {
    console.error(error);
  }
}

// сховати сторінку поt found
function hidePageNotFound() {
  refs.noNewsPage.style.display = 'none';
  refs.noNewsPageTitle = '';
}

//eeveev


//Открытие мобильного меню 

(() => {
const btnMenu = document.querySelector("[data-menu-button]");
const menuContainer = document.querySelector("[data-menu]");

btnMenu.addEventListener("click", () => {
const expanded =
btnMenu.getAttribute("aria-expanded") === "true" || false;

btnMenu.classList.toggle("is-open");
btnMenu.setAttribute("aria-expanded", !expanded);

menuContainer.classList.toggle("is-open");
});
})();

// Открытие формы поиска в мобильном меню 

const searchButtonMobile = document.querySelector('.search-button__mobile');
const searchForm = document.querySelector('.search-form');
const body = document.querySelector('body');

searchButtonMobile.addEventListener('click', function(event) {
event.stopPropagation();
searchButtonMobile.classList.add('is-inactive');
searchForm.classList.add('is-active');
});

document.addEventListener('click', (event) => {
if (!searchForm.contains(event.target) && event.target !== searchButtonMobile) {
searchButtonMobile.classList.remove('is-inactive');
searchForm.classList.remove('is-active');
}
});

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

//
export async function searchCalendar(date) {
  try {
    const { response } = await requestsNews.getRequests(
      requestsNews.requestCalendarUrl(date)
    );
    arrayCardNewsCalendar = response.docs;
    console.log(arrayCardNewsCalendar);
    arrayCardNews = await concatNewsAndWeather(
      arrayCardNewsCalendar,
      arrayCardNewsFavorite,
      arrayCardNewsRead,
      weather
    );
    console.log(arrayCardNews);
    pagination(arrayCardNews);
  } catch (error) {
    console.error(error);
  }
>>>>>>> Stashed changes
}
