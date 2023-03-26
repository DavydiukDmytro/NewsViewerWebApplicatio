export function selectedCategory() {
  const selectName = document.querySelector(".news-section__select");
  selectName.addEventListener("change", function () {    
    return console.log(selectName.value);   
  });
// повертає значення категорії з селекта
    const categoryName2 = document.querySelector('.section-categories__list');
  categoryName2.addEventListener('click', function (e) {
    if (e.target.nodeName === "BUTTON") {
       console.log(e.target.textContent);
     }
  });
  const categoryName = document.querySelectorAll(".news-section__item button");
  categoryName.forEach( function (button) { 
    button.addEventListener("click", function() {
      const buttonText = button.textContent;  
      return console.log(buttonText);  
    });
  });
//повертає значення категорії
}
