// функція додавання класу is-active в залежності від переданого значення від 1-3
import { setActiveLink } from './js/is-active';
// Додав функцію яка записую і повертає данні з localStorage
import { save, load } from './js/storage';
import { createMarkUp } from './js/markup';
setActiveLink(3);

const refsFavoriet = {
    sectionNews: document.querySelector('.section-read'),
}

let arrayCardNewsReadStorage = [];

arrayCardNewsReadStorage = load('read');

console.log(arrayCardNewsReadStorage);

if (arrayCardNewsReadStorage.length > 0) {
    arrayCardNewsRead = arrayFlag(arrayCardNewsReadStorage);
    
} else {
    console.log('erorr');
}

function arrayFlag(array) {
    const arr = array.map(element => element.read = 'read');
    return arr;
}