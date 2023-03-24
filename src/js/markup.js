// ===Створення спільного масиву новин та погоди=======
export function concatNewsAndWeather(array, obj) {
  let concatArray = [];
  array.forEach(function (
    {
      title,
      asset_id,
      url,
      published_date,
      abstract,
      media,
      flag = 'news',
      favorite = false,
      read = false,
    },
    index
  ) {
    concatArray.push({
      asset_id,
      published_date,
      title,
      abstract,
      url,
      media,
      flag,
      favorite,
      read,
    });
    if (index === 1) {
      concatArray.push(obj);
    }
  });
  return concatArray;
}

export function newsMarkup(array) {
  return array
    .map(function (elem) {
      if (elem.flag === 'news') {
        return `<li><img src="https://static01.nyt.com/images/2023/03/22/multimedia/22trump-grandjury-cvkg/22trump-grandjury-cvkg-mediumThreeByTwo440.jpg"/>
 <h1>${elem.title}</h1><p>${elem.abstract}</p><div><p></p><a href=${elem.url}>Read more</a></div></li>`;
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
