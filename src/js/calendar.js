// import flatpickr from 'flatpickr';
// const flatpickr = require('flatpickr');

// const dateInput = document.getElementById('date-input');

// flatpickr(dateInput, {
//   onChange: function (selectedDates, dateStr, instance) {
//     const selectedDate = selectedDates[0];
//     console.log(selectedDate);
//   },
// });
import flatpickr from 'flatpickr';
import { searchCalendar } from '../index';

// require('flatpickr/dist/themes/dark.css');

const dateInput = document.getElementById('date-input');

flatpickr(dateInput, {
  defaultDate: 'today',
  dateFormat: 'd/m/y',
  disableMobile: 'true',
  onChange: function (selectedDates, dateStr, instance) {
    const selectedDate = selectedDates[0];
    const year = selectedDate.getFullYear().toString();
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = selectedDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}${month}${day}`;
    searchCalendar(formattedDate);
  },
});

export { flatpickr };
