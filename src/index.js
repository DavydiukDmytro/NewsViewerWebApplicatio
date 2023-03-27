//імпорт масиву категорій
import { category } from './js/category';
//імпорт класу запитів
import { Requests } from './js/requests';
//імпорт функціоналу пагінації
import { pagination } from './js/pagination';
//імпорт функціоналу для створення категорій
import { setupNewsSection } from './js/section-categories-list';
//імпорт запиту по локації на погоді
import { requestsWeatherPosition, fetchWeather } from './js/weather';
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

// import { flatpick } from './js/calendar';
import { flatpickr } from './js/calendar';
// функція додавання класу is-active в залежності від переданого значення від 1-3
import { setActiveLink } from './js/is-active';

selectedCategory();

const API_URL_NEWS = 'https://api.nytimes.com/svc';
const KEY_NEWS = '1XlCr4gRqRG4oQXZ0w6Bhmx7Lrq32aXd';

export const refs = {
  searchForm: document.querySelector('.search-form'),
  btnSearch: document.querySelector('.search-button'),
  sectionNews: document.querySelector('.section-news'),
  noNewsPage: document.querySelector('.news-page'),
  noNewsPageTitle: document.querySelector('.news-page__title'),
};

export let weather = {};

let arraySearchArticleNews = [];
let arrayPopuralNews = [];
let arrayCardNews = [];
let arrayCardNewsFavorite = [];
let arrayCardNewsRead = [];
let arrayCardNewsCategorie = [];
let arrayCardNewsCalendar = [];

//створює обєкт для запитів
const requestsNews = new Requests(API_URL_NEWS, KEY_NEWS);

init();

refs.sectionNews.addEventListener('click', onClickInSectionNews);
function onClickInSectionNews(e) {
  const cardNewsRead = document.querySelectorAll('.news-card__read');
  for (let i = 0; i < cardNewsRead.length; i++) {
    cardNewsRead[i].setAttribute('target', '_blank');
  }

  if (e.target.id === 'data-ida') {
    console.log('btn');
  }
  if (e.target.id == !'data-ida') {
    // arrayCardNews.sort(function ('data-ida') {
    //   return a - b;
    // });
    // console.log(numbers);
    // console.log(arrayCardNews.includes('id = data-ida'));
    arrayCardNews.forEach(function (newsRead) {
      if (arrayCardNews.includes(newsRead.id)) {
        arrayCardNewsRead.push(newsRead);
      }
    });
    console.log('Read News: ', arrayCardNewsRead);

    function newData() {
      var readDate = new Date();
      var dateString = readDate.toDateString();
      console.log(dateString);
    }
    return newData;

    // function recordLinkClick() {
    //   var readDate = new Date();
    //   var dateString = readDate.toDateString(); // Format the date as a string

    //   console.log('Link clicked on ' + dateString);
    //   // Send the timestamp to a server using AJAX or save it to a cookie or localStorage
    // }
    // return recordLinkClick;
  }
}

//Робить запит на популярні новини та на погоду і верстає карточки
async function init() {
  setActiveLink(1);
  setupNewsSection();
  await fetchWeather();
  await navigator.geolocation.getCurrentPosition(requestsWeatherPosition);
  await searchPopular();

  // ===Створення спільного масиву новин та погоди=======
  arrayCardNews = concatNewsAndWeather(
    arrayPopuralNews,
    arrayCardNewsFavorite,
    arrayCardNewsRead,
    weather
  );
  console.log('Concated arr popular:', arrayCardNews);
  //відправка масиву відредагованого
  pagination(arrayCardNews);
}

//Функція для пошуку популярних новин
async function searchPopular() {
  try {
    // await navigator.geolocation.getCurrentPosition(requestsWeatherPosition);
    const newsPopular = requestsNews.getRequests(
      requestsNews.createTrendingNewsQueryUrl()
    );
    await newsPopular.then(value => (arrayPopuralNews = value.results));
    console.log('Popular News: ', arrayPopuralNews);
  } catch (error) {
    console.log(error.message);
  }
}

// Функція для пошуку за словом
async function searchArticle(searchValue) {
  try {
    const encodedSearchValue = encodeURIComponent(searchValue);
    const { response } = await requestsNews.getRequests(
      requestsNews.createSearchQueryUrl(encodedSearchValue)
    );
    arraySearchArticleNews = response.docs;
    // console.log('Search news: ', arraySearchArticleNews);
  } catch (error) {
    console.error(error);
  }
}

//Тимчасова функція для перевірки виводу новин по ключовому слову
refs.searchForm.addEventListener('submit', onClickSearchBtn);

async function onClickSearchBtn(e) {
  e.preventDefault();
  const searchValue = e.target.children.search.value;
  await searchArticle(searchValue);
  arrayCardNews = await concatNewsAndWeather(
    arraySearchArticleNews,
    arrayCardNewsFavorite,
    arrayCardNewsRead,
    weather
  );
  console.log('Concated arr searh:', arrayCardNews);
  if (arrayCardNews.length === 0) {
    const message = 'We did not find news for this word';
    showPageNotFound(message);
  }

  pagination(arrayCardNews);
}
//Перемикач теми - темна/світла
const LOCALSTORAGE_KEY = 'theme';
let themeLight = true;
const selectTheme = document.querySelector('#theme-clicker');
const element = document.querySelector('body');
selectTheme.addEventListener('change', setTheme);

if (localStorage.getItem(LOCALSTORAGE_KEY) !== null) {
  themeLight = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
}

if (!themeLight) {
  element.classList.add('dark');
  selectTheme.checked = true;
} else {
  selectTheme.checked = false;
}

function setTheme() {
  element.classList.toggle('dark');
  themeLight = !themeLight;
  localStorage.setItem(LOCALSTORAGE_KEY, themeLight);
}

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
}
