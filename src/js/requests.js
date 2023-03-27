import axios from 'axios';

export class Requests {
  constructor(url, key) {
    this.url = url;
    this.key = key;
  }
  // створити URL адресу для популярних новин
  createTrendingNewsQueryUrl() {
    return this.url + '/mostpopular/v2/viewed/1.json?api-key=' + this.key;
  }
  // зробити запит на адресу
  async getRequests(url) {
    const response = await axios.get(url);
    return response.data;
  }
  // створення URL для запиту по слову
  createSearchQueryUrl(search = '') {
    return `${this.url}/search/v2/articlesearch.json?api-key=${this.key}&q=${search}`;
  }
  createUrlCategoryName(name) {
    return `${this.url}/search/v2/articlesearch.json?query=${name}&api-key=${this.key}`;
    // return `${this.url}/news/v3/content/all/${name}.json?api-key=${this.key}`;
  }
  // створення URL для запиту погоди
  requestWeatherUrl(lat, lon) {
    return `${this.url}?lat=${lat}&lon=${lon}&lang=en&units=metric&appid=${this.key}`;
  }
}
