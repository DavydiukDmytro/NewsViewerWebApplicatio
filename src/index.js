import { category } from './js/category';
import { Requests } from './js/requests';
import { markup, newObj } from './js/markup';

const API_URL_NEWS = 'https://api.nytimes.com/svc';
const KEY_NEWS = '1XlCr4gRqRG4oQXZ0w6Bhmx7Lrq32aXd';

const URl_WEATHER = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY_WEATHER = 'ae8bbc703118097f2e96d268e981d292';

const refs = {
  btnSearch: document.querySelector('.search-button'),
};

let weather = {};
let lat = 40.71427;
let lon = -74.00597;
let arraySearchArticleNews = [];
let arrayPopuralNews = [];
let arrayCardNews = [];

//створює обєкт для запитів
const requestsNews = new Requests(API_URL_NEWS, KEY_NEWS);

<<<<<<< HEAD
//робить запит за адресою та виводить в консоль
try {
  const newsPopular = requestsNews.getRequests(
    requestsNews.createTrendingNewsQueryUrl()
  );
  newsPopular.then(value => {
    console.log(value.results);    
  });
} catch (error) {
  console.log(error.message);
}
=======
//створює запит погоди
const requestsWeather = new Requests(URl_WEATHER, API_KEY_WEATHER);

//Функція для пошуку популярних новин
async function searchPopular() {
  try {
    await navigator.geolocation.getCurrentPosition(requestsWeatherPosition);
    console.log(weather);

    const newsPopular = requestsNews.getRequests(
      requestsNews.createTrendingNewsQueryUrl()
    );
    await newsPopular.then(value => (arrayPopuralNews = value.results));
    console.log(arrayPopuralNews);
    //arrayCardNews = function(arrayPopuralNews, погода)
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
    console.log(arraySearchArticleNews);
    //arrayCardNews = function(arraySearchArticleNews, погода)
  } catch (error) {
    console.error(error);
  }
}

//Тимчасова функція для перевірки виводу новин по ключовому слову
refs.btnSearch.addEventListener('click', onClickSearchBtn);

function onClickSearchBtn(e) {
  searchArticle('The New York Times');
}

/////////////////Погода

async function fetchWeather() {
  const response = requestsWeather.getRequests(
    requestsWeather.requestWeatherUrl(lat, lon)
  );
  let weatherData = {};
  await response.then(value => {
    weatherData = value;
  });
  const date = new Date(weatherData.dt * 1000);
  weather.dayWeek = getDayOfWeek(date);
  weather.date = getDate(date);
  weather.temp = weatherData.main.temp;
  weather.descriptrion = weatherData.weather[0].main;
  weather.city = weatherData.name;
  weather.icon = weatherData.weather[0].icon;

  weather.flag = 'weather';
}

async function requestsWeatherPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  await fetchWeather();
}

function getDayOfWeek(date) {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayIndex = date.getDay();
  return daysOfWeek[dayIndex];
}

//Дата для картки погоди
function getDate(date) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${day} ${months[monthIndex]} ${year}`;
}
>>>>>>> main
