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

export function newsMarkup(array) {
  return array
    .map(function (elem) {
      if (elem.flag === 'news') {
        return `
        <li>
          <img src="https://static01.nyt.com/images/2023/03/22/multimedia/22trump-grandjury-cvkg/22trump-grandjury-cvkg-mediumThreeByTwo440.jpg"/>
            <h1>${elem.title}</h1>
            <p>${elem.abstract}</p>
              <div>
                <p></p>
                <a href=${elem.url}>Read more</a>
              </div>
        </li>`;
      } else {
        return `<li class="weather__card">
              <div class="weather__wrapper">
                <p class="weather__temperature">${elem.temp}</p>
                <div class="weather__box">
                  <p class="weather__description">${elem.descriptrion}</p>
                  <button class="weather__button">
                    <svg
                      width="18px"
                      height="18px"
                      class="weather__location-icon"
                    >
                    <use href="#"></use> ===ПРОПИСАТИ===
                  </svg>
                  ${elem.city}
                </button>
              </div>
            </div>
          <img class="weather-picture" src="https://openweathermap.org/img/wn/${elem.icon}@2x.png"></img>
            <p class="weather__day">${elem.dayWeek}</p>
            <p class="weather__date">${elem.date}</p>
        </li>`;
      }
    })
    .join('');
}

// export function TEST(incomeArr, favoriteArr, readedArr, obj) {
//   const concatArray = [];
//   const checkedArray = checkArrays(incomeArr, favoriteArr, readedArr);
//   console.log('Cheked arr:', checkedArray);
//   checkedArray.forEach(function (elem, index) {
//     concatArray.push(dataDestructuring(elem));
//     if (index === 1 && obj.flag === 'weather') {
//       concatArray.push(obj);
//     }
//   });
//   return concatArray;
// }

// export function concatNewsAndWeather(incomeArr, favoriteArr, readedArr, obj) {
//   const concatArray = [];
//   const checkedArray = checkArrays(incomeArr, favoriteArr, readedArr);
//   console.log('Cheked arr:', checkedArray);
//   checkedArray.forEach(function (
//     {
//       abstract,
//       title,
//       asset_id: id,
//       url,
//       published_date,
//       media,
//       flag = 'news',
//       favorite = false,
//       read = false,
//     },
//     index
//   ) {
//     concatArray.push({
//       abstract,
//       id,
//       published_date,
//       title,
//       url,
//       media,
//       flag,
//       favorite,
//       read,
//       _id,
//     });
//     if (index === 1 && obj.flag === 'weather') {
//       concatArray.push(obj);
//     }
//   });
//   return concatArray;
// }

/* <li class="news-card">
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
    8 tips for passing an online interview that will help you get a job
  </h2>
  <p class="news-card__text">
    Before you start looking for a job, it is useful to familiarize yourself
    with the job prospects offered by these...
  </p>
  <div class="news-card__box">
    <span class="news-card__date">20/02/2021</span>
    <a class="news-card__read">Read more</a>
  </div>
</li>; */
