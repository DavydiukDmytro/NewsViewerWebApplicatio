let news = [];
let conct = [];
const book = {
  title: 'The Last Kingdom',
  author: 'Bernard Cornwell',
  genres: ['historical prose', 'adventure'],
  isPublic: true,
  rating: 8.38,
};

export function newObj(value) {
  const xxx = value.results;
  xxx.forEach(function (
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
    news.push({
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
      news.push(book);
    }
  });
  console.log('News Arr : ', news);
}

export function markup(value) {
  console.log(value);
  const xxx = value.results;
  return xxx
    .map(
      obj =>
        `<img src="https://static01.nyt.com/images/2023/03/22/multimedia/22trump-grandjury-cvkg/22trump-grandjury-cvkg-mediumThreeByTwo440.jpg"/>
    <h1>${obj.title}</h1><p>${obj.abstract}</p><div><p></p><a href=${obj.url}>Read more</a></div>`
    )
    .join('');
}
