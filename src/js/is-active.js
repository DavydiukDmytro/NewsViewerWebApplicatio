export function setActiveLink(linkNumber) {
  const links = document.querySelectorAll('.header__link'); 
  
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
      break;
    case 3:
      links[2].classList.add('header__link--active');
      break;
    default:
      console.log('error. value in function "setActiveLink(`HERE`)" is incorrect');// помилка якщо передано не правильне значення linkNumber
  }
}

