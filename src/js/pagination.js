import { concatNewsAndWeather, createMarkUp } from './markup';
import { refs } from '../index';
//змінні пагінатора
const pg = document.getElementById('pagination');
const btnNextPg = document.querySelector('button.next-page');
const btnPrevPg = document.querySelector('button.prev-page');

//параметри визначення ширину viewport
const matchMediaDesktop = window.matchMedia('(min-width: 1280px)');
const matchMediaTablet = window.matchMedia(
  '(min-width: 768px) and (max-width: 1279px)'
);
const matchMediaMobile = window.matchMedia('(max-width: 767px)');

// let pageNumber = 1;
let start = 0; //начало slice
let end = 9; //кінець slice

const valuePage = {
  curPage: 1, //поточна сторінка
  numLinksTwoSide: 1, //кількість кнопок від вибраной до ...
  totalPages: 20, // кількість кнопок пагінації в залежності від довжини массиву
};

let array = [];

//функція рендера, тестовий приклад
function renderNewsList(news) {
  const markup = news.slice(start, end);
  //заміть консолі фунція яка рендерить картки з масиву!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
  const markp2 = createMarkUp(markup);
  refs.sectionNews.innerHTML = markp2;
}

// функція перемикання сторінок та рендера
pg.addEventListener('click', async e => {
  try {
    if (e.target.dataset.page) {
      valuePage.curPage = parseInt(e.target.dataset.page, 10);

      //виклик пагінації
      pagination(array);
      handleButtonLeft();
      handleButtonRight();
    }
  } catch (error) {
    console.log(error.message);
  }
});

//функція скролу догори при пагінації
function onPaginationScroll() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}

// ФУНКЦІЯ ПАГІНАЦІЇ
export function pagination(arr) {
  array = arr;
  //розрахунок кількості кнопок від довжини массиву
  if (matchMediaDesktop.matches) {
    end = 9;
    valuePage.totalPages = Math.ceil(arr.length / 9);
  }
  if (matchMediaTablet.matches) {
    end = 7;
    valuePage.totalPages = Math.ceil(arr.length / 8);
  }
  if (matchMediaMobile.matches) {
    end = 4;
    valuePage.totalPages = Math.ceil(arr.length / 5);
  }
  //розрахунок старт та енд
  if (matchMediaDesktop.matches) {
    start = (valuePage.curPage - 1) * 9;
    end = start + 9;
  }
  if (matchMediaTablet.matches) {
    start = (valuePage.curPage - 1) * 8;
    end = start + 8;
  }
  if (matchMediaMobile.matches) {
    start = (valuePage.curPage - 1) * 4;
    end = start + 4;
  }

  const { totalPages, curPage, numLinksTwoSide: delta } = valuePage;

  const range = delta + 4; //

  let render = '';
  let renderTwoSide = '';
  let dot = `<li class="pg-item"><a class="pg-link">...</a></li>`;
  let countTruncate = 0; //

  const numberTruncateLeft = curPage - delta;
  const numberTruncateRight = curPage + delta;

  let active = '';
  for (let pos = 1; pos <= totalPages; pos++) {
    active = pos === curPage ? 'active' : '';

    if (totalPages >= 2 * range - 1) {
      if (numberTruncateLeft > 3 && numberTruncateRight < totalPages - 3 + 1) {
        if (pos >= numberTruncateLeft && pos <= numberTruncateRight) {
          renderTwoSide += renderPage(pos, active);
        }
      } else {
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
  //виклик рендеру
  renderNewsList(array);
  //виклик скролу догори при пагінації
  onPaginationScroll();
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
    pagination(array);
  } else if (element.classList.contains('next-page')) {
    valuePage.curPage++;
    handleButtonRight();
    btnPrevPg.disabled = false;
    pagination(array);
  }
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
    btnNextPg.disabled = true;
  } else {
    btnNextPg.disabled = false;
  }
}
