import flatpickr from 'flatpickr';
const flatpickr = require('flatpickr');

// flatpickr('#calendar', {
//   altFormat: 'F j, Y',
//   dateFormat: 'd/m/Y',
// });

const dateInput = document.getElementById('date-input');

flatpickr(dateInput, {
  onChange: function (selectedDates, dateStr, instance) {
    const selectedDate = selectedDates[0];
    console.log(selectedDate);
  },
});

// const myInput = document.querySelector('.myInput');
// const fp = flatpickr(myInput, {});

// const calendarWrapper = document.querySelectorAll('calendar__wrapper');
// const calendar = document.querySelectorAll('flatpickr-calendar');

// calendarWrapper.addEventListener('click', function () {
//   calendar.classList.toggle('visible');
// });
