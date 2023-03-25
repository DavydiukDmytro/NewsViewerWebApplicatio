const pg = document.getElementById('pagination');
const btnNextPg = document.querySelector('button.next-page');
const btnPrevPg = document.querySelector('button.prev-page');

//визначення ширину viewport
const matchMediaDesktop = window.matchMedia('(min-width: 1280px)');
const matchMediaTablet = window.matchMedia(
  '(min-width: 768px) and (max-width: 1279px)'
);

const matchMediaMobile = window.matchMedia('(max-width: 767px)');
let pageNumber = 1;
let start = 0; //начало slice
let end = 9; //кінець slice

const valuePage = {
  curPage: 1, //поточна сторінка
  numLinksTwoSide: 1, //кількість кнопок від вибраной до ...
  totalPages: 20, // кількість кнопок пагінації в залежності від довжини массиву
};

const array = [1, 2, 4, 5, 6, 8, 9, 10, 11, 12, 13];
pagination(array);

//функція рендера, тестовий приклад
function renderNewsList(news) {
  const markup = news.slice(start, end);
  
  console.log(markup);
}

// функція перемикання сторінок та рендера
pg.addEventListener('click', async e => {
  try {

    if (e.target.dataset.page) {
      valuePage.curPage = parseInt(e.target.dataset.page, 10);

      
      //виклик пагінації
      pagination(array);

      //визначення позиціїї для slice
      

      //функція рендера
      // renderNewsList(array);

      handleButtonLeft();
      handleButtonRight();
    }
  } catch (error) {
    console.log(error.message);
  }
});

// ФУНКЦІЯ ПАГІНАЦІЇ
function pagination(arr) {
     if (matchMediaDesktop.matches) {
    end = 9;
    valuePage.totalPages = Math.ceil(arr.length / 9);
    console.log(matchMediaDesktop);
  }
  if (matchMediaTablet.matches) {
    end = 7;
    valuePage.totalPages = Math.ceil(arr.length / 8);
    console.log(matchMediaTablet);
  }
  if (matchMediaMobile.matches) {
    end = 4;
    valuePage.totalPages = Math.ceil(arr.length / 5);
    console.log(matchMediaMobile);
  }
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
  console.log(start, end);
  console.log(curPage);
  renderNewsList(array);
  //визначення кількості кнопок пагінації та кількості карток від ширини екраину
 
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
    console.log(valuePage.curPage);
    valuePage.curPage++;
    console.log(valuePage.curPage);
    handleButtonRight();
    btnPrevPg.disabled = false;
    pagination(array);
  }
  // pagination(array);
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
    // console.log(valuePage.curPage);
    btnNextPg.disabled = true;
  } else {
    btnNextPg.disabled = false;
  }
}
