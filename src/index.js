import { category } from './js/category';
import { Requests } from './js/requests';
import { requestsWeatherPosition, fetchWeather } from './js/weather';

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
}
