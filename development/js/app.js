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
    alert('Zbyt duża liczba znaków. Maksymlana liczba znaków dla "Nazwa przepisu": 50');
    return false;
  }else if (nameRecipInputVal.length === 0) {
    element.preventDefault();
    alert('Nazwa przepisu musi zostać uzupełniona');
    return false;
  }else if (decriptionInputVal.length === 0) {
    element.preventDefault();
    alert('Opis przepisu musi zostać uzupełniony');
    return false;
  }else if (decriptionInputVal.length >360) {
    element.preventDefault();
    alert('Zbyt duża liczba znaków. Maksymlana liczba znaków dla "Opis przepisu": 360');
    return false;
  }else {
    alert('Przepis wprowadzony prawidłowo');
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
  let weekNumberVal = document.querySelector("#week-number-modal").value;

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

// funkcja konwertująca datę na numer tygodnia w roku || źródło https://weeknumber.net/how-to/javascript
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

const scheduleAllPlans = JSON.parse(localStorage.getItem("planSchedule"));

weekArr = [];
if (scheduleAllPlans !== null) {
  scheduleAllPlans.forEach(plan => {
    const weekNumber = plan.weekNumber;
    weekArr.push(parseInt(weekNumber));
  }); // umieść w tablicy wszystkie numery tygodni, dla których zbudowane są plany.
}

const scheduleWeekNumber = document.getElementById("week-number");
const currentDate = new Date(); // uzyskanie daty.
const currentWeek = currentDate.getWeek(); // uzyskanie numeru tygodnia na podstawie daty.

if (weekArr.length === 0) {
  const tableTitle = document.getElementById("table-tittle");
  tableTitle.innerText = "Wygląda na to, że nie masz jeszcze żadnego planu :(";
}

if (weekArr.indexOf(currentWeek) > -1) {
  //sprawdź czy instnieje plan stworzony na obecny tydzień.
  scheduleWeekNumber.innerText = currentWeek;
}

if (weekArr.length === 1) {
  //jeśli istnieje tylko jeden plan, użyj go;
  scheduleWeekNumber.innerText = weekArr[0];
}

if (weekArr.length > 0) {
  //jeśli nie istnieje plan na obecny tydzień, to weź najbliższy plan na kolejny tydzień. Jeśli nie ma planu na kolejny tydzień to weź plan z zeszłego tygodnia.

  const closestWeek = weekArr.reduce((a, b) => {
    let aDiff = Math.abs(a - currentWeek);
    let bDiff = Math.abs(b - currentWeek);

    if (aDiff == bDiff) {
      return a > b ? a : b;
    } else {
      return bDiff < aDiff ? b : a;
    }
  });
  scheduleWeekNumber.innerText = closestWeek;
}

//zgrupuj wszystkie dania poniedziałkowe w jedną tablicę, potem analogicznie dla pozostałych dni tygodnia.
const mondayMeals = document.querySelectorAll("[id*=pn-]");
const tuesdayMeals = document.querySelectorAll("[id*=wt-]");
const wednesdayMeals = document.querySelectorAll("[id*=sr-]");
const thursdayMeals = document.querySelectorAll("[id*=czw-]");
const fridayMeals = document.querySelectorAll("[id*=pt-]");
const saturdayMeals = document.querySelectorAll("[id*=sb-]");
const sundayMeals = document.querySelectorAll("[id*=ndz-]");

scheduleAllPlans.forEach(object => {
  if (object.weekNumber == scheduleWeekNumber.innerText) {
    const plan = object.planWeek[0]; //Znajdź ten kontretny plan, który nas interesuje.
    let i = 0;
    mondayMeals.forEach(meal => {
      meal.innerText = plan[0][i]; //ustaw kolejno poniedziałkowe posiłki, poniżej analogicznie.
      i++;
    });

    i = 0;
    tuesdayMeals.forEach(meal => {
      meal.innerText = plan[1][i];
      i++;
    });

    i = 0;
    wednesdayMeals.forEach(meal => {
      meal.innerText = plan[2][i];
      i++;
    });

    i = 0;
    thursdayMeals.forEach(meal => {
      meal.innerText = plan[3][i];
      i++;
    });

    i = 0;
    fridayMeals.forEach(meal => {
      meal.innerText = plan[4][i];
      i++;
    });

    i = 0;
    saturdayMeals.forEach(meal => {
      meal.innerText = plan[5][i];
      i++;
    });

    i = 0;
    sundayMeals.forEach(meal => {
      meal.innerText = plan[6][i];
      i++;
    });
  }
});

//przesuwanie planów przyciskami next oraz prev
const prevBtn = document.getElementById("prev-plan-button");
const nextBtn = document.getElementById("next-plan-button");

prevBtn.addEventListener("click", function() {
  scheduleAllPlans.forEach(object => {
    if (object.weekNumber == scheduleWeekNumber.innerText) {
      const currentID = object.idRecipe;
      console.log(currentID); //znajdź obecne id.

      scheduleAllPlans.forEach(object => {
        if (object.idRecipe == currentID - 1) {// znajdź plan pasujący do poprzedniego id.
          const prePlan = object.planWeek[0];
          scheduleWeekNumber.innerText = object.weekNumber;
          let i = 0;
          mondayMeals.forEach(meal => {
            meal.innerText = prePlan[0][i];
            i++;
          });

          i = 0;
          tuesdayMeals.forEach(meal => {
            meal.innerText = prePlan[1][i];
            i++;
          });

          i = 0;
          wednesdayMeals.forEach(meal => {
            meal.innerText = prePlan[2][i];
            i++;
          });

          i = 0;
          thursdayMeals.forEach(meal => {
            meal.innerText = prePlan[3][i];
            i++;
          });

          i = 0;
          fridayMeals.forEach(meal => {
            meal.innerText = prePlan[4][i];
            i++;
          });

          i = 0;
          saturdayMeals.forEach(meal => {
            meal.innerText = prePlan[5][i];
            i++;
          });

          i = 0;
          sundayMeals.forEach(meal => {
            meal.innerText = prePlan[6][i];
            i++;
          });
        }
      });
    }
  });
});

nextBtn.addEventListener("click", function() {
  scheduleAllPlans.forEach(object => {
    if (object.weekNumber == scheduleWeekNumber.innerText) {
      const currentID = object.idRecipe;
      console.log(currentID); //znajdź obecne id.

      scheduleAllPlans.forEach(object => {
        if (object.idRecipe == currentID + 1) {// znajdź plan pasujący do następnego id.
          const prePlan = object.planWeek[0];
          scheduleWeekNumber.innerText = object.weekNumber;
          let i = 0;
          mondayMeals.forEach(meal => {
            meal.innerText = prePlan[0][i];
            i++;
          });

          i = 0;
          tuesdayMeals.forEach(meal => {
            meal.innerText = prePlan[1][i];
            i++;
          });

          i = 0;
          wednesdayMeals.forEach(meal => {
            meal.innerText = prePlan[2][i];
            i++;
          });

          i = 0;
          thursdayMeals.forEach(meal => {
            meal.innerText = prePlan[3][i];
            i++;
          });

          i = 0;
          fridayMeals.forEach(meal => {
            meal.innerText = prePlan[4][i];
            i++;
          });

          i = 0;
          saturdayMeals.forEach(meal => {
            meal.innerText = prePlan[5][i];
            i++;
          });

          i = 0;
          sundayMeals.forEach(meal => {
            meal.innerText = prePlan[6][i];
            i++;
          });
        }
      });
    }
  });
});
