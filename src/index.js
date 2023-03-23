import { category } from './js/category';
import { Requests } from './js/requests';
import { markup, newObj } from './js/markup';

const API_URL_NEWS = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json';
const KEY_NEWS = '1XlCr4gRqRG4oQXZ0w6Bhmx7Lrq32aXd';

const refs = {

};

//створює обєкт для запитів
const requestsNews = new Requests(API_URL_NEWS, KEY_NEWS);

//робить запит за адресою та виводить в консоль
try {
  const newsPopular = requestsNews.getRequests(
    requestsNews.createTrendingNewsQueryUrl()
  );
  newsPopular.then(value => {
    console.log(value.results);
    const qqq = markup(value);
    newObj(value);
  });
} catch (error) {
  console.log(error.message);
}
