import flatpickr from 'flatpickr';
const flatpickr = require('flatpickr');

const dateInput = document.getElementById('date-input');

flatpickr(dateInput, {
  onChange: function (selectedDates, dateStr, instance) {
    const selectedDate = selectedDates[0];
    console.log(selectedDate);
  },
});
