export function setActiveLink(linkNumber) {
  const links = document.querySelectorAll('.header__link'); 
  const formw = document.querySelector('.search-form'); 
  const formw2 = document.querySelector('.search-button__mobile'); 
  
  links.forEach(link => {
    link.classList.remove('header__link--active'); // видаляємо у всіх header__link--active 
  });
  // додаємо клас header__link--active в залежності від значення linkNumber
  switch(linkNumber) {
    case 1:
      links[0].classList.add('header__link--active');
      break;
    case 2:
      links[1].classList.add('header__link--active');
      formw.remove();
      formw2.remove();
      break;
    case 3:
       formw.remove();
      formw2.remove();
      links[2].classList.add('header__link--active');
      break;
    default:
      console.log('error. value in function "setActiveLink(`HERE`)" is incorrect');// помилка якщо передано не правильне значення linkNumber
  }
}

