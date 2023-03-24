import { category } from './js/category';
import { Requests } from './js/requests';

const API_URL_NEWS = 'https://api.nytimes.com/svc';
const KEY_NEWS = '1XlCr4gRqRG4oQXZ0w6Bhmx7Lrq32aXd';

const refs = {
    btnSearch: document.querySelector('.search-button'),
};

let arraySearchArticleNews = [];
let arrayPopuralNews = [];

//створює обєкт для запитів
const requestsNews = new Requests(API_URL_NEWS, KEY_NEWS);

//Функція для пошуку популярних новин
async function searchPopular() {
    try {
        const newsPopular = requestsNews.getRequests(requestsNews.createTrendingNewsQueryUrl());
        newsPopular.then(value => arrayPopuralNews = value.results);
    } catch (error) {
        console.log(error.message);
    }
}


// Функція для пошуку за словом
async function searchArticle (searchValue) {
    try {
        const { response } = await
            requestsNews.getRequests(requestsNews.createSearchQueryUrl(searchValue));
        arraySearchArticleNews = response.docs;
    } catch (error) {
        console.error(error);
    }
}

//Тимчасова функція для перевірки виводу новин по ключовому слову
searchArticle('The New York Times');
searchPopular();
refs.btnSearch.addEventListener('click', e => {
    //arrayPopuralNews вивод популярних новин
    //arraySearchArticleNews вивод новин за ключовим словом
    console.log(arrayPopuralNews);
    console.log(arraySearchArticleNews);
});