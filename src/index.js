import { category } from './js/category';
import { Requests } from './js/requests';

const API_URL_NEWS = 'https://api.nytimes.com/svc';
const KEY_NEWS = '1XlCr4gRqRG4oQXZ0w6Bhmx7Lrq32aXd';

const refs = {

};

//створює обєкт для запитів
const requestsNews = new Requests(API_URL_NEWS, KEY_NEWS);

//робить запит за адресою та виводить в консоль
try {
    const newsPopular = requestsNews.getRequests(requestsNews.createTrendingNewsQueryUrl());
    newsPopular.then(value => console.log(value.results));
} catch (error) {
    console.log(error.message);
}

// створює обєкт для пошуку за словом
async function searchArticle (searchValue) {
    try {
        const { response } = await
            requestsNews.getRequests(requestsNews.createSearchQueryUrl(searchValue));
        return response.docs;
    } catch (error) {
        console.error(error);
    }
}