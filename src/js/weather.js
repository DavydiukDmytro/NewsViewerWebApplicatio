//Погода
import { Requests } from './requests';
import { weather } from '../index';

const URl_WEATHER = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY_WEATHER = 'ae8bbc703118097f2e96d268e981d292';

let lat = 40.71427;
let lon = -74.00597;
//створює об'єкт для запитів
const requestsWeather = new Requests(URl_WEATHER, API_KEY_WEATHER);

//запит на отримання погоди
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
  weather.temp = Math.round(weatherData.main.temp);
  weather.descriptrion = weatherData.weather[0].main;
  weather.city = weatherData.name;
  weather.icon = weatherData.weather[0].icon;

  weather.flag = 'weather';
  //тимчасово видалить потом
  console.log(weather);
}

//отримання геолокації
async function requestsWeatherPosition(position) {
  try {
    lat = await position.coords.latitude;
    lon = await position.coords.longitude;
    await fetchWeather();
  } catch (error) {
    console.error(error);
  }
}

//день неділі для картки погоди
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

export { requestsWeatherPosition, fetchWeather };
