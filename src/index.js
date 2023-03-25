import { category } from './js/category';
import { Requests } from './js/requests';
import { requestsWeatherPosition, fetchWeather } from './js/weather';
import { concatNewsAndWeather, newsMarkup } from './js/markup';

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
// ======ПРИБРАТИ========
let qqq = [
  {
    id: 100000008828551,
    published_date: '2023-03-24',
    title:
      'Trump, Escalating Attacks, Raises Specter of Violence if He Is Charged',
    abstract:
      'In an overnight post, the former president warned … attorney’s office received a threatening letter.',
    url: 'https://www.nytimes.com/2023/03/24/us/politics/trump-bragg-indictment-protests.html',
    _id: undefined,
  },
];

//створює обєкт для запитів
const requestsNews = new Requests(API_URL_NEWS, KEY_NEWS);

//робить запит за адресою та виводить в консоль
// try {
//   const newsPopular = requestsNews.getRequests(
//     requestsNews.createTrendingNewsQueryUrl()
//   );
//   newsPopular.then(value => {
//     console.log(value.results);
//   });
// } catch (error) {
//   console.log(error.message);
// }
//створює запит погоди
// const requestsWeather = new Requests(URl_WEATHER, API_KEY_WEATHER);

//Функція для пошуку популярних новин
async function searchPopular() {
  try {
    await navigator.geolocation.getCurrentPosition(requestsWeatherPosition);
    const newsPopular = requestsNews.getRequests(
      requestsNews.createTrendingNewsQueryUrl()
    );
    await newsPopular.then(value => (arrayPopuralNews = value.results));
    console.log('Popular News: ', arrayPopuralNews);
    // ===Створення спільного масиву новин та погоди=======
    arrayCardNews = concatNewsAndWeather(
      arrayPopuralNews,
      arrayCardNewsFavorite,
      arrayCardNewsRead,
      weather
    );
    console.log('Concated arr popular:', arrayCardNews);
    // ===Розмітка новин і погоди============================
    // const markup = newsMarkup(arrayCardNews);
    // console.log(markup);
    //тимчасово видалить потом
    // console.log(arrayPopuralNews);
  } catch (error) {
    console.log(error.message);
  }
}

searchPopular();

// Функція для пошуку за словом
async function searchArticle(searchValue) {
  try {
    const { response } = await requestsNews.getRequests(
      requestsNews.createSearchQueryUrl(searchValue)
    );
    arraySearchArticleNews = response.docs;
    console.log('Search news: ', arraySearchArticleNews);
    arrayCardNews = concatNewsAndWeather(
      arraySearchArticleNews,
      arrayCardNewsFavorite,
      arrayCardNewsRead,
      weather
    );
    console.log('Concated arr search:', arrayCardNews);
  } catch (error) {
    console.error(error);
  }
}

//Тимчасова функція для перевірки виводу новин по ключовому слову
refs.btnSearch.addEventListener('click', onClickSearchBtn);

function onClickSearchBtn(e) {
  searchArticle(encodeURIComponent('The New York Times'));
}
