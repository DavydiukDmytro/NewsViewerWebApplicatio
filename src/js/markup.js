// =========Створення масиву новик+погоди========
export function concatNewsAndWeather(incomeArr, favoriteArr, readedArr, obj) {
  const concatArray = [];
  const checkedArray = checkArrays(incomeArr, favoriteArr, readedArr);
  // console.log('Cheked arr:', checkedArray);
  checkedArray.forEach(function (elem, index) {
    if (window.innerWidth < 767) {
      if (index === 0 && obj.flag === 'weather') {
        concatArray.push(obj);
      }
    }
    concatArray.push(dataDestructuring(elem));
    if (window.innerWidth >= 1280) {
      if (index === 1 && obj.flag === 'weather') {
        concatArray.push(obj);
      }
    } else if (window.innerWidth >= 768) {
      if (index === 0 && obj.flag === 'weather') {
        concatArray.push(obj);
      }
    }
  });
  return concatArray;
}

// =========Створоення масиву з інлайном розмітки========
export function createMarkUp(array) {
  return array
    .map(function (elem) {
      if (elem.flag === 'news') {
        return newsMarkUp(elem);
      } else {
        return weatherMarkUp(elem);
      }
    })
    .join('');
}

// ==========Перевірка масивів на вміст однакових обектів=========
function checkArrays(incomeArr, favoriteArr, readedArr) {
  let checkedArray = [];
  for (let i = 0; i < incomeArr.length; i++) {
    let newObj = { ...incomeArr[i] };
    let favObj = favoriteArr.find(obj => obj.id === incomeArr[i].id);

    if (favObj) {
      newObj.favorite = true;
    }
    let readObj = readedArr.find(obj => obj.id === incomeArr[i].id);

    if (readObj) {
      newObj.read = true;
    }
    checkedArray.push(newObj);
  }
  return checkedArray;
}

// ==========Деструктуризаця масивів новин===========
function dataDestructuring(elem) {
  if (elem.asset_id) {
    const {
      abstract,
      title,
      asset_id: id,
      url,
      published_date,
      media,
      flag = 'news',
      favorite = false,
      read = false,
    } = elem;
    return {
      abstract,
      id,
      published_date,
      title,
      url,
      media,
      flag,
      favorite,
      read,
    };
  } else if (elem._id) {
    const {
      abstract,
      _id: id,
      web_url: url,
      pub_date: published_date,
      headline: { main: title },
      multimedia: media,
      flag = 'news',
      favorite = false,
      read = false,
    } = elem;
    return {
      abstract,
      id,
      published_date,
      url,
      title,
      media,
      flag,
      favorite,
      read,
    };
  }
}

// ========Розмітка картки новин==========
function newsMarkUp({
  abstract,
  id,
  published_date,
  url,
  title,
  media,
  favorite,
  read,
}) {
  const IMG_URL = 'https://www.nytimes.com/';
  const date = dateFormating(published_date);
  let img = '';
  if (media.length === 0) {
    // =====РОЗІБРАТИСЬ З КАРТИНКОЮ============
    img = './img/mobile_1x.jpg';
  } else if (media.length === 1) {
    const mediaObj = media[0];
    const imageUrl = mediaObj['media-metadata'];
    const [, , third] = imageUrl;
    img = third.url;
  } else {
    const qqq = media.find(elem => elem.subtype === 'master495');
    img = `${IMG_URL}${qqq.url}`;
  }
  return `<li class="news-card">
    <div class="news-card__image">
     <div class="news-card__darkend"></div>
      <img src="#" alt="News" />
      <span class="news-card__category">Job searching</span>
      <span class="news-card__status" data-read="${read}">Have read
      <svg class="news-card__icon-tick" width="18px" height="18px">
       <use xlink:href="./img/icons.svg#icon-tick"></use>
       </svg>
      </span>
      <button data-id="${id}" data-favorite="${favorite}" class="news-card__favorite">
        Add to favorite
        <svg class="news-card__icon" width="16px" height="16px">
      <use xlink:href="./img/icons.svg#icon-heart-empty"></use>
         </svg>
         <svg class="news-card__icon full" width="16px" height="16px">
              <use xlink:href="./img/icons.svg#icon-heart-full"></use>
            </svg>
      </button>
    </div>
    <h2 class="news-card__title">
      ${title}
    </h2>
    <p class="news-card__text">
      ${abstract}
    </p>
    <div class="news-card__box">
      <span class="news-card__date">${date}</span>
      <a data-ida="${id}" class="news-card__read" href="${url}">Read more</a>
    </div>
  </li>`;
}
// ========Розмітка картки погоди==========
function weatherMarkUp({ temp, descriptrion, city, icon, dayWeek, date }) {
  return `<li class="weather__card">
    <div class="weather__wrapper">
      <p class="weather__temperature">${temp}°</p>
      <div class="weather__box">
        <p class="weather__description">${descriptrion}</p>
        <div class="weather__city">
            <svg class="weather__location-icon">
              <path d="M16 2.001c-6.072 0.007-10.992 4.927-11 10.998v0.001c0 0.005 0 0.011 0 0.017 0 2.486 0.833 4.777 2.236 6.61l-0.019-0.026s0.3 0.395 0.348 0.45l8.435 9.95 8.439-9.953c0.044-0.053 0.345-0.447 0.345-0.447l0.001-0.004c1.383-1.806 2.216-4.098 2.216-6.583 0-0.005 0-0.009 0-0.014v0.001c-0.007-6.072-4.928-10.993-11-11h-0.001zM16 17c-2.209 0-4-1.791-4-4s1.791-4 4-4v0c2.209 0 4 1.791 4 4s-1.791 4-4 4v0z"></path>
            </svg>
            ${city}
        </div>
    </div>
  </div>
<img class="weather-picture" src="https://openweathermap.org/img/wn/${icon}@2x.png"></img>
  <p class="weather__day">${dayWeek}</p>
  <p class="weather__date">${date}</p>
</li>`;
}

// ========Форматування дати у дд/мм/рррр====
function dateFormating(published_date) {
  const date = new Date(`${published_date}`);
  return `${addLeadingZero(date.getUTCDate())}/${addLeadingZero(
    date.getUTCMonth() + 1
  )}/${date.getUTCFullYear()}`;
}
// ========Додавання 0 якщо число з 1 символу=========
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
