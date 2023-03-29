//import очищає секцію новин
import { refs } from "../index";
// показати сторінку поt found
export function showPageNotFound(message) {
  refs.noNewsPage.style.display = 'block';
  refs.noNewsPageTitle.textContent = message;
}

// сховати сторінку поt found
export function hidePageNotFound() {
  refs.noNewsPage.style.display = 'none';
  refs.noNewsPageTitle.textContent = '';
}