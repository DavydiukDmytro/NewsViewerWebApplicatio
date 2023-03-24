import { category } from './js/category';
import { Requests } from './js/requests';

const API_URL_NEWS = 'https://api.nytimes.com/svc';
const KEY_NEWS = '1XlCr4gRqRG4oQXZ0w6Bhmx7Lrq32aXd';

const refs = {
    btnSearch: document.querySelector('.search-button'),
};

let arraySearchArticleNews = [];
let arrayPopuralNews = [];
let arrayCardNews = [];

//створює обєкт для запитів
const requestsNews = new Requests(API_URL_NEWS, KEY_NEWS);

//Функція для пошуку популярних новин
async function searchPopular() {
    try {
        const newsPopular = requestsNews.getRequests(requestsNews.createTrendingNewsQueryUrl());
        await newsPopular.then(value => arrayPopuralNews = value.results);
        console.log(arrayPopuralNews);
        //arrayCardNews = function(arrayPopuralNews, погода)
    } catch (error) {
        console.log(error.message);
    }
}

searchPopular();


// Функція для пошуку за словом
async function searchArticle (searchValue) {
    try {
        const { response } = await
            requestsNews.getRequests(requestsNews.createSearchQueryUrl(searchValue));
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