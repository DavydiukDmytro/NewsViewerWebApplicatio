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

const dateInput = document.getElementById('date-input');

flatpickr(dateInput, {
  onChange: function(selectedDates, dateStr, instance) {
    const selectedDate = selectedDates[0];
    const formattedDate = selectedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).split('/').reverse().join(''); // видаляємо слеші з дати
    console.log(formattedDate);
  },
});

export { flatpickr };