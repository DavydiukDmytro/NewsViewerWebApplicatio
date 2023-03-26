export function selectedCategory() {

    const selectName = document.querySelector(".news-section__select");
    selectName.addEventListener("change", function () {    
    return console.log(selectName.value);   
    });
// повертає значення категорії з селекта

    const categoryName = document.querySelectorAll(".news-section__item button");
    categoryName.forEach( function (button) { 
    button.addEventListener("click", function() {
    const buttonText = button.textContent;  
    return console.log(buttonText);  
  });
});
//повертає значення категорії
}