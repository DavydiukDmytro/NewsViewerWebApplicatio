
export function createUrlCategoryName(name, API_URL_NEWS, KEY_NEWS) {
    return `${API_URL_NEWS}/search/v2/articlesearch.json?query=${name}&api-key=${KEY_NEWS}`;
    
}
  
