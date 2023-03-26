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

const API_URL_NEWS = 'https://api.nytimes.com/svc';
const KEY_NEWS = '1XlCr4gRqRG4oQXZ0w6Bhmx7Lrq32aXd';

export const refs = {
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

//створює обєкт для запитів
const requestsNews = new Requests(API_URL_NEWS, KEY_NEWS);

init();

//Робить запит на популярні новини та на погоду і верстає карточки
async function init() {
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
    // console.log('Popular News: ', arrayPopuralNews);
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
refs.btnSearch.addEventListener('click', onClickSearchBtn);

function onClickSearchBtn(e) {
  searchArticle(encodeURIComponent('The New York Times'));
}