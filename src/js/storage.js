const STORAGE_KEY = 'myKey';

const save = (STORAGE_KEY, value) => {
  try {
    const dataSave = JSON.stringify(value);
    localStorage.setItem(STORAGE_KEY, dataSave);
  } catch (error) {
    console.error('Oops, something went wrong: ', error.message); // пізніше замінити на сповіщення від Notiflix
  }
};

const load = STORAGE_KEY => {
  try {
    const dataSave = localStorage.getItem(STORAGE_KEY);
    if (dataSave === null) {
      return undefined;
    }
    return JSON.parse(dataSave);
  } catch (error) {
    console.error('Oops, something went wrong: ', error.message); // пізніше замінити на сповіщення від Notiflix
  }
};

export default { save, load };
