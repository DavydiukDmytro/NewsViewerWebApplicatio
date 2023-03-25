import { category } from './js/category';
import { Requests } from './js/requests';
import { requestsWeatherPosition, fetchWeather } from './js/weather';

const API_URL_NEWS = 'https://api.nytimes.com/svc';
const KEY_NEWS = '1XlCr4gRqRG4oQXZ0w6Bhmx7Lrq32aXd';

const refs = {
  btnSearch: document.querySelector('.search-button'),
  sectionNews: document.querySelector('.section-news'),
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

// Створення сторінки поt found

function renderPageNotFound(message) {
  refs.sectionNews.innerHTML = '';

  const card = document.createElement('div');
  card.classList.add('news-card');
  card.innerHTML = `<h1 class="news-card__title">${message}</h1>
      <picture>
        <source
          srcset="./img/desk.png 1x, ./img/desk@2x.png 2x"
          media="(min-width:1280px)"
        />
        <source
          srcset="./img/tab.png 1x, ./img/tab@2x.png 2x"
          media="(min-width:768px)"
        />
        <source
          srcset="./img/mob.png 1x, ./img/mob@2x.png 2x"
          media="(max-width:767px)"
        />
        <img class="news-card__image" src="./img/desk.png" alt="Newspaper" />
      </picture>`;
  refs.sectionNews.append(card);
}

renderPageNotFound('hello');
