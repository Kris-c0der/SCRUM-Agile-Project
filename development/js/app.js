const nameUser = document.querySelector(".icons");
const form = document.querySelector("form");
const inpText = document.querySelector("#value");
const secForm = document.querySelector(".nav-welcome");
const mainSect = document.querySelector(".main-section");

if (localStorage.savedName != null) {
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
const textAreaInst = document.querySelector("#instruction-input");
const olEl = document.querySelector(".instruction-list");
let instructionAll = [];

//Event dodanie instrukcji
btnElIns.addEventListener("click", function(e) {
  e.preventDefault();
  const textAreaInstValue = document.querySelector("#instruction-input").value;
  if (textAreaInstValue.length < 150 && textAreaInstValue.length > 0) {
    const newLi = document.createElement("li");
    newLi.classList.add("liIconsEl");
    olEl.appendChild(newLi);
    newLi.innerText = textAreaInstValue;
    const lielement = document.querySelector(".instruction-list li");
    if (lielement !== null) {
      const NewSpanEl = document.createElement("span");
      const NewSpanSecEl = document.createElement("span");
      NewSpanEl.classList.add("span-icon");
      NewSpanSecEl.classList.add("span-delete-icon");
      newLi.appendChild(NewSpanEl);
      newLi.appendChild(NewSpanSecEl);
      NewSpanSecEl.addEventListener("click", function() {
        console.log("click");
        newLi.remove();
      });
    }
    instructionAll.push(textAreaInstValue);
    textAreaInst.value = "";
  } else if (textAreaInstValue.length === 0) {
    alert("Wprowadź instrukcję");
  } else {
    alert("Maksymalna liczba znaków: 150 - Skróć instrukcję");
  }
});

//Event dodanie składnika
const btnElIng = document.querySelector(".ingredients-btn");
const ulEl = document.querySelector(".ingredients-list");
const inputIng = document.querySelector("#ingredients-input");
let ingrediendsAll = [];

btnElIng.addEventListener("click", function(e) {
  e.preventDefault();
  const inputIngValue = document.querySelector("#ingredients-input").value;
  if (inputIngValue.length < 50 && inputIngValue.length > 0) {
    const newLi2 = document.createElement("li");
    ulEl.appendChild(newLi2);
    newLi2.innerText = inputIngValue;
    const lielement2 = document.querySelector(".ingredients-list li");
    if (lielement2 !== null) {
      const NewSpanEl2 = document.createElement("span");
      const NewSpanSecEl2 = document.createElement("span");
      NewSpanEl2.classList.add("span-icon");
      NewSpanSecEl2.classList.add("span-delete-icon");
      newLi2.appendChild(NewSpanEl2);
      newLi2.appendChild(NewSpanSecEl2);
      NewSpanSecEl2.addEventListener("click", function() {
        console.log("click");
        newLi2.remove();
      });
    }
    ingrediendsAll.push(inputIngValue);
    inputIng.value = "";
  } else if (inputIngValue.length === 0) {
    alert("Wprowadź nazwę składnika");
  } else {
    alert("Maksymalna liczba znaków: 50 - Skróć nazwę składnika");
  }
});
//Nazwa i opis przepisu
const nameRecipInput = document.querySelector("#recipe-name");
const decriptionInput = document.querySelector("#recipe-description");
const saveBtnEl = document.querySelector("#save-recipes-btn");
const formEl = document.querySelector("#form-add-recipe");

formEl.addEventListener("submit", function(element) {
  let decriptionInputVal = document.querySelector("#recipe-description").value;
  let nameRecipInputVal = document.querySelector("#recipe-name").value;
  if (nameRecipInputVal.length > 50) {
    element.preventDefault();
    alert(
      'Zbyt duża liczba znaków. Maksymlana liczba znaków dla "Nazwa przepisu": 50'
    );
  } else if (nameRecipInputVal.length === 0) {
    alert("Nazwa przepisu musi zostać uzupełniona");
  } else if (decriptionInputVal.length === 0) {
    alert("Opis przepisu musi zostać uzupełniony");
  } else if (decriptionInputVal.length > 360) {
    alert(
      'Zbyt duża liczba znaków. Maksymlana liczba znaków dla "Opis przepisu": 360'
    );
  } else {
    alert("Przepis wprowadzony prawidłowo");
    let recipeList = JSON.parse(localStorage.getItem("recipsList"));
    if (recipeList === null) {
      recipeList = [];
    }
    recipeList.push({
      nameRecipe: nameRecipInputVal,
      description: decriptionInputVal,
      instruction: instructionAll,
      ingrediends: ingrediendsAll
    });
    localStorage.setItem("recipsList", JSON.stringify(recipeList));
    modalEl.style.display = "none";
    planEl.style.display = "none";
    decriptionInputVal = "";
    nameRecipInputVal = "";
    ingrediendsAll = [];
    instructionAll = [];
    nameRecipInput.value = "";
    decriptionInput.value = "";
    olEl.innerHTML = "";
    ulEl.innerHTML = "";
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

/*tworzenie nowego planu*/

createPlanForm.addEventListener("submit", function(e) {
  const namePlanInput = document.querySelector("#plan-name");
  const decriptionPlanInput = document.querySelector("#description");
  let weekNumberVal = document.querySelector("#week-number").value;

  let namePlanInputVal = document.querySelector("#plan-name").value;
  let decriptionPlanInputVal = document.querySelector("#description").value;

  if (namePlanInputVal.length > 50) {
    e.preventDefault();
    alert(
      'Zbyt duża liczba znaków. Maksymlana liczba znaków dla "Nazwa przepisu": 50'
    );
  } else if (namePlanInputVal.length === 0) {
    alert("Nazwa planu musi zostać uzupełniona");
  } else if (decriptionPlanInputVal.length === 0) {
    alert("Opis planu musi zostać uzupełniony");
  } else if (decriptionPlanInputVal.length > 360) {
    alert(
      'Zbyt duża liczba znaków. Maksymlana liczba znaków dla "Opis planu": 360'
    );
  } else {
    alert("Przepis wprowadzony prawidłowo");
    let planSchedule = JSON.parse(localStorage.getItem("planSchedule"));
    if (planSchedule === null) {
      planSchedule = [];
    }
    /* dodawanie value z selectów do tablicy */

    const planName = document.querySelector("#plan-name");
    const description = document.querySelector("#description");

    const mondayElList = document.getElementsByClassName("monday-select");
    const tuesdayElList = document.getElementsByClassName("tuesday-select");
    const wednesdayElList = document.getElementsByClassName("wednesday-select");
    const thursdayElList = document.getElementsByClassName("thursday-select");
    const fridayElList = document.getElementsByClassName("friday-select");
    const saturdayElList = document.getElementsByClassName("saturday-select");
    const sundayElList = document.getElementsByClassName("sunday-select");
    const week = [];

    week.push(
      mondayElList,
      tuesdayElList,
      wednesdayElList,
      thursdayElList,
      fridayElList,
      saturdayElList,
      sundayElList
    );

    /* pobieranie zaznaczonych wartości z inputów select i dodawanie ich do tablicy */

    const planWeek = [];
    const arr = [];
    for (let i = 0; i < week.length; i++) {
      arr[i] = [];
      let element = week[i];
      for (let j = 0; j < element.length; j++) {
        let strSel = element[j].options[element[j].selectedIndex].text;
        arr[i].push(strSel);
      }
    }

    planWeek.push(arr);

    let idRecipe = planSchedule.length;
    idRecipe++;

    planSchedule.push({
      namePlan: namePlanInputVal,
      descriptionPlan: decriptionPlanInputVal,
      planWeek: planWeek,
      idRecipe: idRecipe,
      weekNumber: weekNumberVal
    });

    localStorage.setItem("planSchedule", JSON.stringify(planSchedule));
    modalEl.style.display = "none";
    planEl.style.display = "none";
    decriptionPlanInputVal = "";
    namePlanInputVal = "";
    weekNumberVal = "";
  }
});
// WYSWIETLANIE LICZBY PRZEPISOW W APP WIDGET

const numRec = document.querySelector(".num-Rec");
let numbersOfRecipe = JSON.parse(localStorage.getItem("recipsList"));
if (localStorage.recipsList != null) {
  numRec.innerText = numbersOfRecipe.length;
}

// Wyświetlanie planów w ekranie głównym aplikacji.

const months = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień"
];

const currentDate = new Date(); // pełna data
const currentMonth = currentDate.getMonth() + 1; //miesiąc || +1 ponieważ JS liczy miesiące od 0.
const currentDay = currentDate.getDate(); //dzień miesiąca
// console.log(months[currentMonth - 1]); // uzyskanie nazwy miesiąca zamiast liczby || -1 ponieważ pierwszy miesiąc ma indeks 0.


// Uzyskanie numeru tygodnia w roku || źródło https://weeknumber.net/how-to/javascript
Date.prototype.getWeek = function() {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
};

