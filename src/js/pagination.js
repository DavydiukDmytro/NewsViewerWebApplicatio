import { Requests } from './requests';

const API_URL_NEWS = 'https://api.nytimes.com/svc';
const KEY_NEWS = '1XlCr4gRqRG4oQXZ0w6Bhmx7Lrq32aXd';

const requestsNews = new Requests(API_URL_NEWS, KEY_NEWS);

//контейнер для тестової розмітки
const newsList = document.querySelector('.news-list');

const pg = document.getElementById('pagination');
const btnNextPg = document.querySelector('button.next-page');
const btnPrevPg = document.querySelector('button.prev-page');

//визначення ширину viewport
const matchMediaDesktop = window.matchMedia('(min-width: 1280px)');
const matchMediaTablet = window.matchMedia(
  '(min-width: 768px) and (max-width: 1279px)'
);
const matchMediaMobile = window.matchMedia('(max-width: 767px)');

let start = 0; //начало slice
let end = 9; //кінець slice

const valuePage = {
  curPage: 1, //поточна сторінка
  numLinksTwoSide: 1, //кількість кнопок від вибраной до ...
  totalPages: 20, // кількість кнопок пагінації в залежності від довжини массиву
};

//Функція для пошуку популярних новин
async function searchPopular() {
  try {
    const newsPopular = requestsNews.getRequests(
      requestsNews.createTrendingNewsQueryUrl()
    );
    await newsPopular.then(value => (arrayPopuralNews = value.results));
    console.log(arrayPopuralNews);
    return arrayPopuralNews;
  } catch (error) {
    console.log(error.message);
  }
}

//функція рендера та пагінації при завантаженні сторінки
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const news = await searchPopular();
    console.log(news);

    pagination(valuePage);

    renderNewsList(news);
  } catch (error) {
    console.log(error.message);
  }
});

//функція рендера, тестовий приклад
function renderNewsList(news) {
  const markup = arrayPopuralNews
    .slice(start, end)
    .map(
      user => `<li class="news-card">
       <p>${user.abstract}</p>
      <a href="${user.url}">Read more</a>
      </li>`
    )
    .join('');
  newsList.innerHTML = markup;
}

// функція перемикання сторінок та рендера
pg.addEventListener('click', async e => {
  try {
    const news = await searchPopular();

    if (e.target.dataset.page) {
      const pageNumber = parseInt(e.target.dataset.page, 10);

      valuePage.curPage = pageNumber;

      //виклик пагінації
      pagination(valuePage);

      //визначення позиціїї для slice
      if (matchMediaDesktop.matches) {
        start = (pageNumber - 1) * 9;
        end = start + 9;
      }
      if (matchMediaTablet.matches) {
        start = (pageNumber - 1) * 8;
        end = start + 8;
      }
      if (matchMediaMobile.matches) {
        start = (pageNumber - 1) * 4;
        end = start + 4;
      }

      //функція рендера
      renderNewsList(news);

      handleButtonLeft();
      handleButtonRight();
    }
  } catch (error) {
    console.log(error.message);
  }
});

// ФУНКЦІЯ ПАГІНАЦІЇ
function pagination() {
  //визначення кількості кнопок пагінації та кількості карток від ширини екраину
  if (matchMediaDesktop.matches) {
    end = 9;
    valuePage.totalPages = Math.ceil(arrayPopuralNews.length / 9);
    console.log(matchMediaDesktop);
  }
  if (matchMediaTablet.matches) {
    end = 7;
    valuePage.totalPages = Math.ceil(arrayPopuralNews.length / 8);
    console.log(matchMediaTablet);
  }
  if (matchMediaMobile.matches) {
    end = 4;
    valuePage.totalPages = Math.ceil(arrayPopuralNews.length / 5);
    console.log(matchMediaMobile);
  }
  const { totalPages, curPage, numLinksTwoSide: delta } = valuePage;

  const range = delta + 4; //

  // использовать для обработки видимого количества ссылок слева

  let render = '';
  let renderTwoSide = '';
  let dot = `<li class="pg-item"><a class="pg-link">...</a></li>`;
  let countTruncate = 0; //
  // использовать для многоточия - обрезать левую или правую сторону

  // используем для усечения двух сторон
  const numberTruncateLeft = curPage - delta; //число Обрезать слева
  const numberTruncateRight = curPage + delta; //число Обрезать слева

  let active = '';
  for (let pos = 1; pos <= totalPages; pos++) {
    active = pos === curPage ? 'active' : '';

    // обрезать
    if (totalPages >= 2 * range - 1) {
      if (numberTruncateLeft > 3 && numberTruncateRight < totalPages - 3 + 1) {
        // truncate 2 side
        if (pos >= numberTruncateLeft && pos <= numberTruncateRight) {
          renderTwoSide += renderPage(pos, active);
        }
      } else {
        //обрезать левую или правую сторону
        if (
          (curPage < range && pos <= range) ||
          (curPage > totalPages - range && pos >= totalPages - range + 1) ||
          pos === totalPages ||
          pos === 1
        ) {
          render += renderPage(pos, active);
        } else {
          countTruncate++;
          if (countTruncate === 1) render += dot;
        }
      }
    } else {
      // not truncate
      render += renderPage(pos, active);
    }
  }

  if (renderTwoSide) {
    renderTwoSide =
      renderPage(1) + dot + renderTwoSide + dot + renderPage(totalPages);
    pg.innerHTML = renderTwoSide;
  } else {
    pg.innerHTML = render;
  }
}

// функція рендера кнопки пагінації
function renderPage(index, active = '') {
  return ` <li class="pg-item ${active}" data-page="${index}">
        <a class="pg-link" href="#">${index}</a>
    </li>`;
}

//функція кліку по button
document
  .querySelector('.page-container')
  .addEventListener('click', function (e) {
    handleButton(e.target);
  });

function handleButton(element) {
  if (element.classList.contains('prev-page')) {
    valuePage.curPage--;
    handleButtonLeft();
    btnNextPg.disabled = false;
  } else if (element.classList.contains('next-page')) {
    valuePage.curPage++;
    handleButtonRight();
    btnPrevPg.disabled = false;
  }
  pagination();
}

//дисаблед на лево
function handleButtonLeft() {
  if (valuePage.curPage === 1) {
    btnPrevPg.disabled = true;
  } else {
    btnPrevPg.disabled = false;
  }
}

//дисаблед на право
function handleButtonRight() {
  if (valuePage.curPage === valuePage.totalPages) {
    console.log(valuePage.curPage);
    btnNextPg.disabled = true;
  } else {
    btnNextPg.disabled = false;
  }
}
