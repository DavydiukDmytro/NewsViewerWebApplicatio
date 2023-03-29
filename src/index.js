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
//Лодаш троттле
import throttle from 'lodash.throttle';
// Додав функцію яка записую і повертає данні з localStorage
import { save, load } from './js/storage';
import { flatpickr } from './js/calendar';
// функція додавання класу is-active в залежності від переданого значення від 1-3
import { setActiveLink } from './js/is-active';
//функція зміни теми
import { themeCheck } from './js/themecheck';

//генерація категорій
selectedCategory();

const API_URL_NEWS = 'https://api.nytimes.com/svc';
const KEY_NEWS = '1XlCr4gRqRG4oQXZ0w6Bhmx7Lrq32aXd';

export const refs = {
  paginationBtn: document.querySelector('.page-container'),
  searchForm: document.querySelector('.search-form'),
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
let arrayCardNewsCategorie = [];
let arrayCardNewsCalendar = [];

//створює обєкт для запитів
const requestsNews = new Requests(API_URL_NEWS, KEY_NEWS);

refs.paginationBtn.classList.add('none');


//витягує з локалстордж масиви прочитаних та улюблених новин
arrayCardNewsFavorite = load('favorite');
arrayCardNewsRead = load('read');

//Ключові запити
init();

//ініціація перемикача теми
themeCheck();


//клік по картці новин додати в fovorite, read
refs.sectionNews.addEventListener('click', onClickInSectionNews);

//Сабміт форми пошуку по ключовому слову
refs.searchForm.addEventListener('submit', onClickSearchBtn);

//клік по картці
function onClickInSectionNews(e) {
  const button = e.target.closest('button');
  const li = e.target.closest('li');
  if (button) {
    const buttonId = button.dataset.id;
    const buttonDataAttribute = button.dataset.favorite;
    if (buttonDataAttribute === 'true') {
      const indexCard = arrayCardNewsFavorite.findIndex(card => String(card.id) === buttonId);
      arrayCardNewsFavorite.splice(indexCard, 1);
      button.children[1].dataset.favorite = 'false';
      button.children[2].dataset.favorite = 'false';
      button.dataset.favorite = 'false';
      button.children[0].textContent = 'Add to favorite';
      save('favorite', arrayCardNewsFavorite);
      let array1 = arrayCardNewsRead;
      arrayCardNewsRead = array1.map(element => {
        if (String(element.id) === buttonId) {
          element.favorite = "false";
        }
        return element
      });
      save('read', arrayCardNewsRead);
    } else {
      const cardNewFavorite = arrayCardNews.find(card => String(card.id) === buttonId);
      cardNewFavorite.favorite = true;
      arrayCardNewsFavorite.push(cardNewFavorite);
      button.children[1].dataset.favorite = 'true';
      button.children[2].dataset.favorite = 'true';
      button.dataset.favorite = 'true';
      button.children[0].textContent = 'Remove from favoriet';
      save('favorite', arrayCardNewsFavorite);
      let array1 = arrayCardNewsRead;
      arrayCardNewsRead = array1.map(element => {
        if (String(element.id) === buttonId) {
          element.favorite = "true";
        }
        return element
      });
      save('read', arrayCardNewsRead);
    }
  }
  if (e.target.nodeName === 'A') {
    const linkId = e.target.dataset.ida;
    const linkDataAttribute = e.target.dataset.read;
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    if (linkDataAttribute === 'true') {
      const indexCard = arrayCardNewsRead.findIndex(card => String(card.id) === linkId);
      arrayCardNewsRead[indexCard].readed_date = formattedDate;
      save('read', arrayCardNewsRead);
    } else {
      const cardNewRead = arrayCardNews.find(card => String(card.id) === linkId);
      cardNewRead.read = true;

      let array2 = arrayCardNewsFavorite;
      arrayCardNewsFavorite = array2.map(element => {
        if (String(element.id) === linkId) {
          element.read = "true";
        }
        return element
      });
      save('favorite', arrayCardNewsFavorite);

      cardNewRead.readed_date = formattedDate;
      e.target.dataset.read = 'true';
      arrayCardNewsRead.push(cardNewRead);
      li.dataset.read = 'true';
      save('read', arrayCardNewsRead);
    }
  }
}

//Робить запит на популярні новини та на погоду і верстає карточки
async function init() {
  try {
    setActiveLink(1);
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
  //відправка масиву відредагованого
  pagination(arrayCardNews);
  } catch {
    showPageNotFound('Sorry, but we did not find any popular news!');
  }
}

//Функція для пошуку популярних новин
async function searchPopular() {
  try {
    // await navigator.geolocation.getCurrentPosition(requestsWeatherPosition);
    const newsPopular = requestsNews.getRequests(
      requestsNews.createTrendingNewsQueryUrl()
    );
    refs.paginationBtn.classList.remove('none');
    await newsPopular.then(value => (arrayPopuralNews = value.results));
  } catch (error) {
    refs.paginationBtn.classList.add('none');
    showPageNotFound('Sorry, but we did not find any popular news!');
  }
}

// Функція для пошуку за словом
async function searchArticle(searchValue) {
  try {
    hidePageNotFound();
    clearNewsSection();
    const encodedSearchValue = encodeURIComponent(searchValue);
    const { response } = await requestsNews.getRequests(
      requestsNews.createSearchQueryUrl(encodedSearchValue)
    );
    refs.paginationBtn.classList.remove('none');
    arraySearchArticleNews = response.docs;
  } catch (error) {
    showPageNotFound('Sorry, but we did not find any news for this word!');
    refs.paginationBtn.classList.add('none');
  }
}


//функція сабміту пошуку по слову
async function onClickSearchBtn(e) {
  e.preventDefault();
  hidePageNotFound();
  const searchValue = e.target.children.search.value;
  await searchArticle(searchValue);
  arrayCardNews = await concatNewsAndWeather(
    arraySearchArticleNews,
    arrayCardNewsFavorite,
    arrayCardNewsRead,
    weather
  );
  refs.paginationBtn.classList.remove('none');
  if (arrayCardNews.length === 0) {
    showPageNotFound('Sorry, but we did not find any news for this word!');
    refs.paginationBtn.classList.add('none');
  }

  pagination(arrayCardNews);
}

//функція натискання на кнопку категорії та виконання запиту на бекенд
function selectedCategory() {
  const selectName = document.querySelector('.news-section__select');
  selectName.addEventListener('change', async function () {
    hidePageNotFound();
    await searchCategorie(selectName.value);
    arrayCardNews = concatNewsAndWeather(
      arrayCardNewsCategorie,
      arrayCardNewsFavorite,
      arrayCardNewsRead,
      weather
    );
    //відправка масиву відредагованого
    pagination(arrayCardNews);
  });
  // повертає значення категорії з селекта
  const categoryName2 = document.querySelector('.section-categories__list');
  categoryName2.addEventListener('click', async function (e) {
    if (e.target.nodeName === 'BUTTON') {
      hidePageNotFound();
      await searchCategorie(e.target.textContent);
      arrayCardNews = concatNewsAndWeather(
        arrayCardNewsCategorie,
        arrayCardNewsFavorite,
        arrayCardNewsRead,
        weather
      );
      //відправка масиву відредагованого
      pagination(arrayCardNews);
    }
  });
  //повертає значення категорії
}

// запит на бекенд по категорії
async function searchCategorie(categorie) {
  try {
    const encodedCategorie = encodeURIComponent(categorie.toLowerCase());
    const newsCategorie = requestsNews.getRequests(
      requestsNews.createUrlCategoryName(encodedCategorie)
    );
    refs.paginationBtn.classList.remove('none');
    await newsCategorie.then(value => {
      arrayCardNewsCategorie = value.results;
    });
  } catch (error) {
    refs.paginationBtn.classList.add('none');
    showPageNotFound('Sorry, but we didn\'t find any news for this category');
  }
}

//Відкриття мобільного меню
(() => {
const btnMenu = document.querySelector("[data-menu-button]");
  const menuContainer = document.querySelector("[data-menu]");
  const body1 = document.querySelector('body');
  

btnMenu.addEventListener("click", () => {
const expanded =
btnMenu.getAttribute("aria-expanded") === "true" || false;

btnMenu.classList.toggle("is-open");
btnMenu.setAttribute("aria-expanded", !expanded);

  menuContainer.classList.toggle("is-open");
  body1.classList.toggle('scroll');
});
})();

// Відкриття форми пошуку в мобільній версії
const searchButtonMobile = document.querySelector('.search-button__mobile');
const searchForm = document.querySelector('.search-form');
const body = document.querySelector('body');

searchButtonMobile.addEventListener('click', function(event) {
event.stopPropagation();
searchButtonMobile.classList.add('is-inactive');
searchForm.classList.add('is-active');
});

document.addEventListener('click', (event) => {
if (!searchForm.contains(event.target) && event.target !== searchButtonMobile) {
searchButtonMobile.classList.remove('is-inactive');
searchForm.classList.remove('is-active');
}
});

//No scroll
const menuContainer = document.querySelector('.menu__container');
const bodyEl = document.querySelector('body')

menuContainer.addEventListener('click', (event) => {
if (menuContainer.classList.contains('.is-open')) {
bodyEl.classList.add('.is-modal');
} else {
bodyEl.classList.remove('.is-modal');
}
});

//запит для пошуку по даті
export async function searchCalendar(date) {
  try {
    clearNewsSection();
    const { response } = await requestsNews.getRequests(
      requestsNews.requestCalendarUrl(date)
    );
    arrayCardNewsCalendar = response.docs;
    refs.paginationBtn.classList.remove('none');
    arrayCardNews = await concatNewsAndWeather(
      arrayCardNewsCalendar,
      arrayCardNewsFavorite,
      arrayCardNewsRead,
      weather
    );
    pagination(arrayCardNews);
    if (arrayCardNews.length < 1) {
      refs.paginationBtn.classList.add('none');
      showPageNotFound('Sorry, but we found no news for this date');
    }
  } catch (error) {
    refs.paginationBtn.classList.add('none');
    showPageNotFound('Sorry, but we found no news for this date');
  }
}
