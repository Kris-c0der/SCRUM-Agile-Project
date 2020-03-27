const nameUser = document.querySelector(".icons");
const form = document.querySelector("form");
const inpText = document.querySelector("#value");
const secForm = document.querySelector(".nav-welcome");
const mainSect = document.querySelector(".main-section");

if(localStorage.length > 0){
    nameUser.innerText = localStorage.savedName;
    secForm.style.display = "none";
    mainSect.style.display = "block";
}
form.addEventListener('submit', function (elem) {
    elem.preventDefault();
        nameUser.innerText = inpText.value;
        var userName = inpText.value;
        localStorage.setItem('savedName', userName);
        console.log("Twoje imie zapisane w LS to:  ", localStorage.savedName);
        secForm.style.display = 'none';
        mainSect.style.display = 'block';

});

// Show modal //
const btnAddRecipie = document.querySelector("#add-reciepes");
const btnAddPlan = document.querySelector("#add-plan");

const modalEl = document.querySelector(".modal-window");
const planEl = document.querySelector(".add-recipes-section");


btnAddRecipie.addEventListener("click", function() {
  modalEl.style.display = "flex";
  planEl.style.display = "block";

  console.log("click");
});

btnAddPlan.addEventListener("click", function() {
  modalEl.style.display = "flex";
  // dodać element który będzie ustawiał display block dla elementu plan //
  console.log("click");
});


///////////////////*New Recipes - Logic*///////////////////////
const btnElIns = document.querySelector('.instruction-btn');
console.log(btnElIns);
const textAreaInst = document.querySelector('#instruction-input');
console.log(textAreaInst);
const olEl = document.querySelector('.instruction-list');
console.log(olEl);
let instructionAll = [];

//Event dodanie instrukcji
btnElIns.addEventListener('click',function (e) {
  console.log('click');
  e.preventDefault();
  const textAreaInstValue = document.querySelector('#instruction-input').value;
  if (textAreaInstValue.length < 150) {
    const newLi = document.createElement('li');
    olEl.appendChild(newLi);
    newLi.innerText = textAreaInstValue;
    instructionAll.push(textAreaInstValue);
    textAreaInst.value = '';
  } else {
    alert('Maksymalna liczba znaków: 150');
  }
});

//Event dodanie składnika
const btnElIng = document.querySelector('.ingredients-btn');
console.log(btnElIng);
const ulEl = document.querySelector('.ingredients-list');
console.log(ulEl);
const inputIng = document.querySelector('#ingredients-input');
console.log(inputIng);
let ingrediendsAll = [];

btnElIng.addEventListener('click',function (e) {
  console.log('click');
  e.preventDefault();
  const inputIngValue = document.querySelector('#ingredients-input').value;
  if (inputIngValue.length < 50) {
    const newLi2 = document.createElement('li');
    ulEl.appendChild(newLi2);
    newLi2.innerText = inputIngValue;
    ingrediendsAll.push(inputIngValue);
    inputIng.value ='';
  } else {
    alert('Maksymalna liczba znaków: 50');
  }
});

//Nazwa i opis przepisu
const nameRecipInput = document.querySelector('#recipe-name');
console.log(nameRecipInput);
const decriptionInput = document.querySelector('#recipe-description');
console.log(decriptionInput);
const saveBtnEl = document.querySelector('#save-recipes-btn');
console.log(saveBtnEl);
const formEl = document.querySelector('#form-add-recipe');

formEl.addEventListener('submit', function (element) {
  console.log('submit');
  let decriptionInputVal = document.querySelector('#recipe-description').value;
  let nameRecipInputVal = document.querySelector('#recipe-name').value;
  if (decriptionInputVal.length >50 && nameRecipInputVal.length >360){
    element.preventDefault();
    alert('Zbyt duża liczba znaków. Maksymlana liczba znaków dla "Nazwa przepisu": 50, dla "Opis Przepisu": 360.')
  } else {
    let recipeList = JSON.parse(localStorage.getItem("recipsList"));
    if (recipeList === null) {
      recipeList = [];
    }
    recipeList.push({nameRecipe: nameRecipInputVal, description: decriptionInputVal,  instruction: instructionAll, ingrediends: ingrediendsAll});
    localStorage.setItem("recipsList", JSON.stringify(recipeList));
    modalEl.style.display = 'none';
    planEl.style.display = 'none';
    decriptionInputVal = '';
    nameRecipInputVal = '';
    ingrediendsAll = [];
    instructionAll = [];
    nameRecipInput.value = '';
    decriptionInput.value = '';
    olEl.innerHTML = '';
    ulEl.innerHTML = '';
  }
// kliknięcie poza oknem zamyka modal //

window.onclick = function(event) {
  if (event.target == modalEl) {
    modalEl.style.display = "none";
  }
}
