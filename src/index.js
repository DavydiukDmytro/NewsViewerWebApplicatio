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

import { flatpickr } from './js/calendar';
// функція додавання класу is-active в залежності від переданого значення від 1-3
import { setActiveLink } from './js/is-active';
import { themeCheck } from './js/themecheck';
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

arrayCardNewsFavorite = load('favorite');
arrayCardNewsRead = load('read');

init();
themeCheck();
refs.sectionNews.addEventListener('click', onClickInSectionNews);
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
    } else {
      const cardNewFavorite = arrayCardNews.find(card => String(card.id) === buttonId);
      cardNewFavorite.favorite = true;
      arrayCardNewsFavorite.push(cardNewFavorite);
      button.children[1].dataset.favorite = 'true';
      button.children[2].dataset.favorite = 'true';
      button.dataset.favorite = 'true';
      button.children[0].textContent = 'Remove from favoriet';
      save('favorite', arrayCardNewsFavorite);
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
      const cardNewRead = arrayCardNews.find(card => String(card.id) === linkId);
      cardNewRead.read = true;
      cardNewRead.readed_date = formattedDate;
      e.target.dataset.read = 'true';
      arrayCardNewsRead.push(cardNewRead);
      li.dataset.read = 'true';
      save('read', arrayCardNewsRead);
    }
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
}
