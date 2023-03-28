//Перемикач теми - темна/світла
export function themeCheck() {
    const LOCALSTORAGE_KEY = 'theme';
    let themeLight = true;
    const selectTheme = document.querySelector('#theme-clicker');
    const element = document.querySelector('body');
    selectTheme.addEventListener('change', setTheme);

    if (localStorage.getItem(LOCALSTORAGE_KEY) !== null) {
        themeLight = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    }

    if (!themeLight) {
        element.classList.add('dark');
        selectTheme.checked = true;
    } else {
        selectTheme.checked = false;
    }

    function setTheme() {
        element.classList.toggle('dark');
        themeLight = !themeLight;
        localStorage.setItem(LOCALSTORAGE_KEY, themeLight);
    }
}