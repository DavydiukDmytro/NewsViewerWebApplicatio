export function concatNewsAndWeather(incomeArr, favoriteArr, readedArr, obj) {
  const concatArray = [];
  const checkedArray = checkArrays(incomeArr, favoriteArr, readedArr);
  console.log('Cheked arr:', checkedArray);
  checkedArray.forEach(function (elem, index) {
    concatArray.push(dataDestructuring(elem));
    if (index === 1 && obj.flag === 'weather') {
      concatArray.push(obj);
    }
  });
  return concatArray;
}

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
function newsMarkUp({
  abstract,
  id,
  published_date,
  url,
  title,
  media,
  flag,
  favorite,
  read,
}) {
  return `<li class="news-card">
    <div class="news-card__image">
      <img src="#" alt="News" />
      <span class="news-card__category">Job searching</span>
      <span class="news-card__status">Have read</span>
      <button class="news-card__favorite">
        Add to favorite
        <svg class="news-card__icon" width="16px" height="16px">
          <use href="./img/icons.svg#icon-favorite"></use>
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
      <span class="news-card__date">${published_date}</span>
      <a class="news-card__read">Read more</a>
    </div>
  </li>;`;
}
function weatherMarkUp({ temp, descriptrion, city, icon, dayWeek, date }) {
  return `<li class="weather__card">
    <div class="weather__wrapper">
      <p class="weather__temperature">${temp}</p>
      <div class="weather__box">
        <p class="weather__description">${descriptrion}</p>
        <button class="weather__button">
          <svg
            width="18px"
            height="18px"
            class="weather__location-icon"
          >
          <use href="#"></use> ===ПРОПИСАТИ===
        </svg>
        ${city}
      </button>
    </div>
  </div>
<img class="weather-picture" src="https://openweathermap.org/img/wn/${icon}@2x.png"></img>
  <p class="weather__day">${dayWeek}</p>
  <p class="weather__date">${date}</p>
</li>`;
}
