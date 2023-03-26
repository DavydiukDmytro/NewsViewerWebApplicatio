//import очищає секцію новин
import { clearNewsSection } from './clear-news-section';
import { refs } from "../index";
// показати сторінку поt found
export function showPageNotFound(message) {
    clearNewsSection();
  refs.noNewsPage.style.display = 'block';
  refs.noNewsPageTitle.textContent = message;
}

// сховати сторінку поt found
export function hidePageNotFound() {
  refs.noNewsPage.style.display = 'none';
  refs.noNewsPageTitle = '';
}