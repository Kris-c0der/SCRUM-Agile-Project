const nameUser = document.querySelector(".icons");
const form = document.querySelector("form");
const inpText = document.querySelector("#value");
const secForm = document.querySelector(".nav-welcome");
const mainSect = document.querySelector(".main-section");

if (localStorage.length > 0) {
  nameUser.innerText = localStorage.savedName;
  secForm.style.display = "none";
  mainSect.style.display = "block";
}
form.addEventListener("submit", function(elem) {
  elem.preventDefault();
  nameUser.innerText = inpText.value;
  var userName = inpText.value;
  localStorage.setItem("savedName", userName);
  console.log("Twoje imie zapisane w LS to:  ", localStorage.savedName);
  secForm.style.display = "none";
  mainSect.style.display = "block";
});

// Show modal //
const btnAddRecipie = document.querySelector("#add-reciepes");
const btnAddPlan = document.querySelector("#add-plan");

const modalEl = document.querySelector(".modal-window");
const reciepiesEl = document.querySelector(".add-recipes-section");
const planEl = document.querySelector(".new-plan-container");

btnAddRecipie.addEventListener("click", function() {
  modalEl.style.display = "flex";
  reciepiesEl.style.display = "block";
  if (planEl.style.display !== "none") {
    planEl.style.display = "none";
  }
});

btnAddPlan.addEventListener("click", function() {
  modalEl.style.display = "flex";
  planEl.style.display = "block";

  planEl.style.display = "block";
  if (reciepiesEl.style.display !== "none") {
    reciepiesEl.style.display = "none";
  }
});
// kliknięcie poza oknem zamyka modal //

window.onclick = function(event) {
  if (event.target == modalEl) {
    modalEl.style.display = "none";
  }
};

///////////////////*New Recipes - Logic*///////////////////////
const btnElIns = document.querySelector(".instruction-btn");
// console.log(btnElIns);
const textAreaInst = document.querySelector("#instruction-input");
// console.log(textAreaInst);
const olEl = document.querySelector(".instruction-list");
// console.log(olEl);
let instructionAll = [];

//Event dodanie instrukcji
btnElIns.addEventListener("click", function(e) {
  // console.log("click");
  e.preventDefault();
  const textAreaInstValue = document.querySelector("#instruction-input").value;
  if (textAreaInstValue.length < 150) {
    const newLi = document.createElement("li");
    olEl.appendChild(newLi);
    newLi.innerText = textAreaInstValue;
    instructionAll.push(textAreaInstValue);
    textAreaInst.value = "";
  } else {
    alert("Maksymalna liczba znaków: 150");
  }
});

//Event dodanie składnika
const btnElIng = document.querySelector(".ingredients-btn");
// console.log(btnElIng);
const ulEl = document.querySelector(".ingredients-list");
// console.log(ulEl);
const inputIng = document.querySelector("#ingredients-input");
// console.log(inputIng);
let ingrediendsAll = [];

btnElIng.addEventListener("click", function(e) {
  // console.log("click");
  e.preventDefault();
  const inputIngValue = document.querySelector("#ingredients-input").value;
  if (inputIngValue.length < 50) {
    const newLi2 = document.createElement("li");
    ulEl.appendChild(newLi2);
    newLi2.innerText = inputIngValue;
    ingrediendsAll.push(inputIngValue);
    inputIng.value = "";
  } else {
    alert("Maksymalna liczba znaków: 50");
  }
});

//Nazwa i opis przepisu
const nameRecipInput = document.querySelector("#recipe-name");
// console.log(nameRecipInput);
const decriptionInput = document.querySelector("#recipe-description");
// console.log(decriptionInput);
const saveBtnEl = document.querySelector("#save-recipes-btn");
// console.log(saveBtnEl);
const formEl = document.querySelector("#form-add-recipe");

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
});

/* ///////////////////////////////////////////////////////////
                *New Schedule - Logic*
/////////////////////////////////////////////////////////// */

/*Dodawanie do wszystkich pól select wartości z listy przepisów*/

const createPlanForm = document.querySelector(".new-plan-container");
let recipeList = JSON.parse(localStorage.getItem("recipsList"));

var select = document.querySelectorAll(".plan-select");
select.forEach(i => {
  for (index in recipeList) {
    i.options[i.options.length] = new Option(
      recipeList[index].nameRecipe,
      index
    );
  }
});

console.log(recipeList);

/*tworzenie nowego planu*/

createPlanForm.addEventListener("submit", function(element) {
  const namePlanInput = document.querySelector("#plan-name");
  const decriptionPlanInput = document.querySelector("#description");
  const weekNumberVal = document.querySelector("#week-number").value;

  let namePlanInputVal = document.querySelector("#plan-name").value;
  let decriptionPlanInputVal = document.querySelector("#description").value;

  if (decriptionPlanInputVal.length > 50 && namePlanInputVal.length > 360) {
    element.preventDefault();
    alert(
      'Zbyt duża liczba znaków. Maksymlana liczba znaków dla "Nazwa Planu": 50, dla "Opis Planu": 360.'
    );
  } else {
    if (allDays === null) {
      allDays = [];
    }

    const monday = [];
    const tuesday = [];
    const wednesday = [];
    const thursday = [];
    const friday = [];
    const saturday = [];
    const sunday = [];

    /* dodawanie value z selectów do tablicy */

    const planName = document.querySelector("#plan-name");
    const description = document.querySelector("#description");

    function getSelectedItems() {
      const mondayElList = document.getElementsByClassName("monday-select");
      const tuesdayElList = document.getElementsByClassName("tuesday-select");
      const wednesdayElList = document.getElementsByClassName("wednesday-select");
      const thursdayElList = document.getElementsByClassName("thursday-select");
      const fridayElList = document.getElementsByClassName("friday-select");
      const saturdayElList = document.getElementsByClassName("saturday-select");
      const sundayElList = document.getElementsByClassName("sunday-select");
      const week =[];

      week.push(mondayElList, tuesdayElList, wednesdayElList, thursdayElList, saturdayElList, sundayElList );
      console.log(week);

// iteracja przez 1 tablice (monday), zmienić na iteracje przez wszystkie tablice w tablicy week, wymyślić jak zapisać dane z każdego tygodnia do jednej tablicy

      for (let i = 0; i < mondayElList.length; i++) {
        let element = mondayElList[i];
        let strSel = element.options[element.selectedIndex].text;
        monday.push(strSel);
      }
      console.log(monday);
    }
    week.push()

    getSelectedItems();

    allDays.push({
      namePlan: namePlanInputVal,
      descriptionPlan: decriptionPlanInputVal,
      allDays: allDays,
      idRecipe: idRecipe,
      weekNumber: weekNumberVal
    });
  //
  //   localStorage.setItem("recipsList", JSON.stringify(recipeList));
  //   modalEl.style.display = "none";
  //   planEl.style.display = "none";
  //   decriptionPlanInputVal = "";
  //   namePlanInputVal = "";
  //   ingrediendsAll = [];
  //   instructionAll = [];
  //   nameRecipInput.value = "";
  //   decriptionInput.value = "";
  //   olEl.innerHTML = "";
  //   ulEl.innerHTML = "";
  }
});
