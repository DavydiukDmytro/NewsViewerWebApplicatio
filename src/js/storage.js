const STORAGE_KEY = 'myKey';

const save = (key, value) => {
  try {
    const dataSave = JSON.stringify(value);
    localStorage.setItem(key, dataSave);
  } catch (error) {
    console.error('Oops, something went wrong: ', error.message); // пізніше замінити на сповіщення від Notiflix
  }
};

const load = key => {
  try {
    const dataSave = localStorage.getItem(key);
    if (dataSave === null) {
      return undefined;
    }
    return JSON.parse(dataSave);
  } catch (error) {
    console.error('Oops, something went wrong: ', error.message); // пізніше замінити на сповіщення від Notiflix
  }
};

export default { save, load };
