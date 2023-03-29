const refs2 = {
  noNewsPage: document.querySelector('.news-page'),
  noNewsPageTitle: document.querySelector('.news-page__title'),
}

// показати сторінку поt found
export function showPageNotFound(message) {
  refs2.noNewsPage.style.display = 'block';
  refs2.noNewsPageTitle.textContent = message;
}

// сховати сторінку поt found
export function hidePageNotFound() {
  refs2.noNewsPage.style.display = 'none';
  refs2.noNewsPageTitle.textContent = '';
}